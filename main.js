const textArray = ["Desain Rumah.", "Desain Perusahaan.", "Desain Decal.", "Desain Bangunan."];
const typingText = document.querySelector(".typing-text");
let textIndex = 0;
let charIndex = 0;

function type() {
    if (charIndex < textArray[textIndex].length) {
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
    font-weight: 700;
    margin-bottom: 10px;
    text-shadow: 0 0 10px rgba(255,255,255,0.7);
}

.typing-container {
    font-size: 1.5rem;
    font-weight: 300;
    margin-bottom: 40px;
    color: #aaaaaa;
}

.typing-text::after {
    content: '|';
    animation: blink 0.7s infinite;
    color: var(--neon-white);
}

@keyframes blink {
    0%, 100% { opacity: 1; }
    50% { opacity: 0; }
}

.neon-btn {
    display: inline-block;
    padding: 12px 35px;
    color: var(--bg-color);
    background-color: var(--neon-white);
    border: 2px solid var(--neon-white);
    border-radius: 30px;
    text-decoration: none;
    font-weight: 600;
    transition: all 0.3s ease;
    box-shadow: 0 0 10px rgba(255, 255, 255, 0.5), inset 0 0 10px rgba(255, 255, 255, 0.5);
}

.neon-btn:hover {
    background-color: transparent;
    color: var(--neon-white);
    box-shadow: 0 0 20px rgba(255, 255, 255, 0.8), inset 0 0 20px rgba(255, 255, 255, 0.8);
    transform: translateY(-3px);
}

.portfolio {
    padding: 100px 5%;
    text-align: center;
}

.section-title {
    font-size: 2.5rem;
    margin-bottom: 50px;
    text-shadow: 0 0 8px rgba(255,255,255,0.6);
}

.grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 30px;
}

.card {
    background: #111;
    padding: 40px 20px;
    border-radius: 15px;
    border: 1px solid #333;
    transition: all 0.4s ease;
    opacity: 0;
    transform: translateY(30px);
}

.card.show {
    opacity: 1;
    transform: translateY(0);
}

.card:hover {
    border-color: var(--neon-white);
    box-shadow: 0 0 15px rgba(255, 255, 255, 0.4);
    transform: translateY(-10px);
}

.card h3 {
    margin-bottom: 15px;
    font-size: 1.5rem;
}

.card p {
    color: #888;
}

.footer {
    padding: 60px 0;
    text-align: center;
    background: #0a0a0a;
    border-top: 1px solid #222;
}

.footer p {
    margin-bottom: 10px;
    color: #888;
}

@media (max-width: 768px) {
    body {
        flex-direction: column;
    }
    .sidebar {
        width: 100%;
        height: auto;
        position: relative;
        border-right: none;
        border-bottom: 1px solid #1a1a1a;
        padding: 20px;
    }
    .nav-links {
        flex-direction: row;
        justify-content: center;
        margin-top: 20px;
    }
    .content {
        margin-left: 0;
    }
}
