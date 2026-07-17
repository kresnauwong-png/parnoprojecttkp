(() => {
    // -------------------------------------------------------------
    // LOGIKA KONTROL INTERAKSI TOMBOL SHADER
    // -------------------------------------------------------------
    const uniforms = window.customShaderUniforms;
    const btnGlow = document.getElementById('btn-glow');
    const btnSilver = document.getElementById('btn-silver');
    const btnDim = document.getElementById('btn-dim');

    if (uniforms && btnGlow && btnSilver && btnDim) {
        btnGlow.addEventListener('click', () => {
            uniforms.brightGlow.value = !uniforms.brightGlow.value;
            btnGlow.classList.toggle('active', uniforms.brightGlow.value);
            if(uniforms.brightGlow.value) {
                uniforms.silverMode.value = false;
                btnSilver.classList.remove('active');
            }
        });

        btnSilver.addEventListener('click', () => {
            uniforms.silverMode.value = !uniforms.silverMode.value;
            btnSilver.classList.toggle('active', uniforms.silverMode.value);
            if(uniforms.silverMode.value) {
                uniforms.brightGlow.value = false;
                btnGlow.classList.remove('active');
            }
        });

        btnDim.addEventListener('click', () => {
            uniforms.disableCenterDimming.value = !uniforms.disableCenterDimming.value;
            btnDim.classList.toggle('active', uniforms.disableCenterDimming.value);
        });
    }

    // -------------------------------------------------------------
    // ANIMASI KETIK OTOMATIS (TYPING EFFECT)
    // -------------------------------------------------------------
    const textArray = ["Spesialis Desain Rumah.", "Desain Perusahaan.", "Desain Bangunan.", "Kustom Desain Decal."];
    const typingText = document.querySelector(".typing-text");
    let textIndex = 0;
    let charIndex = 0;

    function type() {
        if (!typingText) return;
        if (charIndex < textArray[textIndex].length) {
            typingText.textContent += textArray[textIndex].charAt(charIndex);
            charIndex++;
            setTimeout(type, 90);
        } else {
            setTimeout(erase, 2200);
        }
    }

    function erase() {
        if (charIndex > 0) {
            typingText.textContent = textArray[textIndex].substring(0, charIndex - 1);
            charIndex--;
            setTimeout(erase, 40);
        } else {
            textIndex = (textIndex + 1) % textArray.length;
            setTimeout(type, 400);
        }
    }
    
    if (typingText) setTimeout(type, 1000);

    // -------------------------------------------------------------
    // ANIMASI KARTU LAYANAN SAAT SCROLL (SCROLL REVEAL)
    // -------------------------------------------------------------
    const cards = document.querySelectorAll('.card');
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if(entry.isIntersecting) {
                entry.target.classList.add('show');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15 });

    cards.forEach(card => observer.observe(card));
})();
