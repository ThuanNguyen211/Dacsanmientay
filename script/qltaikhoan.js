var accountAPI = 'http://localhost:3000/user'


function getAccount(callback) {
    fetch(accountAPI)
        .then(function (response) {
            return response.json();
        })
        .then(callback);
}


function renderAccount(user) {
    var list = document.querySelector('.account-list');
    let index = 0;

    var html = user.map(function (user) {
        index++;
        return `
                        <tr>
                            <th scope="row"><span>${index}</span></th>
                            <td><span>${user.username}</span></td>
                            <td><span>${user.email}</span></td>
                            <td><span>${user.role}</span></td>
                        </tr>
        `;
    })

    list.innerHTML = html.join('');

}

getAccount(renderAccount);