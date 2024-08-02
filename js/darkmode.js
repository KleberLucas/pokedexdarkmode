// select toggle button
let toggle = document.getElementById("mode");
let cards = document.getElementsByClassName("card");
let images = document.getElementsByClassName("card-image");

toggle.addEventListener('click', () => {
    document.body.classList.toggle('dark');
    // Converte HTMLCollection em um array e aplica o forEach
    Array.from(cards).forEach((card) => {
        card.classList.toggle('dark');
    });
    Array.from(images).forEach((img) => {
        img.classList.toggle('dark');
    });
})