const URL = "https://jsonplaceholder.typicode.com/posts";

document.getElementById("fetch-posts").addEventListener("click", fetchPosts);

async function fetchPosts() {
  const postsContainer = document.getElementById("posts-container");
  postsContainer.innerHTML = "<p>Loading posts...</p>";

  try {
    const response = await fetch(URL);
    const posts = await response.json();
    postsContainer.innerHTML = "";

    posts.forEach((post) => {
      const postItem = document.createElement("li");
      postItem.innerHTML = `
        <h3>${post.title}</h3>
        <p>${post.body}</p>
        <button class="button button--success" onclick="editPost(${post.id})">Edit</button>
        <button class="button button--danger" onclick="deletePost(${post.id})">Delete</button>
      `;
      postsContainer.appendChild(postItem);
    });
  } catch (error) {
    postsContainer.innerHTML = "<p>Error loading posts.</p>";
    console.error("Error fetching posts:", error);
  }
}

async function deletePost(id) {
  try {
    await fetch(`${URL}/${id}`, { method: "DELETE" });
    alert(`Post ${id} deleted successfully!`);
    fetchPosts();
  } catch (error) {
    console.error("Error deleting post:", error);
  }
}

function editPost(id) {
  window.location.href = `update-post.html?id=${id}`;
}

document.getElementById("create-post").addEventListener("click", () => {
  window.location.href = "create-post.html";
});
