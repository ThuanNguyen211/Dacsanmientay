const userAPI = "http://localhost:3000/user";
const currentUserAPI = "http://localhost:3000/currentUser";

const checkUser = () => {
    fetch(currentUserAPI)
        .then(res => res.json())
        .then(user => {
            if (user.role === "admin") {
                window.location.href = "/admin.html";
            } else if (user.role === "user") {
                window.location.href = "/index.html";
            }
        })
}
window.onload = checkUser;



function getUser(callback) {
    fetch(userAPI)
        .then(res => res.json())
        .then(callback);
}
let userList = [];
getUser((res) => userList = [...res])


document.getElementById('loginform').addEventListener('submit', function (e) {
    e.preventDefault();

    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;

    // Giả sử bạn có một hàm để kiểm tra thông tin đăng nhập
    var [emailType, ok, userid, usernameString] = checkLogin(email, password);

    // Chuyển hướng người dùng dựa trên loại tài khoản
    if (ok) {

        fetch(currentUserAPI, {
            method: 'PUT',
            body: JSON.stringify({
                id:userid,
                username: usernameString
            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        })

        if (emailType === 'admin') {
            alert('Đăng nhập thành công tài khoản admin!');
            //window.location.href = "/admin.html";// Thay thế bằng đường dẫn thực tế của bạn
        } else if (emailType === 'user') {
            alert('Đăng nhập thành công tài khoản user!');
            //window.location.href = '/index.html'; // Thay thế bằng đường dẫn thực tế của bạn
        }
    }
    else {
        alert('Thông tin đăng nhập không chính xác!');
    }
    return false;
});

function checkLogin(email, password) {
    //console.log(userList);
    let ok = false;
    for (let i = 0; i < userList.length; i++) {
        if (userList[i].email === email && userList[i].password === password) {
            ok = true;
            if (userList[i].role == "admin") return ["admin", ok, userList[i].id, userList[i].username];
            else if (userList[i].role == "user") return ["user", ok, userList[i].id, userList[i].username];
        }
    }
    return [null, ok, null, null];
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
