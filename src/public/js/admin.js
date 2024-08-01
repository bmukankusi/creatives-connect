async function fetchUsers() {
  try {
    const response = await fetch('/api/admin/users', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      },
    });
    const data = await response.json();
 console.log(data)
    // Check if the response is successful
    if (response.ok) {
      const verifiedUsers= data.filter(user=> user.isVerified)
      console.log(data.length)
      document.getElementById('totalUsers').innerText = data.length;
      const userTableBody = document.getElementById('userTableBody');
      data.forEach((user, index) => {
        const row = document.createElement('tr');
        row.classList.add('border-b', 'border-gray-200', 'hover:bg-gray-100', index % 2 === 0 ? 'bg-gray-100' : 'bg-white');

        row.innerHTML = `
          <td class="py-3 px-6 text-left">${index + 1}</td>
          <td class="py-3 px-6 text-left">${user.name}</td>
          <td class="py-3 px-6 text-left">${user.email}</td>
          <td class="py-3 px-6 text-left">${user.category}</td>
        `;

        userTableBody.appendChild(row);
      });
    } else {
      console.error('Failed to fetch users:', data.message);
    }
  } catch (error) {
    console.error('Error:', error);
  }
}

//logout function
document.getElementById('logout').addEventListener('click', async function (event) {
  event.preventDefault(); 
   localStorage.removeItem("token")
   window.location.href="/"
});



// Call fetchUsers function on page load
window.onload = fetchUsers;