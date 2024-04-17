document.getElementById('registerForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    var newUsername = document.getElementById('newUsername').value;
    var newEmail = document.getElementById('newEmail').value;
    var newPassword = document.getElementById('newPassword').value;
    
    // Lưu thông tin đăng ký vào local storage hoặc gửi đến server
    localStorage.setItem('newUsername', newUsername);
    localStorage.setItem('newEmail', newEmail);
    localStorage.setItem('newPassword', newPassword);
    
    // Hiển thị thông báo hoặc chuyển hướng người dùng
    alert('Đăng ký thành công!');
  });
  