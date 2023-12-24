$(document).ready(function() {
    let currentText = 1;
    const totalTexts = 6;
    const displayTime = 5000;

    function showNextText() {
        // Oculta o texto atual
        document.getElementById(`text-${currentText}`).style.display = 'none';

        // Atualiza para o próximo texto
        currentText = currentText % totalTexts + 1;

        // Mostra o próximo texto
        document.getElementById(`text-${currentText}`).style.display = 'block';
    }

    // Define um intervalo para alternar os textos
    setInterval(showNextText, displayTime);
})