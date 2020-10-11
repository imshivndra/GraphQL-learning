
  const Comment={
    author(parent, args, {db}, info) {
      const { author } = parent;
      return db.all_users.find((user) => user.id === author);
    },
    post(parent, args, {db}, info) {
      const { post } = parent;

      return db.all_posts.find((p) => p.id === post);
    }
}

export {Comment as default};