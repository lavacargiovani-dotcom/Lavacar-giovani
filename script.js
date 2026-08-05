document.addEventListener('DOMContentLoaded', () => {
    const musica = document.getElementById('musica-fundo');
    const btnAudio = document.getElementById('btn-audio');
    const audioIcon = document.getElementById('audio-icon');

    // Define o volume bem baixo (0.15 equivale a 15% do volume maximo)
    musica.volume = 0.15;

    let tocando = false;

    // Funcao para alternar entre tocar e pausar
    function alternarAudio() {
        if (tocando) {
            musica.pause();
            audioIcon.textContent = '🔇';
            btnAudio.style.opacity = '0.6';
        } else {
            musica.play().then(() => {
                audioIcon.textContent = '🔊';
                btnAudio.style.opacity = '1';
            }).catch(error => {
                console.log("Aguardando interacao do usuario para reproduzir o audio.");
            });
        }
        tocando = !tocando;
    }

    // Botao de Mute/Unmute
    btnAudio.addEventListener('click', (e) => {
        e.stopPropagation();
        alternarAudio();
    });

    // Inicia a musica suavemente no primeiro clique do usuario na pagina
    function iniciarNoPrimeiroClique() {
        if (!tocando) {
            musica.play().then(() => {
                tocando = true;
                audioIcon.textContent = '🔊';
            }).catch(() => {});
        }
        document.removeEventListener('click', iniciarNoPrimeiroClique);
    }

    document.addEventListener('click', iniciarNoPrimeiroClique);
});
