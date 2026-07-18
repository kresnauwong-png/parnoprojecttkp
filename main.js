const textArray = ["Desain Rumah.", "Desain Perusahaan.", "Desain Decal.", "Desain Bangunan."];
const typingText = document.querySelector(".typing-text");
let textIndex = 0;
let charIndex = 0;

function type() {
    if (typingText && charIndex < textArray[textIndex].length) {
        typingText.textContent += textArray[textIndex].charAt(charIndex);
        charIndex++;
        setTimeout(type, 100);
    } else {
        setTimeout(erase, 2000);
    }
}

function erase() {
    if (charIndex > 0) {
        typingText.textContent = textArray[textIndex].substring(0, charIndex - 1);
        charIndex--;
        setTimeout(erase, 50);
    } else {
        textIndex++;
        if (textIndex >= textArray.length) textIndex = 0;
        setTimeout(type, 500);
    }
}

document.addEventListener("DOMContentLoaded", () => {
    setTimeout(type, 1000);
});

const cards = document.querySelectorAll('.card');
const observerOptions = {
    threshold: 0.2
};

const observer = new IntersectionObserver(function(entries, observer) {
    entries.forEach(entry => {
        if(entry.isIntersecting) {
            entry.target.classList.add('show');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

cards.forEach(card => {
    observer.observe(card);
});
