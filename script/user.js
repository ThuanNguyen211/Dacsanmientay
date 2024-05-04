const $ = document.querySelector.bind(document);

const currentUserAPI = "http://localhost:3000/currentUser";
const cartAPI = "http://localhost:3000/carts";
const storageAPI = "http://localhost:3000/storage";
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

//---------------------- Hien Gio hang -----------------------
let cartDiv = $("#cart");

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
    .then (user => user.id)

currentUserID.then(userid => {
    function getCart(callback) {
        fetch(`${cartAPI}/${userid}`)
            .then(res => res.json())
            .then(callback)
    }

    getCart(cart => {
        danhSachSP = cart.danhSachSP;
        //console.log(storage)
        let total = 0;
        danhSachSP.forEach(item => {
            let sanPham = document.createElement("div");
            let masp = item.masp;
            let soluong = item.soluong;
            let tensp, imgURL, price;
            // for (let i = 0; i < storage.length; i++) {
            //     if (storage[i])
            // }
            storage.forEach(sp => {
                if (sp.masp === masp) {
                    tensp = sp.name;
                    imgURL = sp.photo1;
                    price = sp.price;
                }
            })
            total += price*soluong;
            sanPham.className = "container_fluid sp_container"
            sanPham.innerHTML = 
                `
                    
                        <div class="spImg_container"><img src="${imgURL}"></div>
                        <div class="spInfo_container">
                            <p class="lead">${tensp}</p>
                        </div>
                        <div class="input_group">
                            <button type="button" class="decrementSoluongBtn">
                            -
                            </button>
                            <input type="number" min=1 value="${soluong}" class="soluong_input" masp="${masp}">
                            <button type="button" class="incrementSoluongBtn">
                            +
                            </button>
                        </div>
                        <div>
                        <p class="price">${price*soluong}<sup>đ</sup></p>
                        </div>
                        <div>
                            <a class="btn xoa_sp" masp="${masp}">
                                <i class="bi bi-trash3"></i>
                            </a>
                        </div>
                    
                `
            cartDiv.appendChild(sanPham);
        })
        const total_container = $("#total_container");
        total_container.innerHTML = 
            `
                <p class="fs-3">Tổng thanh toán: <span class="price">${total}<sup>đ</sup></span></p>
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




