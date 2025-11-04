// ===== SIDEBAR TOGGLE =====
const menuToggle = document.getElementById("menu-toggle");
const sidebar = document.getElementById("sidebar");
const overlay = document.getElementById("overlay");

menuToggle.addEventListener("click", () => {
  sidebar.classList.toggle("active");
  overlay.classList.toggle("active");
});

overlay.addEventListener("click", () => {
  sidebar.classList.remove("active");
  overlay.classList.remove("active");
});

// ===== LOAD POST DATA =====
const urlParams = new URLSearchParams(window.location.search);
const postId = urlParams.get("id");

const defaultPosts = [
  {
    id: 1,
    title: "Exploring the Future of Tech",
    content: "Technology is evolving faster than ever. Here's what the future may hold...",
    image: "tech.jpg",
    date: "18/7/2024",
  },
  {
    id: 2,
    title: "The Art of Minimalist Design",
    content: "Less is more. Let's explore how simplicity drives modern design.",
    image: "design.jpg",
    date: "2024-07-20",
  },
  {
    id: 3,
    title: "A Guide to Sustainable Living",
    content: "Small steps make big changes. Learn practical ways to live sustainably.",
    image: "eco.jpg",
    date: "2024-07-15",
  },
];

let posts = JSON.parse(localStorage.getItem("posts")) || defaultPosts;
let post = posts.find(p => p.id == postId);

const titleEl = document.getElementById("post-title");
const dateEl = document.getElementById("post-date");
const imageEl = document.getElementById("post-image");
const contentEl = document.getElementById("post-content");

if (post) {
  titleEl.textContent = post.title;
  dateEl.textContent = `Published on ${post.date}`;
  imageEl.src = post.image || "placeholder.jpg";
  contentEl.textContent = post.content;
} else {
  titleEl.textContent = "Post Not Found";
  contentEl.textContent = "The post you are looking for could not be found.";
  imageEl.style.display = "none";
}
