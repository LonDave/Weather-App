const menuButton = document.querySelector('.menu');
const navLinks = document.querySelector('.nav-links');

// Menù burger
menuButton.addEventListener('click', () =>{
    navLinks.classList.toggle('open');
});
