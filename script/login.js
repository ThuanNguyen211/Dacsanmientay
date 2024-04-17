document.getElementById('loginform').addEventListener('submit', function(e) {
    e.preventDefault();
    
    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;
    
    // Giả sử bạn có một hàm để kiểm tra thông tin đăng nhập
    var emailType = checkLogin(email, password);
    
    // Chuyển hướng người dùng dựa trên loại tài khoản
    if (emailType === 'admin') {
        alert('Đăng nhập thành công tài khoản admin!');
        window.location.href = '/admin.html'; // Thay thế bằng đường dẫn thực tế của bạn
    } else if (emailType === 'user') {
        alert('Đăng nhập thành công tài khoản user!');
        window.location.href = '/index.html'; // Thay thế bằng đường dẫn thực tế của bạn
    } else {
        alert('Thông tin đăng nhập không chính xác!');
    }
  });
  
  function checkLogin(email, password) {
    // Giả sử bạn có một cơ sở dữ liệu hoặc một cách nào đó để kiểm tra thông tin đăng nhập
    // Đây chỉ là một ví dụ đơn giản
    if (email === 'admin@gmail.com' && password === 'admin123') {
      return 'admin';
    } else if (email  === 'user@gmail.com' && password === 'user123') {
      return 'user';
    } else {
      return null;
    }
  }
// window.onload = function() {
//     var registeredUsername = localStorage.getItem('newEmail');
//     var registeredPassword = localStorage.getItem('newPassword');
    
//     if (registeredUsername && registeredPassword) {
//       document.getElementById('email').value = registeredUsername;
//       document.getElementById('password').value = registeredPassword;
//     }
//   };

document.getElementById('togglePassword').addEventListener('click', function () {
  // Lấy trường nhập mật khẩu
  var passwordInput = document.getElementById('password');
  // Kiểm tra type của input
  if (passwordInput.type === 'password') {
    // Chuyển type của input thành text để hiển thị mật khẩu
    passwordInput.type = 'text';
    // Thay đổi icon nếu bạn muốn
    this.classList.toggle('fa-eye-slash');
  } else {
    // Chuyển type của input thành password để ẩn mật khẩu
    passwordInput.type = 'password';
    // Thay đổi icon nếu bạn muốn
    this.classList.toggle('fa-eye-slash');
  }
});
  