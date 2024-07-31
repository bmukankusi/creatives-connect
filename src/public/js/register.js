// Password icon toggle
// Toggle password visibility

const togglePassword = document.querySelector('#togglePassword');
        const password = document.querySelector('#password');

        togglePassword.addEventListener('click', function (e) {
            const type = password.getAttribute('type') === 'password' ? 'text' : 'password';
            password.setAttribute('type', type);
            this.classList.toggle('fa-eye-slash');
});

const toggleConfirmPassword = document.querySelector('#toggleConfirmPassword');
const confirmPassword = document.querySelector('#confirmPassword');
toggleConfirmPassword.addEventListener('click', function (e) {
            const type = confirmPassword.getAttribute('type') === 'password' ? 'text' : 'password';
            confirmPassword.setAttribute('type', type);
            this.classList.toggle('fa-eye-slash');
        });

document.getElementById('register-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const subBtn = document.getElementById("registerBtn");
    subBtn.disabled = true;
    subBtn.innerText = "Registering...";
    
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value.trim();
    const confirmPassword = document.getElementById('confirmPassword').value.trim();
    const category = document.getElementById('category').value;

    const notify = document.getElementById('msg');
    
    if (password !== confirmPassword) {
        alert('Passwords do not match.');
        subBtn.disabled = false;
        subBtn.innerText = "Sign up";
        return;
    }

    try {
        const response = await fetch('/api/users/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name, email, password, category,confirmPassword })
        });
        
        if (!response.ok) {
            const data = await response.json();
            throw new Error(data.message || 'Registration failed');
        }
        
        const data = await response.json();
        
        if (data.success) {
            notify.innerText = "Registration successful, redirecting to login...";
            setTimeout(() => {
                window.location = '/login';
            }, 4000);
        } else {
            alert(data.message || 'An error occurred');
        }
        
    } catch (err) {
        alert(`Error: ${err.message}`);
    } finally {
        subBtn.disabled = false;
        subBtn.innerText = "Sign up";
    }
});

   