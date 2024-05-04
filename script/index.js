const productAPI = "http://localhost:3000/storage";
let products = [];
async function getProduct(callback) {
    fetch(productAPI)
        .then(res => res.json())
        .then(callback)
}


const printDemoProduct = (products) => {
    const demoProducts = products.slice(0, 6);

    const demo_grid = document.querySelector("#demo_grid");

    demoProducts.forEach(product => {
        let card = document.createElement("div");
        card.className = "productItem";

        card.innerHTML =
            `
    <a href="product-detail.html?masp=${product.masp}" class="productThumbnail">
                                <img src=${product.photo1} alt="">
                            </a>
                            <p class="text-center m-0" style="color: #dc2626">
                                ${product.price}₫
                            </p>
                            <h2 class="productName text-center m-0 fs-5">
                                <a href="#" class="text-dark">
                                    ${product.name}
                                </a>
                            </h2>
                            <div class="product-rating d-flex justify-content-center fs-6" style="color:#ff9d00">
                                <i class="bi bi-star-fill"></i>
                                <i class="bi bi-star-fill"></i>
                                <i class="bi bi-star-fill"></i>
                                <i class="bi bi-star-fill"></i>
                                <i class="bi bi-star-fill"></i>
                            </div>
    `

        demo_grid.appendChild(card);
    })
}

getProduct(printDemoProduct);

//--------- Gio hang ------------------
const currentUserAPI = "http://localhost:3000/currentUser";
function getCurrentUser(callback) {
    fetch(currentUserAPI)
        .then(res => res.json())
        .then(callback);
}

getCurrentUser(user => {
    if (user.id != null) {
        let link_taikhoan = document.querySelector("#link_taikhoan");
        link_taikhoan.href = "user.html";
        link_taikhoan.innerHTML = 
        `
        <i class="bi bi-person-circle pe-2"></i>
        Xin chào ${user.username}
        `
    }
})

//----------------- Nut gio hang ----------------
const cart_icon = document.querySelector("#cart_icon");
cart_icon.addEventListener("click", () => {
    getCurrentUser(user => {
        if (user.id == null) {
            window.location.href = "login.html";
            alert("Vui lòng đăng nhập trước khi xem giỏ hàng");
        } else {
            window.location.href = "user.html";
        }
    })
})