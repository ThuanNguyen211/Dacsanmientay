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





