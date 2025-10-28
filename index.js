const loginBtn = document.getElementById('login-btn');
const modalOverlay = document.getElementById('modal-overlay');
const closeBtn = document.querySelector('.close-btn');

loginBtn.addEventListener('click', () => {
    modalOverlay.classList.add('show');
});

closeBtn.addEventListener('click', () => {
    modalOverlay.classList.remove('show');
});

modalOverlay.addEventListener('click', (event) => {
    if (event.target === modalOverlay) {
        modalOverlay.classList.remove('show');
    }
});
