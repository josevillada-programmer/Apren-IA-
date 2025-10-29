document.addEventListener("DOMContentLoaded", () => {
    const createNavbar = (basePath = '') => {
        const navbarHTML = `
            <header class="main-header">
                <img src="${basePath}upscalemedia-transformed.png" alt="Aprend//IA//" class="logo">
                <div class="header-right">
                    <nav class="main-nav">
                        <ul>
                            <li><a href="${basePath}index.html#matematicas">MATEMÁTICAS</a></li>
                            <li><a href="${basePath}index.html#lectura">LECTURA</a></li>
                            <li><a href="${basePath}index.html#ortografia">ORTOGRAFÍA</a></li>
                            <li><a href="${basePath}index.html#progreso">MI PROGRESO</a></li>
                        </ul>
                    </nav>
                    <form class="search-form">
                        <input type="search" placeholder="Buscar tema...">
                        <button type="submit">🔍</button>
                    </form>
                    <div id="user-session" class="user-menu" style="display: none;">
                        <div id="user-menu-trigger" class="user-menu-trigger">
                            <div class="avatar-container">
                                <img id="user-avatar" src="${basePath}img/12225881-removebg-preview.png" alt="Avatar" class="avatar">
                            </div>
                        </div>
                        <div id="user-menu-dropdown" class="dropdown-menu">
                            <div class="user-info">
                                <span id="dropdown-user-name"></span>
                                <div id="streak-container" style="display: none;">
                                    <i class="fas fa-book" style="font-size: 20px; margin-right: 5px;"></i>
                                    <span id="streak-days"></span>
                                </div>
                            </div>
                            <a href="${basePath}view/profile.html"><i class="fas fa-user"></i>Mi Perfil</a>
                            <a href="#settings"><i class="fas fa-cog"></i>Ajustes</a>
                            <a href="#theme"><i class="fas fa-palette"></i>Tema</a>
                            <div class="divider"></div>
                            <a href="#" id="logout-btn" class="logout-link"><i class="fas fa-sign-out-alt"></i>Cerrar Sesión</a>
                        </div>
                    </div>
                    <button id="login-btn" class="btn-login" onclick="window.location.href='${basePath}view/login.html'">Iniciar Sesión</button>
                    <button id="hamburger-btn" class="hamburger-menu">&#9776;</button>
                </div>
            </header>
        `;
        const navbarContainer = document.getElementById('navbar-container');
        if (navbarContainer) {
            navbarContainer.innerHTML = navbarHTML;
            const logoutBtn = document.getElementById('logout-btn');
            if (logoutBtn) {
                logoutBtn.addEventListener('click', (e) => {
                    e.preventDefault();
                    logout();
                });
            }
        }
    };

    const checkLoginStatus = async () => {
        const token = localStorage.getItem('token');
        if (!token) {
            return; // Not logged in
        }

        try {
            const response = await fetch('http://localhost:5000/api/profile', {
                headers: {
                    'x-auth-token': token
                }
            });

            if (response.ok) {
                const userData = await response.json();
                updateUIAfterLogin(userData);
            } else {
                logout(); // Token is invalid or expired
            }
        } catch (error) {
            console.error('Error checking login status:', error);
        }
    };

    const updateUIAfterLogin = (userData) => {
        const loginBtn = document.getElementById('login-btn');
        if(loginBtn) loginBtn.style.display = 'none';

        const userSession = document.getElementById('user-session');
        if(userSession) userSession.style.display = 'block';

        const dropdownUserName = document.getElementById('dropdown-user-name');
        if(dropdownUserName) dropdownUserName.textContent = userData.first_name;

        if (userData.streak > 0) {
            const streakContainer = document.getElementById('streak-container');
            if(streakContainer) {
                streakContainer.style.display = 'flex';
                const streakDays = document.getElementById('streak-days');
                if(streakDays) streakDays.textContent = `${userData.streak} días de racha`;
            }
        }
    };

    const logout = () => {
        localStorage.removeItem('token');
        location.reload();
    };

    const path = window.location.pathname;
    let basePath = '';
    if (path.includes('/view/')) {
        basePath = '../';
    }
    createNavbar(basePath);
    checkLoginStatus();
});
