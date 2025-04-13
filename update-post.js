const params = new URLSearchParams(window.location.search);
const postId = params.get("id");
console.log("Post ID:", postId);

const postTitleInput = document.getElementById("post-title");
const postBodyInput = document.getElementById("post-body");
const updateForm = document.getElementById("update-post-form");
const messageContainer = document.createElement("p");
messageContainer.id = "message-container";
document.querySelector(".container").appendChild(messageContainer);

async function fetchPost() {
  try {
    const response = await fetch(
      `https://jsonplaceholder.typicode.com/posts/${postId}`
    );
    if (!response.ok) throw new Error("Post not found");

    const post = await response.json();
    postTitleInput.value = post.title;
    postBodyInput.value = post.body;
  } catch (error) {
    console.error("Error fetching post:", error);
    messageContainer.textContent = "Error fetching post data.";
    messageContainer.style.color = "red";
  }
}

updateForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  const title = postTitleInput.value.trim();
  const body = postBodyInput.value.trim();

  if (!title || !body) {
    messageContainer.textContent = "Both title and body are required.";
    messageContainer.style.color = "red";
    return;
  }

  try {
    const response = await fetch(
      `https://jsonplaceholder.typicode.com/posts/${postId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, body }),
      }
    );

    if (!response.ok) throw new Error("Failed to update the post");

    messageContainer.textContent = "Post updated successfully!";
    messageContainer.style.color = "green";

    postTitleInput.value = "";
    postBodyInput.value = "";
  } catch (error) {
    console.error("Error updating post:", error);
    messageContainer.textContent = "Error updating the post.";
    messageContainer.style.color = "red";
  }
});

const backButton = document.createElement("button");
backButton.textContent = "Go to Home";
backButton.classList.add("button", "button--primary");
backButton.addEventListener("click", () => {
  window.location.href = "index.html";
});
document.querySelector(".container").appendChild(backButton);

fetchPost();

// TODO
// Make API request to fetch the post with the given ID (Get request)
// Prefill the form in update-post.html with the post title and body

// When a user submits the form, validate the form data
// If form data is not valid, show error messages
// If form data is valid, make an API request to update the post (PUT request)
// Shouw a success message (do NOT use alert!) on the screen after successful response is recieved in the API request
// Add a button to navigate back to the home page (index.html)
