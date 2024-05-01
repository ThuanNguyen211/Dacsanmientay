/* qlsp */
var storageAPI = 'http://localhost:3000/storage'


function getStorage(callback){
    fetch(storageAPI)
        .then(function(response){
            return response.json();
        })
        .then(callback);
}

function renderStorage(storage){
    var blocktest = document.querySelector('.test');

    var html = storage.map(function(storage){
        return `
        <tr>
                            <th scope="row"><span>${storage.masp}</span></th>
                            <td><span>${storage.name}</span></td>
                            <td><span>${storage.xuatxu}</span></td>
                            <td><span>${storage.price}</span></td>
                            <td><span>${storage.soluong}</span></td>
                            <td><span>${storage.dvt}</span></td>
                            <td><span>${storage.lohang}</span></td>
                            <td><span>${storage.ngaynhap}</span></td>
                            <td><span>${storage.ngayhethan}</span></td>
                            <td>
                                <div class="btn-group" role="group" aria-label="Basic mixed styles example">
                                    <button type="button" class="btn btn-warning" id="suasp-btn" data-bs-toggle="modal"
                                        data-bs-target="#suasp">Sửa</button>
                                    <button type="button" class="btn btn-danger">Xóa</button>
                                </div>
                            </td>
                        </tr>
        `;
    })

    blocktest.innerHTML = html.join('');
}

getStorage(renderStorage);