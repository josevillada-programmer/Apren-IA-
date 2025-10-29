async function login() {
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  if (!email || !password) {
    alert("Por favor, completa todos los campos 😵");
    return;
  }

  try {
    const response = await fetch('http://localhost:5000/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password })
    });

    const data = await response.json();

    if (response.ok) {
      window.location.href = `verificacion.html?token=${data.token}`;
    } else {
      alert(data.msg || 'Error al iniciar sesión');
    }
  } catch (error) {
    alert('Error de conexión con el servidor');
  }
}

function socialLogin(provider) {
  alert("Iniciando sesión con " + provider + " 😎");
  window.location.href = "verificacion.html";
}