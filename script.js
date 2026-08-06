document.addEventListener('DOMContentLoaded', () => {
    const musica = document.getElementById('musica-fundo');
    const btnAudio = document.getElementById('btn-audio');
    const audioIcon = document.getElementById('audio-icon');

    // Volume bem baixo pra dar aquele clima sem incomodar (12%)
    musica.volume = 0.12;
    let tocando = false;

    // Controle do Audio
    function alternarAudio() {
        if (tocando) {
            musica.pause();
            audioIcon.textContent = '🔇';
            btnAudio.style.opacity = '0.6';
        } else {
            musica.play().then(() => {
                audioIcon.textContent = '🔊';
                btnAudio.style.opacity = '1';
            }).catch(error => console.log("Aguardando interacao."));
        }
        tocando = !tocando;
    }

    btnAudio.addEventListener('click', (e) => {
        e.stopPropagation();
        alternarAudio();
    });

    // Inicia audio suave no primeiro toque/clique na tela
    function iniciarPrimeiroToque() {
        if (!tocando) {
            musica.play().then(() => {
                tocando = true;
                audioIcon.textContent = '🔊';
            }).catch(() => {});
        }
        document.removeEventListener('click', iniciarPrimeiroToque);
    }
    document.addEventListener('click', iniciarPrimeiroToque);

    // Animacao de Scroll (Reveal)
    const reveals = document.querySelectorAll('.reveal');

    function animarScroll() {
        const windowHeight = window.innerHeight;
        reveals.forEach(el => {
            const elementTop = el.getBoundingClientRect().top;
            const elementVisible = 100;

            if (elementTop < windowHeight - elementVisible) {
                el.classList.add('active');
            }
        });
    }

    window.addEventListener('scroll', animarScroll);
    animarScroll(); // Executa uma vez no carregamento
});
