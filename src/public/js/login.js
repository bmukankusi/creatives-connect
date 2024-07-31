document.getElementById('login-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const loginBtn = document.getElementById("loginBtn");
    loginBtn.innerText = "Logging in...";
    loginBtn.disabled = true;
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value.trim();
    try {
        const response = await fetch('/api/users/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        });
        
        if (!response.ok) {
            const errorData = await response.json();
            alert(`Login failed: ${errorData.message || 'Unknown error'}`);
            return;
        }

        const data = await response.json();
        
        if (data.token) {
            const token = data.token;
            localStorage.setItem('token', token);
            
            const isAdminResponse = await fetch('/api/users/profile', {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (!isAdminResponse.ok) {
                const errorData = await isAdminResponse.json();
                alert(`Error fetching user profile: ${errorData.message || 'Unknown error'}`);
                return;
            }
            
            const userData = await isAdminResponse.json();
            
            if (userData.isAdmin) {
                window.location.href = '/admin';
            } else {
                window.location.href = '/dashboard';
            }
        } else {
            alert('Login failed: No token received');
        }
    } catch (err) {
        alert(`Error: ${err.message}`);
    } finally {
        loginBtn.innerText = "Log in";
        loginBtn.disabled = false;
    }
});



// Password icon toggle
const togglePassword = document.querySelector('#togglePassword');
        const password = document.querySelector('#password');

        togglePassword.addEventListener('click', function (e) {
            // toggle the type attribute
            const type = password.getAttribute('type') === 'password' ? 'text' : 'password';
            password.setAttribute('type', type);
            // toggle the eye slash icon
            this.classList.toggle('fa-eye-slash');
        });

        const toggleConfirmPassword = document.querySelector('#toggleConfirmPassword');
        const confirmPassword = document.querySelector('#confirmPassword');

        toggleConfirmPassword.addEventListener('click', function (e) {
            // toggle the type attribute
            const type = confirmPassword.getAttribute('type') === 'password' ? 'text' : 'password';
            confirmPassword.setAttribute('type', type);
            // toggle the eye slash icon
            this.classList.toggle('fa-eye-slash');
        });