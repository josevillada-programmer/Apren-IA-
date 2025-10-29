document.addEventListener('DOMContentLoaded', () => {

    const botonJugar = document.querySelector('.btn-buscar');
    
    const selectGrado = document.querySelector('select[name="grado"]');
    const selectMateria = document.querySelector('select[name="materia"]');
    const selectActividad = document.querySelector('select[name="actividad"]');
    
    const mensajeError = document.getElementById('mensaje-error'); 

    botonJugar.addEventListener('click', () => {
        
        const grado = selectGrado.value;
        const materia = selectMateria.value;
        const actividad = selectActividad.value;

        if (grado === "" || materia === "" || actividad === "") {
            
            if (mensajeError) {
                mensajeError.textContent = "Por favor, elige grado, materia y tipo de actividad.";
            } else {
                alert("Por favor, elige grado, materia y tipo de actividad.");
            }
            return; 
        }

        const urlDestino = `view/test_inicio.html?grado=${grado}&materia=${materia}&actividad=${actividad}`;

        window.location.href = urlDestino;
    });
});