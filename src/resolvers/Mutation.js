import { v4 as uuidv4 } from "uuid";

const Mutation = {
  createUser(parent, args, { db }, info) {
    const { data } = args;
    const { email } = data;
    const emailTaken = db.all_users.some((user) => user.email === email);
    if (emailTaken) throw new Error("email already registered");

    const newUser = {
      id: uuidv4(),
      ...data,
    };

    db.all_users.push(newUser);

    return newUser;
  },
  updateUser(parent, args, { db }, info) {
    const { id, data } = args;

    const user = db.all_users.find((user) => user.id === id);
    if (!user) throw new Error("user not found");

    if (typeof data.name === "string") {
      user.name = data.name;
    }

    if (typeof data.email === "String") {
      const emailTaken = db.all_users.some((user) => user.email === email);
      if (emailTaken) throw new Error("email already registered");
      user.email = data.email;
    }
    return user;
  },
  deleteUser(parent, args, { db }, info) {
    const { id } = args;

    const user_index = db.all_users.findIndex((user) => user.id === id);
    if (user_index < 0) throw new Error("user not found");

    const user_deleted = db.all_users.splice(user_index, 1);

    const posts = db.all_posts.filter((post) => {
      const match = post.author === id;

      if (match) {
        comments = comments.filter((comment) => comment.post !== post.id);
      }
      return !match;
    });
    comments = comments.filter((comment) => comment.author !== id);

    return user_deleted[0];
  },
  createPost(parent, args, { db, pubsub }, info) {
    const { data } = args;
    const { author } = data;
    const author_valid = db.all_users.some((user) => user.id === author);
    if (!author_valid) throw new Error("invalid user");
    const newPost = {
      id: uuidv4(),
      ...data,
    };
    db.all_posts.push(newPost);

    if (newPost.published) {
      pubsub.publish(`post`, {
        post: {
          mutation: "CREATED",
          data: newPost,
        },
      });
    }

    return newPost;
  },
  updatePost(parent, args, { db, pubsub }, info) {
    const { id, data } = args;
    const { title, body, published } = data;

    const post = db.all_posts.find((p) => p.id === id);
    if (!post) throw new Error("Post Not Found");

    const originalPost = { ...post };

    if (typeof title === "string") {
      post.title = title;
    }
    if (typeof body === "string") {
      post.body = body;
    }
    if (typeof published === "boolean") {
      post.published = published;

      if (originalPost.published && !post.published) {
        //delete
        pubsub.publish("post", {
          post: {
            mutation: "DELETED",
            data: originalPost,
          },
        });
      } else if (!originalPost.published && post.published) {
        //created
        pubsub.publish("post", {
          post: {
            mutation: "CREATED",
            data: post,
          },
        });
      }
    } else if (post.published) {
      //updated
      pubsub.publis("post", {
        post: {
          mutation: "UPDATEED",
          data: post,
        },
      });
    }

    return post;
  },

  deletePost(parent, args, { db }, info) {
    const { id } = args;
    const postIdx = db.all_posts.findIndex((p) => p.id === id);
    if (postIdx < 0) throw new Error("Post Not Found");
    const deletedPost = db.all_posts.splice(postIdx, 1);
    comments = db.comments.filter((comment) => comment.post !== id);
    return deletedPost[0];
  },

  createComment(parent, args, { db, pubsub }, info) {
    const { data } = args;
    const { author, post } = data;

    const author_valid = db.all_users.some((user) => user.id === author);
    if (!author_valid) throw new Error("invalid user");

    const post_valid = db.all_posts.find((p) => p.id === post);
    if (!post_valid) throw new Error("post not exists");

    const isPostPublished = post_valid.published;
    if (!isPostPublished) throw new Error("post not published");

    const createComment = {
      id: uuidv4(),
      ...data,
    };

    db.comments.push(createComment);
    pubsub.publish(`comment ${post}`, {
      comment: {
        mutation: "CREATED",
        data: createComment,
      },
    });
    return createComment;
  },

  updateComment(parent, args, { db,pubsub }, info) {
    const { id, data } = args;
    const { text} = data;
    const comment = db.comments.find((c) => c.id === id);
    if (!comment) throw new Error("Post Not Found");
    if (typeof text === "string") {
      comment.text = text;
    }

    pubsub.publish(`comment ${comment.post}`, {
      comment: {
        mutation: "UPDATED",
        data: comment,
      },
    });

    return comment;
  },
  deleteComment(parent, args, { db,pubsub }, info) {
    const { id} = args;
    const commentIndex = db.comments.findIndex((comment) => comment.id === id);
    if (commentIndex < 0) throw new Error("comment not exists");
    const deletedComment = db.comments.splice(commentIndex, 1);

    pubsub.publish(`comment ${deletedComment[0].post}`, {
      comment: {
        mutation: "DELETED",
        data: deletedComment[0],
      }
    });

    return deletedComment[0];
  },
};

export { Mutation as default };
