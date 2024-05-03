


/* qlsp */

var storageAPI = 'http://localhost:3000/storage'


function getStorage(callback) {
    fetch(storageAPI)
        .then(function (response) {
            return response.json();
        })
        .then(callback);
}
// Mảng chứa mã sản phẩm đã có
var arrayMasp = [];

function renderStorage(storage) {
    var list = document.querySelector('.list');

    var html = storage.map(function (storage) {
        if (!arrayMasp.includes(storage.masp)) {
            arrayMasp.push(storage.masp);
        }
        return `
        <tr>
                            <th scope="row"><span>${storage.masp}</span></th>
                            <td><span>${storage.name}</span></td>
                            <td><span>${storage.type}</span></td>
                            <td><span>${storage.xuatxu}</span></td>
                            <td><span>${storage.soluong}</span></td>
                            <td><span>${storage.price}</span></td>
                            <td><span>${storage.dvt}</span></td>
                            <td><span>${storage.ngaynhap}</span></td>
                            <td><span>${storage.ngayhethan}</span></td>
                            <td>
                                <div class="btn-group" role="group" aria-label="Basic mixed styles example">
                                    <button type="button" class="btn btn-warning" id="suasp-btn" data-bs-toggle="modal"
                                        data-bs-target="#suasp" onclick="updateProduct('${storage.id}')">Sửa</button>
                                    <button type="button" class="btn btn-danger" onclick="deleteProduct('${storage.id}', getStorage(renderStorage))" id="xoasp-btn" >Xóa</button>
                                </div>
                            </td>
                        </tr>
        `;
    })

    list.innerHTML = html.join('');
}

getStorage(renderStorage);



/*them sp */

function createProduct(data, callback) {

    var options = {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
            // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: JSON.stringify(data)
    }
    fetch(storageAPI, options)
        .then(function (response) {
            response.json;
        })
        .then(callback)
}



function addProduct() {
    var addbtn = document.querySelector(".modalsp #btn-add");


    addbtn.onclick = function () {

        let masp = document.querySelector(".modalsp #masp").value;
        let name = document.querySelector(".modalsp #tensp").value;
        let type = document.querySelector(".modalsp #type").value;
        let xuatxu = document.querySelector(".modalsp #xuatxu").value;
        let soluong = document.querySelector(".modalsp #soluong").value;
        let giagoc = document.querySelector(".modalsp #giaban").value;
        let dvt = document.querySelector(".modalsp #donvitinh").value;
        let ngaynhap = document.querySelector(".modalsp #ngaynhap").value;
        let ngayhethan = document.querySelector(".modalsp #ngayhethan").value;
        let hinhanh1 = document.querySelector(".modalsp #hinhanh1").value;
        let hinhanh2 = document.querySelector(".modalsp #hinhanh2").value;



        if (!arrayMasp.includes(masp)) {
            var sp = {
                id: masp,
                masp: masp,
                name: name,
                type: type,
                xuatxu: xuatxu,
                soluong: soluong,
                price: giagoc,
                dvt: dvt,
                ngaynhap: ngaynhap,
                ngayhethan: ngayhethan,
                giagoc: giagoc,
                photo1: hinhanh1,
                photo2: hinhanh2
            }
            createProduct(sp)
        } else {
            alert("Sản phẩm đã có trong kho, vui lòng sửa sản phẩm!");
        }

    }
}

addProduct()


/* Sua san pham*/

function updateAPI(data, id, callback) {
    var options = {
        method: 'PATCH',
        headers: {
            "Content-Type": "application/json",
            // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: JSON.stringify(data)
    }
    fetch(storageAPI + '/' + id, options)
        .then(function (response) {
            response.json;
        })
        .then(callback)
}

// Hàm sửa sản phẩm
function updateProduct(id) {

    var updatebtn = document.querySelector(".modalsuasp #btn-update");

    document.querySelector(".modalsuasp #masp").placeholder = id;

    updatebtn.onclick = function () {
        UpdateProduct(id);
    }

}




function UpdateProduct(id) {
    fetch(storageAPI)
        .then(function (response) {
            return response.json();
        })
        .then(function (storage) {
            // Tìm lại thuộc tính cũ
            storage.forEach(e => {
                if (e.id == id) {
                    // Lấy thuộc tính mới
                    let name = document.querySelector(".modalsuasp #tensp").value;
                    let xuatxu = document.querySelector(".modalsuasp #xuatxu").value;
                    let soluong = document.querySelector(".modalsuasp #soluong").value;
                    let giagoc = document.querySelector(".modalsuasp #giaban").value;
                    let dvt = document.querySelector(".modalsuasp #donvitinh").value;
                    let ngaynhap = document.querySelector(".modalsuasp #ngaynhap").value;
                    let ngayhethan = document.querySelector(".modalsuasp #ngayhethan").value;
                    let hinhanh = document.querySelector(".modalsuasp #hinhanh").value;
                    // Ban đầu gán thuộc tính mới bằng thuộc tính cũ
                    var updatesp = {
                        id: e.id,
                        masp: e.id,
                        name: e.name,
                        xuatxu: e.xuatxu,
                        soluong: e.soluong,
                        price: e.giagoc,
                        dvt: e.dvt,
                        ngaynhap: e.ngaynhap,
                        ngayhethan: e.ngayhethan,
                        giagoc: e.giagoc,
                        photo1: e.hinhanh
                    }
                    //Kiem tra null va trung thuoc tính cũ
                    if (updatesp.name != name && name.length > 0) {
                        updatesp.name = name;
                    }
                    if (updatesp.xuatxu != xuatxu && xuatxu.length > 0) {
                        updatesp.xuatxu = xuatxu;
                    }
                    if (updatesp.soluong != soluong && soluong != 0) {
                        updatesp.soluong = soluong;
                    }
                    if (updatesp.price != giagoc && giagoc != 0) {
                        updatesp.price = giagoc;
                    }
                    if (updatesp.dvt != dvt && dvt.length > 0) {
                        updatesp.dvt = dvt;
                    }
                    if (updatesp.photo1 != hinhanh && hinhanh.length > 0) {
                        updatesp.photo1 = hinhanh;
                    }
                    if (updatesp.ngaynhap != ngaynhap && ngaynhap.length > 0) {
                        updatesp.ngaynhap = ngaynhap;
                    }
                    if (updatesp.ngayhethan != ngayhethan && ngayhethan.length > 0) {
                        updatesp.ngayhethan = ngayhethan;
                    }

                    updateAPI(updatesp, id, function () {
                        getStorage(renderStorage);
                    });
                }
            });
        })
}









/*Xoa sp*/

function deleteProduct(masp, callback) {
    var options = {
        method: 'DELETE',
        headers: {
            "Content-Type": "application/json",
            // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: JSON.stringify(masp)
    }
    fetch(storageAPI + '/' + masp, options)
        .then(function (response) {
            response.json;
        })
        .then(callback)
}


// Biểu đồ

function taoBieuDo(dungtichkho) {
    fetch(storageAPI)
        .then(function (response) {
            return response.json();
        })
        .then(function (storage) {
            // Tính tổng
            var tong = 0;
            storage.forEach(e => {
                tong = tong + parseInt(e.soluong);
            });

            let trong = dungtichkho - tong;

            var html = `
            <h2 id="kho">Kho: </h2>
            <table class="table table-striped table-bordered">
                <tr>
                    <th scope="row"><span>Dung tích</span></th>
                    <td>${dungtichkho}</td>
                </tr>
                <tr>
                    <th scope="row"><span>Sử dụng</span></th>
                    <td>${tong}</td>
                </tr>
                <tr>
                    <th scope="row"><span>Trống</span></th>
                    <td>${trong}</td>
                </tr>
            </table>
            `;

            document.querySelector(".danhthu .chitiet").innerHTML = html;


            const khochart = document.getElementById('bieudokho');

            new Chart(khochart, {
                type: 'doughnut',
                data: {
                    labels: [
                        'Đã dùng',
                        'Trống',
                    ],
                    datasets: [{
                        label: '%',
                        data: [tong, dungtichkho - tong],
                        backgroundColor: [
                            'rgb(63, 247, 17)',
                            'rgb(57, 76, 219)'
                        ],
                        hoverOffset: 4
                    }]
                },
                options: {
                    scales: {
                        y: {
                            beginAtZero: true
                        }
                    }
                }
            });


        })
}

taoBieuDo(1000);


function filter() {
    fetch(storageAPI)
        .then(function (response) {
            return response.json();
        })
        .then(function (storage) {
            let type = document.querySelector(".filter select").value;

            var list = document.querySelector('.list');

            var html = storage.map(function (storage) {
                if (storage.type == type) {
                    return `
                        <tr>
                            <th scope="row"><span>${storage.masp}</span></th>
                            <td><span>${storage.name}</span></td>
                            <td><span>${storage.type}</span></td>
                            <td><span>${storage.xuatxu}</span></td>
                            <td><span>${storage.soluong}</span></td>
                            <td><span>${storage.price}</span></td>
                            <td><span>${storage.dvt}</span></td>
                            <td><span>${storage.ngaynhap}</span></td>
                            <td><span>${storage.ngayhethan}</span></td>
                            <td>
                                <div class="btn-group" role="group" aria-label="Basic mixed styles example">
                                    <button type="button" class="btn btn-warning" id="suasp-btn" data-bs-toggle="modal"
                                        data-bs-target="#suasp" onclick="updateProduct('${storage.id}')">Sửa</button>
                                    <button type="button" class="btn btn-danger" onclick="deleteProduct('${storage.id}', getStorage(renderStorage))" id="xoasp-btn" >Xóa</button>
                                </div>
                            </td>
                        </tr>
                        `;
                }
            })

            list.innerHTML = html.join('');
        });
}

