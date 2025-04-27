async function login() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    
    if (!username || !password) {
        alert('Please enter both username and password');
        return;
    }

    try {
        const response = await fetch('/api/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: username,
                password: password
            })
        });

        const data = await response.json();
        
        if (response.ok) {
            localStorage.setItem('token', data.access_token);
            window.location.href = 'dashboard.html';
        } else {
            alert(data.message || 'Login failed');
        }
    } catch (error) {
        alert('Error during login');
        console.error('Login error:', error);
    }
}

document.querySelector('.create-account').addEventListener('click', function(e) {
    e.preventDefault();
    document.body.style.opacity = '0';
    document.body.style.transform = 'translateY(20px)';
    setTimeout(() => {
        window.location.href = this.href;
    }, 300);
});
