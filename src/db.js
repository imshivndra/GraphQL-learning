let all_users = [
    {
      id: "12",
      name: "shivendra",
      email:"fdgdfs@gmail.com"
    },
    {
      id: "13",
      name: "neil",
      email:"somi@gmail.com"
    },
    {
      id: "14",
      name: "mayuri",
      email:"mayuri@gmail.com"
    },
  ];
  
  let all_posts = [
    {
      id: "1",
      title: "my first post",
      published: true,
      body: "this is the body",
      author: "12",
    },
    {
      id: "2",
      title: "my second post",
      published: false,
      body: "wow wonderful",
      author: "13",
    },
    {
      id: "3",
      title: "my third post",
      published: true,
      body: "it is done",
      author: "14",
    },
  ];
  
  let comments = [
    {
      id: "1",
      text: "looking nice biro",
      author: "12",
      post: "1",
    },
    {
      id: "2",
      text: "badass",
      author: "13",
      post: "1",
    },
    {
      id: "3",
      text: "cool picture",
      author: "14",
      post: "2",
    },
    {
      id: "4",
      text: "got it",
      author: "12",
      post: "3",
    },
  ];

  const db = {
    all_users,
    all_posts,
    comments,
  };
  
  export { db as default };