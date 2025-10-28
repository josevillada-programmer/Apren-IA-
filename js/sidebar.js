window.addEventListener('DOMContentLoaded', () => {
    const hamburgerBtn = document.getElementById('hamburger-btn');
    const sidebar = document.getElementById('mobile-sidebar');
    const closeSidebarBtn = document.querySelector('.sidebar .close-btn');

    if(hamburgerBtn) {
        hamburgerBtn.addEventListener('click', () => {
            sidebar.style.width = '250px';
        });
    }

    if(closeSidebarBtn) {
        closeSidebarBtn.addEventListener('click', () => {
            sidebar.style.width = '0';
        });
    }
});