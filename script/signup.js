import { nanoid } from "../node_modules/nanoid/nanoid.js"

let data = [];
fetch("../json/user.json")
    .then(res => res.json())
    .then(res => data = [...res])

document.getElementById('signupForm').addEventListener('submit', function (e) {
    e.preventDefault();
    const newUsername = document.getElementById('newUsername').value;
    const newEmail = document.getElementById('newEmail').value;
    const newPassword = document.getElementById('newPassword').value;
    const confirmPassword = document.getElementById("confirmPassword").value;
    const iduser = nanoid();
    console.log(newUsername, newEmail, newPassword, iduser);
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
        const fs = require("fs");
        const userJSON = "../json/user.json";
        const newUser = {"iduser":iduser, "username":newUsername, "email":newEmail, "password":newPassword, "role":"user"}
        data.push(newUser);
        try {
            const data = fs.readFileSync(userJSON);
            const dataJSON = JSON.stringify(data);
            fs.writeFileSync(userJSON, dataJSON);
        } catch (error) {
            console.error(error);
        }
        alert('Đăng ký thành công!');
    }
});
