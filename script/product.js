// Mảng sản phẩm từ file JSON của bạn
function fetchProducts() {
    fetch("json/product.json") // Thay thế 'path/to/your/products.json' bằng đường dẫn thực tế đến file JSON của bạn
      .then(response => response.json())
      .then(data => displayProducts(data.storage))
      .catch(error => console.error('Lỗi khi lấy dữ liệu:', error));
  }
  
  // Gọi hàm để lấy dữ liệu và hiển thị sản phẩm
  fetchProducts();
  
  // Hàm để tạo thẻ sản phẩm
function createProductCard(product) {
    const card = document.createElement('div');
    card.className = 'col-md-3 mb-4'; // Sử dụng lớp Bootstrap cho lưới phản hồi
    card.innerHTML = `
      <div class="card">
      <img class="card-img-top" src="${product.photo1}" alt="${product.name}">
      <div class="card-body">
          <h5 class="card-title">${product.name}</h5>
          <a href="product-detail.html?masp=${product.masp}" class="btn btn-primary">Xem chi tiết</a>
      </div>
      </div>
    `;
    return card;
  }
  
  // Hàm để hiển thị tất cả sản phẩm
function displayProducts(products) {
    const container = document.getElementById('product-container');
    products.forEach(product => {
      const productCard = createProductCard(product);
      container.appendChild(productCard);
    });
  }
  
  // Gọi hàm hiển thị sản phẩm
displayProducts(products);

  
function searchProducts() {
    // Lấy giá trị nhập vào từ thanh tìm kiếm
    let input = document.getElementById('searchInput').value;
    input = input.toLowerCase();
    let productCards = document.getElementById('product-container').getElementsByClassName('col-md-3 mb-4');
  
    // Lặp qua tất cả các sản phẩm và ẩn những sản phẩm không khớp với từ khóa tìm kiếm
    for (let i = 0; i < productCards.length; i++) {
      if (!productCards[i].innerHTML.toLowerCase().includes(input)) {
        productCards[i].style.display = "none";
      } else {
        productCards[i].style.display = "";
      }
    }
}

function searchAll() {  
  let productCards = document.getElementById('product-container').getElementsByClassName('col-md-3 mb-4');

  for (let i = 0; i < productCards.length; i++) {
    if (!productCards[i].innerHTML.toLowerCase().includes("traicay") && !productCards[i].innerHTML.toLowerCase().includes("thucphamkho")) {
      productCards[i].style.display = "none";
    } else {
      productCards[i].style.display = "";
    }
  }
}

function searchTraiCay() {  
  // Lặp qua tất cả các sản phẩm và ẩn những sản phẩm không khớp với từ khóa tìm kiếm
  let productCards = document.getElementById('product-container').getElementsByClassName('col-md-3 mb-4');

  for (let i = 0; i < productCards.length; i++) {
    if (!productCards[i].innerHTML.toLowerCase().includes("traicay")) {
      productCards[i].style.display = "none";
    } else {
      productCards[i].style.display = "";
    }
  }
}

function searchThucPhamKho() {  
    // Lặp qua tất cả các sản phẩm và ẩn những sản phẩm không khớp với từ khóa tìm kiếm
    let productCards = document.getElementById('product-container').getElementsByClassName('col-md-3 mb-4');

    for (let i = 0; i < productCards.length; i++) {
      if (!productCards[i].innerHTML.toLowerCase().includes("thucphamkho")) {
        productCards[i].style.display = "none";
      } else {
        productCards[i].style.display = "";
      }
    }
}