document.getElementById('contactForm').addEventListener('submit', async function(event) {
    event.preventDefault();
  
    const form = event.target;
    const formData = new FormData(form);
  
    const response = await fetch('/api/contact', {
        method: 'POST',
        body: JSON.stringify({
            name: formData.get('name'),
            email: formData.get('email'),
            message: formData.get('textarea')
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    });
  
    if (response.ok) {
        document.getElementById('responseMessage').classList.remove('hidden');
        form.reset();
    } else {
        alert('An error occurred. Please try again later.');
    }
  });
  
  //Frequently Asked Questions
  document.querySelectorAll('.faq-item').forEach(item => {
    item.addEventListener('click', () => {
        const answer = item.querySelector('.faq-answer');
        const icon = item.querySelector('.faq-icon');
        if (answer.style.display === 'none' || answer.style.display === '') {
            answer.style.display = 'block';
            icon.textContent = '-';
        } else {
            answer.style.display = 'none';
            icon.textContent = '+';
        }
    });
  });