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
            data: [10, 90],
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

const spchart = document.getElementById("bieudosp");

new Chart(spchart, {
    type: 'bar',
    data: {
        labels: [
            'Xoài cát',
            'Sầu riêng',
            'Bưởi năm roi'
        ],
        datasets: [{
            label: 'dvt',
            data: [10, 90, 30],
            backgroundColor: [
                'rgb(63, 247, 17)',
                'rgb(57, 76, 219)',
                'rgb(0, 30, 20)'
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


/* qlsp */
window.onbeforeunload = function() {
    return "Dude, are you sure you want to leave? Think of the kittens!";
}

var storageAPI = 'http://localhost:3000/storage'


function getStorage(callback) {
    fetch(storageAPI)
        .then(function (response) {
            return response.json();
        })
        .then(callback);
}

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
        let xuatxu = document.querySelector(".modalsp #xuatxu").value;
        let soluong = document.querySelector(".modalsp #soluong").value;
        let giagoc = document.querySelector(".modalsp #giaban").value;
        let dvt = document.querySelector(".modalsp #donvitinh").value;
        let ngaynhap = document.querySelector(".modalsp #ngaynhap").value;
        let ngayhethan = document.querySelector(".modalsp #ngayhethan").value;
        let hinhanh = document.querySelector(".modalsp #hinhanh").value;



        if (!arrayMasp.includes(masp)) {
            var sp = {
                id : masp,
                masp: masp,
                name: name,
                xuatxu: xuatxu,
                soluong: soluong,
                price: giagoc,
                dvt: dvt,
                ngaynhap: ngaynhap,
                ngayhethan: ngayhethan,
                giagoc: giagoc,
                photo1: hinhanh,
                tilegiam: "",
                ngaybatdau: "",
                ngayketthuc: "",
                ghichu: "",
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

function updateProduct(id) {
    
    var updatebtn = document.querySelector(".modalsuasp #btn-update");
    
    let name = document.querySelector(".modalsuasp #tensp").value;
    let xuatxu = document.querySelector(".modalsuasp #xuatxu").value;
    let soluong = document.querySelector(".modalsuasp #soluong").value;
    let giagoc = document.querySelector(".modalsuasp #giaban").value;
    let dvt = document.querySelector(".modalsuasp #donvitinh").value;
    let ngaynhap = document.querySelector(".modalsuasp #ngaynhap").value;
    let ngayhethan = document.querySelector(".modalsuasp #ngayhethan").value;
    let hinhanh = document.querySelector(".modalsuasp #hinhanh").value;

    document.querySelector(".modalsuasp #masp").placeholder = id;

    var updatesp = {
        id : id,
        masp: id,
        name: name,
        xuatxu: xuatxu,
        soluong: soluong,
        price: giagoc,
        dvt: dvt,
        ngaynhap: ngaynhap,
        ngayhethan: ngayhethan,
        giagoc: giagoc,
        photo1: hinhanh
    }

    updatebtn.onclick = function(){
         updateAPI(updatesp,id, function(){
            getStorage(renderStorage);
         });
        
    }

    

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
