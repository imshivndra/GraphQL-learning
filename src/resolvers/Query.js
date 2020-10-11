const Query= {
    me() {
      return {
        id: "456",
        name: "shivendra",
        email: "@gmail",
      };
    },
    posts(parent, args, {db}, info) {
      const { query } = args;
      if (!query) return db.all_posts;
      return db.all_posts.filter((posts) =>
        (posts.title.toLowerCase() || posts.body.toLowerCase()).includes(
          query.toLowerCase()
        )
      );
    },
    users(parent, args, {db}, info) {
      const { query } = args;
      if (!query) return db.all_users;
      return db.all_users.filter((users) =>
        users.name.toLowerCase().includes(query.toLowerCase())
      );
    },

    comments() {
      return comments;
    },
  }

  export {Query as default};