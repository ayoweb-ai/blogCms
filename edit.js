
// ===== SIDEBAR TOGGLE FUNCTIONALITY =====
const menuToggle = document.getElementById("menu-toggle");
const sidebar = document.getElementById("sidebar");
const overlay = document.getElementById("overlay");

if (menuToggle && sidebar && overlay) {
  menuToggle.addEventListener("click", () => {
    sidebar.classList.toggle("active");
    overlay.classList.toggle("active");
  });

  overlay.addEventListener("click", () => {
    sidebar.classList.remove("active");
    overlay.classList.remove("active");
  });
}

// ===== GET POST ID FROM URL =====
const urlParams = new URLSearchParams(window.location.search);
const postId = parseInt(urlParams.get("id"));

// ===== LOAD POSTS =====
let posts = JSON.parse(localStorage.getItem("posts")) || [];

// ===== FIND POST =====
let post = posts.find(p => p.id === postId);

// ===== GET FORM ELEMENTS =====
const form = document.getElementById("editForm");
const titleInput = document.getElementById("title");
const categoryInput = document.getElementById("category");
const contentInput = document.getElementById("content");
const imageInput = document.getElementById("image");

// ===== LOAD EXISTING POST DATA =====
if (post) {
  titleInput.value = post.title || "";
  categoryInput.value = post.category || "";
  contentInput.value = post.content || "";
  imageInput.value = post.image || "";
} else {
  alert("⚠️ Post not found! Redirecting to dashboard...");
  window.location.href = "dashboard.html";
}

// ===== CANCEL BUTTON =====
document.querySelector(".cancel").addEventListener("click", () => {
  window.location.href = "dashboard.html";
});

// ===== UPDATE POST =====
form.addEventListener("submit", (e) => {
  e.preventDefault();

  const updatedTitle = titleInput.value.trim();
  const updatedCategory = categoryInput.value.trim();
  const updatedContent = contentInput.value.trim();
  const updatedImage = imageInput.value.trim();

  if (!updatedTitle || !updatedContent) {
    alert("⚠️ Please fill in all required fields.");
    return;
  }

  // Update post object
  post.title = updatedTitle;
  post.category = updatedCategory;
  post.content = updatedContent;
  post.image = updatedImage;
  post.date = new Date().toLocaleDateString(); // Update date

  // Replace the post in the array
  posts = posts.map(p => (p.id === postId ? post : p));
  localStorage.setItem("posts", JSON.stringify(posts));

  // Notify dashboard
  sessionStorage.setItem("updatedPostId", postId);

  alert("✅ Post updated successfully!");
  window.location.href = "dashboard.html";
});
