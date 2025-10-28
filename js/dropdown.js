function parseJwt(token) {
    try {
        return JSON.parse(atob(token.split('.')[1]));
    } catch (e) {
        return null;
    }
}

window.addEventListener('DOMContentLoaded', () => {
    const token = localStorage.getItem('token');
    const loginBtn = document.getElementById('login-btn');
    const userSession = document.getElementById('user-session');
    const streakContainer = document.getElementById('streak-container');
    const streakDays = document.getElementById('streak-days');

    if (token) {
        const decodedToken = parseJwt(token);
        if (decodedToken && decodedToken.user) {
            // Hide login button
            loginBtn.style.display = 'none';

            // Show user session info
            document.getElementById('dropdown-user-name').textContent = `Hola, ${decodedToken.user.first_name}`;
            userSession.style.display = 'flex';

            // Show streak info
            if (decodedToken.user.streak) {
                streakContainer.style.display = 'flex';
                streakDays.textContent = decodedToken.user.streak;
            }

            // Add logout functionality
            document.getElementById('logout-btn').addEventListener('click', () => {
                localStorage.removeItem('token');
                window.location.reload();
            });

            // Toggle dropdown menu
            const userMenuTrigger = document.getElementById('user-menu-trigger');
            const userMenuDropdown = document.getElementById('user-menu-dropdown');
            userMenuTrigger.addEventListener('click', () => {
                userMenuDropdown.style.display = userMenuDropdown.style.display === 'block' ? 'none' : 'block';
            });

            // Close dropdown if clicking outside
            window.addEventListener('click', (event) => {
                if (!userMenuTrigger.contains(event.target) && !userMenuDropdown.contains(event.target)) {
                    userMenuDropdown.style.display = 'none';
                }
            });

            // Theme switcher
            const themeBtn = document.querySelector('a[href="#theme"]');
            themeBtn.addEventListener('click', (e) => {
                e.preventDefault();
                document.body.classList.toggle('dark-theme');
                // Save theme preference
                if (document.body.classList.contains('dark-theme')) {
                    localStorage.setItem('theme', 'dark');
                } else {
                    localStorage.setItem('theme', 'light');
                }
            });

            // Apply saved theme on load
            if (localStorage.getItem('theme') === 'dark') {
                document.body.classList.add('dark-theme');
            }
        } else {
            // Invalid token, ensure public view
            loginBtn.style.display = 'block';
            userSession.style.display = 'none';
        }
    } else {
        // No token, ensure public view
        loginBtn.style.display = 'block';
        userSession.style.display = 'none';
    }
});