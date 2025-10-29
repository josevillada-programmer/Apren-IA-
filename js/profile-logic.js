window.addEventListener('DOMContentLoaded', () => {
    const token = localStorage.getItem('token');

    if (!token) {
        window.location.href = 'login.html'; // Redirect to login if not authenticated
        return;
    }

    fetch('http://localhost:5000/api/profile', {
        headers: {
            'x-auth-token': token
        }
    })
    .then(res => res.json())
    .then(data => {
        if (data.msg) {
            // Handle errors, e.g., token expired
            console.error(data.msg);
            localStorage.removeItem('token');
            window.location.href = 'login.html';
        } else {
            // Populate profile data
            document.getElementById('profile-name').textContent = `${data.first_name} ${data.last_name}`;
            document.getElementById('profile-email').textContent = data.email;
            document.getElementById('profile-age').textContent = `Edad: ${data.age || 'N/A'}`;
            document.getElementById('profile-grade').textContent = `Grado: ${data.grade || 'N/A'}`;
            document.getElementById('profile-role').textContent = `Rol: ${data.role || 'N/A'}`;

            // Populate stats
            document.querySelector('.stat-card.points h2').textContent = data.completed_lessons * 10 || 0; // Example points calculation
            document.querySelector('.stat-card.accuracy h2').textContent = `${data.accuracy || 0}%`;
            document.querySelector('.stat-card.lessons h2').textContent = data.completed_lessons || 0;

            // Populate recent activity
            const recentActivityList = document.querySelector('.profile-recent-activity');
            recentActivityList.innerHTML = ''; // Clear existing items
            if (data.evaluations && data.evaluations.length > 0) {
                data.evaluations.forEach(item => {
                    const li = document.createElement('li');
                    li.textContent = `Completaste la evaluación de tipo "${item.type}" con un puntaje de ${item.score} el ${new Date(item.created_at).toLocaleDateString()}`;
                    recentActivityList.appendChild(li);
                });
            }

            // Add last login
            document.getElementById('last-login-info').textContent = new Date(data.last_login).toLocaleString();
        }
    })
    .catch(err => {
        console.error(err);
        // Handle fetch errors
    });

    // Edit profile functionality
    const editBtn = document.getElementById('edit-profile-btn');
    const saveBtn = document.getElementById('save-profile-btn');
    const cancelBtn = document.getElementById('cancel-edit-btn');

    const profileName = document.getElementById('profile-name');
    const profileAge = document.getElementById('profile-age');
    const profileGrade = document.getElementById('profile-grade');
    const profileRole = document.getElementById('profile-role');

    let originalValues = {};

    editBtn.addEventListener('click', () => {
        // Enter edit mode
        editBtn.style.display = 'none';
        saveBtn.style.display = 'inline-block';
        cancelBtn.style.display = 'inline-block';

        originalValues.name = profileName.textContent;
        originalValues.age = profileAge.textContent.replace('Edad: ', '');
        originalValues.grade = profileGrade.textContent.replace('Grado: ', '');

        profileName.innerHTML = `<input type="text" id="edit-name" value="${originalValues.name}">`;
        profileAge.innerHTML = `Edad: <input type="number" id="edit-age" value="${originalValues.age === 'N/A' ? '' : originalValues.age}">`;
        profileGrade.innerHTML = `Grado: <input type="text" id="edit-grade" value="${originalValues.grade === 'N/A' ? '' : originalValues.grade}">`;
    });

    cancelBtn.addEventListener('click', () => {
        // Exit edit mode
        editBtn.style.display = 'inline-block';
        saveBtn.style.display = 'none';
        cancelBtn.style.display = 'none';

        profileName.textContent = originalValues.name;
        profileAge.textContent = `Edad: ${originalValues.age}`;
        profileGrade.textContent = `Grado: ${originalValues.grade}`;
    });

    saveBtn.addEventListener('click', () => {
        const newName = document.getElementById('edit-name').value.split(' ');
        const newFirstName = newName[0];
        const newLastName = newName.slice(1).join(' ');
        const newAge = document.getElementById('edit-age').value;
        const newGrade = document.getElementById('edit-grade').value;

        fetch('http://localhost:5000/api/profile', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'x-auth-token': token
            },
            body: JSON.stringify({ 
                first_name: newFirstName,
                last_name: newLastName,
                age: newAge, 
                grade: newGrade 
            })
        })
        .then(res => res.json())
        .then(data => {
            if (data.msg === 'Profile updated successfully') {
                // Exit edit mode and update UI
                editBtn.style.display = 'inline-block';
                saveBtn.style.display = 'none';
                cancelBtn.style.display = 'none';

                profileName.textContent = `${newFirstName} ${newLastName}`;
                profileAge.textContent = `Edad: ${newAge}`;
                profileGrade.textContent = `Grado: ${newGrade}`;
            } else {
                // Handle error
                console.error(data.msg);
            }
        })
        .catch(err => console.error(err));
    });
});