import products from '../assets/product.json' assert { type: 'json' };
const demoProducts = products.slice(0, 6);
// console.log(demoProduct);
const demo_grid = document.querySelector("#demo_grid");

demoProducts.forEach(product => {
    let card = document.createElement("div");
    card.className = "productItem";

    card.innerHTML = 
    `
    <a href="#" class="productThumbnail">
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