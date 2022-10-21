fetch("https://jsonplaceholder.typicode.com/users")
  .then((res) => res.json())
  .then((data) => {
    const userData = data;
    let users = `
    <thead>
        <th>Name</th>
        <th>Username</th>
        <th>Email</th>
    </thead>
    `;
    data.forEach((user) => {
      users += `
        <tr>
            <td id="${user.id}" class="user_name">${user.name}</td>
            <td>${user.username}</td>
            <td>${user.email}</td>
        </tr>
        `;
    });
    document.getElementById("users").innerHTML = users;
    userData.forEach((user) => {
      document.getElementById(user.id).addEventListener("click", getPosts);
    });
    document.getElementById("1").click();
  });

function getPosts() {
  fetch("https://jsonplaceholder.typicode.com/posts")
    .then((res) => res.json())
    .then((data) => {
      let postsByUser = "<h2>My Posts</h2>";
      const clickedId = (e) => {
        data
          .filter((post) => e.target.id == post.userId)
          .forEach((filteredPost) => {
            postsByUser += `
                  <ul class="container">
                      <li class="title">${filteredPost.title}</li>
                      <li class="body">${filteredPost.body}</li>
                  </ul>
              `;
          });
        document.getElementById("postsByUser").innerHTML = postsByUser;
      };
      document
        .querySelectorAll(".user_name")
        .forEach((el) => el.addEventListener("click", clickedId));
    });
}
