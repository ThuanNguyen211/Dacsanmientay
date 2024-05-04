const cartAPI = "http://localhost:3000/carts";
const storageAPI = "http://localhost:3000/storage";
const hoadonAPI = "http://localhost:3000/hoadons";
const hoadon_table = $("#hoadon_table");
function getHoadon(callback) {
    fetch(hoadonAPI)
        .then(res => res.json())
        .then(callback)
}

getHoadon(danhsachHD => {
    danhsachHD.forEach(hoadon => {
        const hoadonHTML = document.createElement("tr");
        hoadonHTML.innerHTML =
            `
                <th>${hoadon.id}</th>
                <td>${hoadon.username}</td>
                <td>${hoadon.diachi}</td>
                <td>${hoadon.sdt}</td>
                <td>${hoadon.timeSubmit}</td>
                <td>${hoadon.thanhTien}</td>
                <td>${hoadon.PTthanhtoan}</td>
                <td>
                    ${hoadon.trangThai}
                </td>
                <td>
                    <a class="btn btn-primary" href="#" class="hoadon-link" data-bs-toggle="modal" data-bs-target="#${hoadon.id}">Chi
                        tiết</a>
                </td>
            `;
        hoadon_table.appendChild(hoadonHTML);
    })
})

const modalhoadons = $("#modalhoadons");
getHoadon(danhsachHD => {
    danhsachHD.forEach(hoadon => {
        const modalhoadon = document.createElement("div");
        modalhoadon.className = "modal";
        modalhoadon.id = hoadon.id;
        modalhoadon.innerHTML =
            `
            <div class="modal-dialog modal-dialog-centered modal-fullscreen">
                <div class="modal-content">

                    <!-- Modal Header -->
                    <div class="modal-header">
                        <h4 class="modal-title">Hóa đơn</h4>
                        <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                    </div>

                    <!-- Modal body -->
                    <div class="modal-body">
                        <div class="chitiethoadon">
                            <div class="container">
                                <div class="row">
                                    <div class="col-lg-12">
                                        <div class="card">
                                            <div class="card-body">
                                                <div class="invoice-title">
                                                    <h4 class="float-end font-size-15"><span
                                                            class="badge bg-success font-size-12 ms-2">Đã thanh toán</span></h4>
                                                    <div class="mb-4">
                                                        <h2 class="mb-1 text-muted">Tên doanh nghiệp</h2>
                                                    </div>
                                                    <div class="text-muted">
                                                        <p class="mb-1">KN3T - VietNam Food</p>
                                                        <p class="mb-1"><i class="uil uil-envelope-alt me-1"></i>contact@dacsanque.com</p>
                                                        <p><i class="uil uil-phone me-1"></i> 0123456789</p>
                                                    </div>
                                                </div>

                                                <hr class="my-4">

                                                <div class="row">
                                                    <div class="col-sm-6">
                                                        <div class="text-muted">
                                                            <h5 class="font-size-16 mb-3">Thanh toán bởi:</h5>
                                                            <h5 class="font-size-15 mb-2">${hoadon.username}</h5>
                                                            <p class="mb-1">${hoadon.diachi}</p>
                                                            <p>${hoadon.sdt}</p>
                                                        </div>
                                                    </div>
                                                    <!-- end col -->
                                                    <div class="col-sm-6">
                                                        <div class="text-muted text-sm-end">
                                                            <div>
                                                                <h5 class="font-size-15 mb-1">Mã hóa đơn:</h5>
                                                                <p>${hoadon.id}</p>
                                                            </div>
                                                            <div class="mt-4">
                                                                <h5 class="font-size-15 mb-1">Ngày lập hóa đơn:</h5>
                                                                <p>${hoadon.timeSubmit}</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <!-- end col -->
                                                </div>
                                                <!-- end row -->

                                                <div class="py-2">
                                                    <h5 class="font-size-15">Tóm tắt đơn hàng</h5>

                                                    <div class="table-responsive">
                                                        <table
                                                            class="table align-middle table-nowrap table-centered mb-0">
                                                            <thead>
                                                                <tr>
                                                                    <th>Tên sản phẩm</th>
                                                                    <th>Giá</th>
                                                                    <th>Số lượng</th>
                                                                    <th class="text-end" style="width: 120px;">Tổng
                                                                    </th>
                                                                </tr>
                                                            </thead><!-- end thead -->
                                                            <tbody id="table_${hoadon.id}" class="chitietHD">
                                                                
                                                            </tbody><!-- end tbody -->
                                                        </table><!-- end table -->
                                                    </div><!-- end table responsive -->
                                                    <div id="total_container_${hoadon.id}"></div>
                                                    <div class="d-print-none mt-4">
                                                        <div class="float-end">
                                                            <a href="javascript:window.print()"
                                                                class="btn btn-success me-1"><i
                                                                    class="fa fa-print"></i></a>
                                                            <a href="#" class="btn btn-primary w-md">Gửi</a>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div><!-- end col -->
                                </div>
                            </div>
                        </div>


                    </div>

                    <!-- Modal footer -->
                    <div class="modal-footer">
                        <button type="button" class="btn btn-danger" data-bs-dismiss="modal">Đóng</button>
                    </div>

                </div>
            </div>
            `
        modalhoadons.appendChild(modalhoadon);
    })
})
//------------------- danh sach sp trong modal ----------------

fetch(storageAPI)
        .then(res => res.json())
        .then(storage => {
        setTimeout(() => {
            const tbodys = document.querySelectorAll(".chitietHD");
            tbodys.forEach(tbody => {
                getHoadon(danhsachHD => {
                    danhsachHD.forEach(hoadon => {
                        if (tbody.id.includes(hoadon.id)) {
                            let danhSachSP = hoadon.cart;
                            let total = 0;
                            danhSachSP.forEach(item => {
                                let sanPham = document.createElement("tr");
                                let masp = item.masp;
                                let soluong = item.soluong;
                                let tensp, imgURL, price;
            
                                storage.forEach(sp => {
                                    if (sp.masp === masp) {
                                        tensp = sp.name;
                                        imgURL = sp.photo1;
                                        price = sp.price;
                                    }
                                })
                                total += price * soluong;
                                console.log(total);
                                sanPham.innerHTML =
                                    `
                                
                                    <td>
                                        <div class="sp_container">
                                            <div class="spImg_container"><img src="${imgURL}"></div>
                                            <h5 class="text-truncate font-size-14 mb-1">
                                                ${tensp}</h5>
                                        </div>
                                    </td>
                                    <td><span class="price">${price}<sup>đ</sup></span></td>
                                    <td>
                                        ${soluong}
                                    </td>
                                    <td class="text-end">
                                        <p class="price">${price * soluong}<sup>đ</sup></p>
                                    </td>
                                    
                                
                                `
                                tbody.appendChild(sanPham);
                            })
                            const total_container = $(`#total_container_${hoadon.id}`);
                            total_container.innerHTML =
                                `
                                <p class="fs-3 text-end fw-semibold">Thành tiền: <span class="price" id="thanhtien">${total}<sup>đ</sup></span></p>
                                `
                        }
                    })
                })
            })
        }, 500)
    })



