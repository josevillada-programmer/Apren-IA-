let codigoGenerado = '';

window.onload = function() {
    generarYMostrarCodigo();
};

function generarYMostrarCodigo() {
    codigoGenerado = Math.floor(100000 + Math.random() * 900000).toString();
    
    document.getElementById('codigo-mostrado').textContent = codigoGenerado;
    
    console.log("Código de verificación (visible para bots): " + codigoGenerado);
}

function verificarCodigo() {
    const codigoIngresado = document.getElementById('codigo').value;

    if (codigoIngresado === codigoGenerado) {
        document.getElementById('mensaje').textContent = "¡Código verificado correctamente! Redirigiendo...";
        document.getElementById('mensaje').style.color = 'green';

        const urlParams = new URLSearchParams(window.location.search);
        const token = urlParams.get('token');

        if (token) {
            localStorage.setItem('token', token);
            setTimeout(() => {
                window.location.href = '../index.html';
            }, 1500);
        } else {
            document.getElementById('mensaje').textContent = "Error: No se encontró la sesión. Por favor, inicia sesión de nuevo.";
            document.getElementById('mensaje').style.color = 'red';
        }

    } else {
        document.getElementById('mensaje').textContent = "Código incorrecto, intenta de nuevo.";
        document.getElementById('mensaje').style.color = 'red';
        generarYMostrarCodigo();
        document.getElementById('codigo').value = '';
    }
}