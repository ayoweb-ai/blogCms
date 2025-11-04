// ===== CREATE POST FUNCTIONALITY =====

// Handle form submission
document.getElementById("createForm").addEventListener("submit", (e) => {
  e.preventDefault();
  savePost("published");
});

// Handle "Save as Draft" button
document.getElementById("saveDraft").addEventListener("click", (e) => {
  e.preventDefault();
  savePost("draft");
});

// ===== SAVE POST FUNCTION =====
function savePost(status) {
  const title = document.getElementById("title").value.trim();
  const category = document.getElementById("category").value.trim();
  const content = document.getElementById("content").value.trim();
  const imageInput = document.getElementById("image");
  const file = imageInput.files[0];

  // Validation
  if (!title || !content || !category) {
    alert("Please fill in all fields before saving.");
    return;
  }

  let posts = JSON.parse(localStorage.getItem("posts")) || [];

  // Create a new post object with unique ID
  const newPost = {
    id: Date.now(),
    title,
    category,
    content,
    image: "",
    status,
    date: new Date().toLocaleDateString(),
  };

  // If an image is uploaded, convert it to Base64 and save
  if (file) {
    const reader = new FileReader();
    reader.onload = () => {
      newPost.image = reader.result;
      posts.push(newPost);
      localStorage.setItem("posts", JSON.stringify(posts));
      alert("Post saved successfully!");
      window.location.href = "dashboard.html";
    };
    reader.readAsDataURL(file);
  } else {
    posts.push(newPost);
    localStorage.setItem("posts", JSON.stringify(posts));
    alert("Post saved successfully!");
    window.location.href = "dashboard.html";
  }
}
