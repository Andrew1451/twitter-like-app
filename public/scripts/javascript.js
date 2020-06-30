const hamburger  = document.getElementById('hamburger');

hamburger.onclick = () => {
    document.querySelectorAll('.navigation').forEach(element => {
        element.classList.toggle('open');
    });
}