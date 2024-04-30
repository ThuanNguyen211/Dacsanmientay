    // Lấy mã sản phẩm từ URL
const params = new URLSearchParams(window.location.search);
const productId = params.get('masp');

// Hàm để lấy dữ liệu sản phẩm và hiển thị chi tiết
function fetchProductDetail() {
  fetch("assets/product.json")
    .then(response => response.json())
    .then(products => {
      const product = products.find(p => p.masp === productId);
      displayProduct(product);
      detail(product);
      // addCart(product);
    })
    .catch(error => console.error('Lỗi khi lấy dữ liệu:', error));
}

function displayProduct(product) {
  if (product) {
    const container = document.getElementById('product-container');
    container.innerHTML = `
    <div class="product-detail" id="products">
        <div class="product-image">
          <!-- Carousel start -->
          <div id="productCarousel" class="carousel slide" data-bs-ride="carousel">
            <div class="carousel-inner">
              <div class="carousel-item active">
                <img src="${product.photo1}" class="d-block w-100" alt="${product.name}">
              </div>
              <div class="carousel-item">
                <img src="${product.photo2}" class="d-block w-100" alt="${product.name}">
              </div>
              <!-- Thêm thẻ div với class 'carousel-item' cho mỗi hình ảnh khác bạn muốn hiển thị -->
            </div>
            <button class="carousel-control-prev" type="button" data-bs-target="#productCarousel" data-bs-slide="prev">
              <span class="carousel-control-prev-icon" aria-hidden="true"></span>
              <span class="visually-hidden">Trước</span>
            </button>
            <button class="carousel-control-next" type="button" data-bs-target="#productCarousel" data-bs-slide="next">
              <span class="carousel-control-next-icon" aria-hidden="true"></span>
              <span class="visually-hidden">Tiếp theo</span>
            </button>
          </div>
          <!-- Carousel end -->
        </div>
        <div class="product-info">
          <h2>${product.name}</h2>
          <p class="price">${product.price}<sup>đ</sup></p>
          <div">
            <input type="number" value="1" min="1">
            <button class="btn btn-primary"  onClick='addToCart(${product.masp})'>Thêm vào giỏ hàng</button>
          </div>
        </div>
      </div>
    `;
  } else {
    console.error('Sản phẩm không tồn tại!');
  }
}

// Hàm để hiển thị chi tiết sản phẩm
function detail(product) {
  if (product) {
    const container = document.getElementById('detail');
    container.innerHTML = `
      <br>
      <h3>Thông Tin  Sản Phẩm</h3>
      <div class="product-detail">
        <div class="product-info">
          <table class="table">
            <tbody>
              <tr>
                <td>Mã sản phẩm</td>
                <td>${product.masp}</td>
              </tr>
              <tr>
                <td>Mô tả sản phẩm</td>
                <td>${product.content}</td>
              </tr>
              <tr>
                <td>Trọng lượng</td>
                <td></td>
              </tr>
              <tr>
                <td>Bảo quản</td>
                <td></td>
              </tr>
            </tbody>
          </table>
      </div>
    `;
  } else {
    console.error('Sản phẩm không tồn tại!');
  }
}

// Gọi hàm để lấy dữ liệu và hiển thị chi tiết sản phẩm
fetchProductDetail();

// function addCart(product){
//     console.log(product.masp, product.name, product.price)
// }

// const btn = document.querySelectorAll("button.product-info")
// // console.log(btn)
// btn.forEach(function content(button){
//     button.addEventListener("click",function(event){
//         var btnItem = event.target
//         var product = btnItem.parentElement
//         var productInput = product.querySelector("input")
//         console.log(productInput)
//     })
// })


let productInCart = localStorage.getItem("products") ? JSON.parse(localStorage.getItem("product-detail")) : []

function addToCart(masp){
  let checkProduct = productInCart.some(p => p.masp === masp)
  console.log(checkProduct)
}