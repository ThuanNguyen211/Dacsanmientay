import { nanoid } from "../node_modules/nanoid/nanoid.js"

const userAPI = "http://localhost:3000/user";
const cartAPI = "http://localhost:3000/carts";
function getUser(callback) {
    fetch(userAPI)
        .then(res => res.json())
        .then(callback);
}
let data = [];
getUser((res) => data = [...res])

document.getElementById('signupForm').addEventListener('submit', e => {
    e.preventDefault();

    const newUsername = document.getElementById('newUsername').value;
    const newEmail = document.getElementById('newEmail').value;
    const newPassword = document.getElementById('newPassword').value;
    const confirmPassword = document.getElementById("confirmPassword").value;
    const iduser = nanoid();

    let ok = true;
    //-------------- valid -----------------
    data.forEach(user => {
        if (user.email === newEmail) {
            alert("Email đã được sử dụng");
            ok = false;
        }
    })
    const regex_email = new RegExp(/^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/);
    if (!regex_email.test(newEmail)) {
        ok = false;
        alert("email không đúng dịnh dạng");
    }
    if (newPassword !== confirmPassword) {
        ok = false;
        alert("Mật khẩu không trùng khớp");
    }
    //-------------------------------------
    if (ok) {
        const newUser = {"id":iduser, "username":newUsername, "email":newEmail, "password":newPassword, "role":"user"}
        function createUser(data, callback) {
            var options = {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                    // 'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: JSON.stringify(data)
            }
            fetch(userAPI, options)
                .then(function (response) {
                    response.json;
                })
                .then(callback)
        }
        function createCart(iduser) {
            fetch(cartAPI, {
                method: 'POST',
                body: JSON.stringify(
                    {
                        id:iduser,
                        danhSachSP: []
                    }
                ),
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                },
            })
        }
        createUser(newUser);
        createCart(newUser.id);
        alert('Đăng ký thành công!');
        window.location.href = "/login.html";
    }
    return ok;
});

