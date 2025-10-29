// Simullaciones de datos(Porfa cambien conforme a loq eu vallan a hacer si necesitas algo mas me avisan)
    const lectura = Math.floor(Math.random() * 101);  // 0 a 100
    const mate = Math.floor(Math.random() * 101);

    const nombre = localStorage.getItem("nombre") || "Estudiante";
    const edad = localStorage.getItem("edad") || "?";
    const grado = localStorage.getItem("grado") || "?";
    const grupo = localStorage.getItem("grupo") || "?";
    const escuela = localStorage.getItem("escuela") || "?";

    document.getElementById("datos").innerHTML = `
      👤 <b>${nombre}</b> <br>
      🎓 ${grado} ${grupo} | 🏫 ${escuela} <br>
      🎂 Edad: ${edad} años
    `;

    function asignarNivel(puntaje) {
      if (puntaje >= 80) return { nivel: "Avanzado 🚀", color: "var(--good)" };
      if (puntaje >= 50) return { nivel: "Intermedio ⚡", color: "var(--medium)" };
      return { nivel: "Básico 🧩", color: "var(--bad)" };
    }

    const lecturaNivel = asignarNivel(lectura);
    const mateNivel = asignarNivel(mate);

    document.getElementById("lecturaBarra").style.width = lectura + "%";
    document.getElementById("lecturaBarra").style.backgroundColor = lecturaNivel.color;
    document.getElementById("lecturaNivel").textContent = `${lecturaNivel.nivel} (${lectura}%)`;

    document.getElementById("mateBarra").style.width = mate + "%";
    document.getElementById("mateBarra").style.backgroundColor = mateNivel.color;
    document.getElementById("mateNivel").textContent = `${mateNivel.nivel} (${mate}%)`;

    function volver() {
      window.location.href = "test_inicio.html";
    }
    function IniciarAventura() {
      window.location.href = "lecciones.html";
    }