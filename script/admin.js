const $ = document.querySelector.bind(document);
const currentUserAPI = "http://localhost:3000/currentUser";

function getCurrentUser(callback) {
    fetch(currentUserAPI)
        .then(res => res.json())
        .then(callback);
}

getCurrentUser(user => {
    if (user.role != "admin") {
        window.location.href = "index.html";
        alert("chỉ admin mới được vào trang admin");
    }
})


const signoutBtn = $("#logout");
signoutBtn.addEventListener("click", event => {
    fetch(currentUserAPI, {
        method: 'PUT',
        body: JSON.stringify({
            id:null,
            username: "",
            role:""
        }),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
    })
    window.location.href = "index.html";
})
