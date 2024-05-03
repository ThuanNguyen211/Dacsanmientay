const $ = document.querySelector.bind(document);
const currentUserAPI = "http://localhost:3000/currentUser";

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