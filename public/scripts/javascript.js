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