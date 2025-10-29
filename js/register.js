function showToast(message) {
  const toast = document.getElementById('snackbar');
  toast.textContent = message;
  toast.className = "toast show";
  setTimeout(function(){ toast.className = toast.className.replace("show", ""); }, 3000);
}

async function registrar() {
  const first_name = document.getElementById('first_name').value;
  const last_name = document.getElementById('last_name').value;
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  const confirmPassword = document.getElementById('confirm').value;

  if (!first_name || !last_name || !email || !password || !confirmPassword) {
    showToast('Por favor completa todos los campos');
    return;
  }

  if (password !== confirmPassword) {
    showToast('Las contraseñas no coinciden');
    return;
  }

  try {
    const response = await fetch('http://localhost:5000/api/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ first_name, last_name, email, password })
    });

    const data = await response.json();

    if (response.ok) {
      showToast('¡Registro exitoso!');
      setTimeout(() => {
        window.location.href = "../index.html";
      }, 2000);
    } else {
      showToast(data.msg || 'Error en el registro');
    }
  } catch (error) {
    showToast('Error de conexión con el servidor');
  }
}

function socialLogin(provider) {
  alert("Registrándote con " + provider + " 🤪");
  // window.location.href = "verificacion.html"; // This will be removed or updated later
}