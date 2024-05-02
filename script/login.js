const userAPI = "http://localhost:3000/user";
function getUser(callback) {
    fetch(userAPI)
        .then(res => res.json())
        .then(callback);
}
let data = [];
getUser((res) => data = [...res])

document.getElementById('loginform').addEventListener('submit', function (e) {
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
    console.log(data);
    for (let i = 0; i < data.length; i++) {
        if (data[i].email === email && data[i].password === password) {
            if (data[i].role == "admin") return "admin";
            else if (data[i].role == "user") return "user";
        }
    }
    return null;
}

//------------ toggle password ------------------------
document.getElementById('togglePassword').addEventListener('click', function () {
    // Lấy trường nhập mật khẩu
    var passwordInput = document.getElementById('password');
    // Kiểm tra type của input
    if (passwordInput.type === 'password') {
        // Chuyển type của input thành text để hiển thị mật khẩu
        passwordInput.type = 'text';
        this.classList.remove('fa-eye');
        this.classList.add('fa-eye-slash');
    } else {
        // Chuyển type của input thành password để ẩn mật khẩu
        passwordInput.type = 'password';
        this.classList.remove('fa-eye-slash');
        this.classList.add('fa-eye');
    }
});
