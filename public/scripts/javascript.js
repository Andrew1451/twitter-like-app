//hamburger button
const hamburger  = document.getElementById('hamburger');

hamburger.onclick = () => {
    document.querySelectorAll('.navigation').forEach(element => {
        element.classList.toggle('open');
    });
}

//search filter
const filter = () => {
    const usernames = document.querySelectorAll('.usernames'),
        input = document.getElementById('search-filter'),
        value = input.value.toUpperCase();
    usernames.forEach(names => {
        let name = names.textContent || names.innerText;
        if (name.toUpperCase().indexOf(value) > -1) {
            names.style.display = '';
        } else {
            names.style.display = 'none';
        }
    });

}

//ajax request for add friend
const addUser = (username) => {
    const followUser = (username) => {
            const h4 = document.getElementById(username);
            h4.insertAdjacentHTML('beforebegin', '<p class="added">Added!</p>');
            h4.style.display = 'none';
        }
    const ajax = new XMLHttpRequest();
    ajax.open('post', '/add-friend');
    ajax.onloadend = followUser(username);
    ajax.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    ajax.send('addfriend=' + encodeURIComponent(username));
}