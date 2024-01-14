$(document).ready(function() {
    let currentText = 1;
    const totalTexts = 6;
    const displayTime = 5000;

    function showNextText() {
        // Oculta o texto atual com transição
        $(`#text-${currentText}`).fadeOut('slow', function() {

            // Atualiza para o próximo texto
            currentText = currentText % totalTexts + 1;

            // Mostra o próximo texto com transição
            $(`#text-${currentText}`).fadeIn('slow');
        });
    }

    // Define um intervalo para alternar os textos
    setInterval(showNextText, displayTime);
})