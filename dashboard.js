
// ===== LOAD POSTS =====
let posts = JSON.parse(localStorage.getItem("posts")) || [];

// ===== DEFAULT POSTS (optional) =====
if (posts.length === 0) {
  posts = [
    {
      id: 1,
      title: "Exploring the Future of Tech",
      date: "2024-07-26",
      content: "Technology is evolving faster than ever. Here's what the future may hold...",
      image: "tech.jpg"
    },
    {
      id: 2,
      title: "The Art of Minimalist Design",
      date: "2024-07-20",
      content: "Less is more. Let's explore how simplicity drives modern design.",
      image: "design.jpg"
    },
    {
      id: 3,
      title: "A Guide to Sustainable Living",
      date: "2024-07-15",
      content: "Small steps make big changes. Learn practical ways to live sustainably.",
      image: "eco.jpg"
    }
  ];
  localStorage.setItem("posts", JSON.stringify(posts));
}

// ===== RENDER POSTS =====
const postList = document.getElementById("post-list");

function renderPosts() {
  postList.innerHTML = "";

  if (posts.length === 0) {
    postList.innerHTML = `<tr><td colspan="3" style="text-align:center;">No posts available</td></tr>`;
    return;
  }

  posts.forEach(post => {
    const row = document.createElement("tr");
    row.dataset.id = post.id;
    row.innerHTML = `
      <td>${post.title}</td>
      <td>${post.date}</td>
      <td>
        <a href="view.html?id=${post.id}">View</a> |
        <a href="edit.html?id=${post.id}">Edit</a> |
        <a href="#" class="delete-btn" data-id="${post.id}">Delete</a>
      </td>
    `;
    postList.appendChild(row);
  });
}

renderPosts();

// ===== DELETE FUNCTION =====
postList.addEventListener("click", (e) => {
  if (e.target.classList.contains("delete-btn")) {
    e.preventDefault();

    const postId = parseInt(e.target.dataset.id);
    if (confirm("Are you sure you want to delete this post?")) {
      posts = posts.filter(p => p.id !== postId);
      localStorage.setItem("posts", JSON.stringify(posts));
      renderPosts();
    }
  }
});

// ===== HIGHLIGHT UPDATED POST =====
const updatedPostId = sessionStorage.getItem("updatedPostId");
if (updatedPostId) {
  const row = document.querySelector(`tr[data-id="${updatedPostId}"]`);
  if (row) {
    row.style.backgroundColor = "#c0e8d5";
    setTimeout(() => {
      row.style.transition = "background-color 1s ease";
      row.style.backgroundColor = "transparent";
    }, 2000);
  }
  sessionStorage.removeItem("updatedPostId");
}

// ===== SIDEBAR TOGGLE (for mobile) =====
const menuToggle = document.querySelector('.menu-toggle');
const sidebar = document.querySelector('.sidebar');
const overlay = document.querySelector('.overlay');

if (menuToggle && sidebar && overlay) {
  menuToggle.addEventListener('click', () => {
    sidebar.classList.toggle('active');
    overlay.classList.toggle('active');
  });

  overlay.addEventListener('click', () => {
    sidebar.classList.remove('active');
    overlay.classList.remove('active');
  });

  // Optional: close sidebar when a link is clicked (mobile)
  document.querySelectorAll('.sidebar ul li a').forEach(link => {
    link.addEventListener('click', () => {
      sidebar.classList.remove('active');
      overlay.classList.remove('active');
    });
  });
}

