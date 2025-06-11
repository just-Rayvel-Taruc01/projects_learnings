// Peek Password
document.addEventListener('DOMContentLoaded', function() {
  document.getElementById('togglePassword').addEventListener('click', function () {
  const passwordInput = document.getElementById('Login_pass');
  const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
  passwordInput.setAttribute('type', type);
});
});
