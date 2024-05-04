var storageAPI = 'http://localhost:3000/storage'


// Biểu đồ

function taoBieuDoKho(dungtichkho) {
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
// Giả sử dung tích kho là 1000
taoBieuDoKho(1000);




var barColors = ["red", "green","blue","orange","brown","red", "green","blue","orange","brown","red", "green","blue","orange","brown","red", "green","blue","orange","brown","red", "green","blue","orange","brown","red", "green"];



function taoBieuDoSP() {
    fetch(storageAPI)
        .then(function (response) {
            return response.json();
        })
        .then(function (storage) {
            var xValues = [];
            var yValues = [];
            storage.forEach(e => {
                xValues.push(e.name);
                yValues.push(e.soluong);
            });

            const spchart = document.getElementById('bieudosp');
            
            new Chart(spchart, {
                type: "bar",
                data: {
                  labels: xValues,
                  datasets: [{
                    backgroundColor: barColors,
                    data: yValues
                  }]
                },
                options: {
                  legend: {display: false},
                  title: {
                    display: true,
                    text: "World Wine Production 2018"
                  }
                }
              });


        })
}

taoBieuDoSP();