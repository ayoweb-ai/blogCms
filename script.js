// Modal open/close
const modal = document.getElementById("authModal");
const openBtns = [document.getElementById("getStartedBtn"), document.getElementById("heroBtn")];
const closeBtn = document.querySelector(".close");

openBtns.forEach(btn => btn.addEventListener("click", () => modal.style.display = "flex"));
closeBtn.onclick = () => modal.style.display = "none";
window.onclick = e => { if (e.target === modal) modal.style.display = "none"; };

// Auth tabs
const loginTab = document.getElementById("loginTab");
const signupTab = document.getElementById("signupTab");
const loginForm = document.getElementById("loginForm");
const signupForm = document.getElementById("signupForm");

loginTab.onclick = () => {
  loginTab.classList.add("active");
  signupTab.classList.remove("active");
  loginForm.classList.add("active");
  signupForm.classList.remove("active");
};

signupTab.onclick = () => {
  signupTab.classList.add("active");
  loginTab.classList.remove("active");
  signupForm.classList.add("active");
  loginForm.classList.remove("active");
};

// Redirect after login/signup
loginForm.onsubmit = e => {
  e.preventDefault();
  window.location.href = "dashboard.html";
};

signupForm.onsubmit = e => {
  e.preventDefault();
  window.location.href = "dashboard.html";
};
