import { nanoid } from "../node_modules/nanoid/nanoid.js"

const $ = document.querySelector.bind(document);

const currentUserAPI = "http://localhost:3000/currentUser";
const cartAPI = "http://localhost:3000/carts";
const storageAPI = "http://localhost:3000/storage";
const hoadonAPI = "http://localhost:3000/hoadons";
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
    } else {
        window.location.href = "login.html";
        alert("Vui lòng đăng nhập");
    }
})
//-----------------------Log out -----------------------
const logoutBtn = $("#logout");
logoutBtn.addEventListener("click", event => {
    fetch(currentUserAPI, {
        method: 'PUT',
        body: JSON.stringify({
            id: null,
            username: "",
            role: ""
        }),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
    })
    window.location.href = "index.html";
})

//---------------------- Hien Gio hang -----------------------
let cart_container = $("#cart_container");

let storage = []
function getStorage() {
    fetch(storageAPI)
        .then(res => res.json())
        .then(res => storage = [...res])
}
getStorage()

//storage.then(item => console.log(item))

const currentUserID = fetch(currentUserAPI)
    .then(res => res.json())
    .then(user => user.id)

currentUserID.then(userid => {
    function getCart(callback) {
        fetch(`${cartAPI}/${userid}`)
            .then(res => res.json())
            .then(callback)
    }

    getCart(cart => {
        let danhSachSP = cart.danhSachSP;
        //console.log(storage)
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
                        <div class="input_group">
                            <button type="button" class="decrementSoluongBtn">
                                -
                            </button>
                            <input type="number" min=1 value="${soluong}" class="soluong_input" masp="${masp}">
                            <button type="button" class="incrementSoluongBtn">
                            +
                            </button>
                        </div>
                    </td>
                    <td class="text-end">
                        <p class="price">${price * soluong}<sup>đ</sup></p>
                    </td>
                    <td class="text-center">
                        <a class="btn xoa_sp" masp="${masp}">
                            <i class="bi bi-trash3 fs-4"></i>
                        </a>
                    </td>
                
                `
            cart_container.appendChild(sanPham);
        })
        const total_container = $("#total_container");
        total_container.innerHTML =
            `
                <p class="fs-3 text-end fw-semibold">Thành tiền: <span class="price" id="thanhtien">${total}<sup>đ</sup></span></p>
            `
    })
})



//----------------------- input handler ----------------------------

function getCart(callback) {
    getCurrentUser(user => {
        fetch(`${cartAPI}/${user.id}`)
            .then(res => res.json())
            .then(callback)
    })
}

function addCartAPI(danhSachSP) {
    getCurrentUser(user => {
        fetch(`${cartAPI}/${user.id}`, {
            method: 'PATCH',
            body: JSON.stringify(
                {
                    "danhSachSP": danhSachSP
                }
            ),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        })
    })
}

setTimeout(() => {

    const xoa_sp = (masp) => {
        getCart(cart => {
            let danhSachSP = cart.danhSachSP;
            for (let i = 0; i < danhSachSP.length; i++) {
                if (masp === danhSachSP[i].masp) {
                    danhSachSP.splice(i, 1);
                    addCartAPI(danhSachSP);
                }
            }
        })
    }

    const updateSoluong = (soluong_input) => {
        let masp = soluong_input.getAttribute("masp");
        let soluong = soluong_input.value;
        if (soluong < 1) {
            xoa_sp(masp);
        } else {
            getCart(cart => {
                let danhSachSP = cart.danhSachSP;
                for (let i = 0; i < danhSachSP.length; i++) {
                    if (masp === danhSachSP[i].masp) {
                        danhSachSP[i].soluong = soluong;
                        addCartAPI(danhSachSP);
                    }
                }
            })
        }
    }

    const soluong_inputs = document.querySelectorAll(".soluong_input");
    console.log(soluong_inputs)
    soluong_inputs.forEach(soluong_input => {
        soluong_input.addEventListener("change", (event) => updateSoluong(soluong_input));
    })
    //---------- giam so luong -----------------------
    const decrementSoluongBtns = document.querySelectorAll(".decrementSoluongBtn");
    decrementSoluongBtns.forEach(decrementSoluongBtn => {
        decrementSoluongBtn.addEventListener("click", (event) => {
            decrementSoluong(event.target)
        })
    })
    function decrementSoluong(button) {
        console.log(button)
        const soluong_input = button.parentNode.querySelector('[type=number]');
        let soluong = parseInt(soluong_input.value) - 1;
        soluong_input.value = soluong;
        updateSoluong(soluong_input)
    }

    //------------------- tang so luong -------------------------
    const incrementSoluongBtns = document.querySelectorAll(".incrementSoluongBtn");
    incrementSoluongBtns.forEach(incrementSoluongBtn => {
        incrementSoluongBtn.addEventListener("click", (event) => {
            incrementSoluong(event.target)
        })
    })
    function incrementSoluong(button) {
        const soluong_input = button.parentNode.querySelector('[type=number]');
        let soluong = parseInt(soluong_input.value) + 1;
        soluong_input.value = soluong;
        updateSoluong(soluong_input)
    }
    //------------------- Xoa sp --------------------------------
    const xoa_sps = document.querySelectorAll(".xoa_sp");
    xoa_sps.forEach(xoa_sp => {
        xoa_sp.addEventListener("click", () => {
            let masp = xoa_sp.getAttribute("masp");
            getCart(cart => {
                let danhSachSP = cart.danhSachSP;
                for (let i = 0; i < danhSachSP.length; i++) {
                    if (masp === danhSachSP[i].masp) {
                        danhSachSP.splice(i, 1);
                        addCartAPI(danhSachSP);
                    }
                }
            })
        })
    })
}, 500)




//----------------------- Đặt hàng --------------------------------
function xoacart() {
    getCurrentUser(user => {
        fetch(`${cartAPI}/${user.id}`, {
            method: 'PATCH',
            body: JSON.stringify(
                {
                    "danhSachSP": []
                }
            ),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        }).then(() => alert("Đặt hàng thành công"));
    })
}
// Thêm thuộc tính vào hóa đơn
function addHoadons(hoadon) {
    fetch(hoadonAPI, {
        method: 'POST',
        body: JSON.stringify(
            hoadon
        ),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
    })
}


const btn_dathang = $("#btn_dathang");
btn_dathang.addEventListener("click", (event) => {
    event.preventDefault();

    const mahoadon = nanoid(10);
    const diachi = $("#diachi").value;
    const sdt = $("#sdt").value;
    const PTthanhtoan = $("#PTthanhtoan").value;
    const timeSubmit = new Date(Date.now()).toLocaleString();
    getCart(cart => {
        getCurrentUser(user => {
            const hoadon = {
                id: mahoadon,
                userid: user.id,
                username: user.username,
                diachi: diachi,
                sdt: sdt,
                timeSubmit: timeSubmit,
                thanhTien: $("#thanhtien").innerText.slice(0, -1),
                PTthanhtoan: PTthanhtoan,
                cart: cart.danhSachSP,
                trangThai: "choduyet"
            }
            addHoadons(hoadon)
            xoacart()
        })
    })


})
//------------------ lich su don hang -----------------------
function getHoadon(callback) {
    fetch(hoadonAPI)
        .then(res => res.json())
        .then(callback)
}

const donhang_table = $("#donhang_table");
getCurrentUser(user => {
    getHoadon(danhsachHD => {
        danhsachHD.forEach(hoadon => {
            if (hoadon.userid === user.id) {
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
                donhang_table.appendChild(hoadonHTML);
            }
        })
    })
})

const modalhoadons = $("#modalhoadons");
getCurrentUser(user => {
    getHoadon(danhsachHD => {
        danhsachHD.forEach(hoadon => {
            if (user.id === hoadon.userid) {
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
                                                                class="badge bg-success font-size-12 ms-2">${hoadon.trangThai}</span></h4>
                                                        <div class="mb-4">
                                                            <h2 class="mb-1 text-muted">Đặc sản quê</h2>
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
                `;
                modalhoadons.appendChild(modalhoadon);
            }
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
                            if (user.id === hoadon.userid) {
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
                            }
                        })
                    })
                })
            }, 500)
        })

})

