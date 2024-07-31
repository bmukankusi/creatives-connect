//Menu & Dropdown

document.getElementById('menuButton').addEventListener('click', function () {
  const menu = document.getElementById('menu');
  menu.classList.toggle('hidden');
});

document.getElementById('designerMobile').addEventListener('click', function () {
  const dropdown = document.getElementById('dropdownMobile');
  dropdown.classList.toggle('hidden');
  dropdown.classList.toggle('show');
});

document.getElementById('designerDesktop').addEventListener('mouseenter', function () {
  const dropdown = document.getElementById('dropdownDesktop');
  dropdown.classList.add('show');
});

document.getElementById('dropdownDesktop').addEventListener('mouseleave', function () {
  const dropdown = document.getElementById('dropdownDesktop');
  dropdown.classList.remove('show');
});

//Scroll to top
function scrollToTop() {
        window.scrollTo({ top: 0, behavior: 'smooth' });
} 

    document.addEventListener('DOMContentLoaded', async () => {
      const token = localStorage.getItem('token');

      

      // Check if the user is an admin
    //   const isAdminResponse = await fetch('http://localhost:5000/api/users/me', {
    //       method: 'GET',
    //       headers: {
    //           'Authorization': `Bearer ${token}`
    //       }
    //   });

    //   const isAdminData = await isAdminResponse.json();

    //   if (!isAdminData.isAdmin) {
    //       alert('Access denied!');
    //       window.location.href = '/dashboard.html';
    //       return;
    //   }

      // Fetch and display registered users
    //   document.getElementById('view-users-button').addEventListener('click', () => {
    //       fetch('http://localhost:5000/api/admin/users', {
    //           method: 'GET',
    //           headers: {
    //               'Authorization': `Bearer ${token}`
    //           }
    //       })
    //       .then(response => response.json())
    //       .then(data => {
    //           const usersList = document.getElementById('users-list');
    //           usersList.innerHTML = data.map(user => `
    //               <div class="mb-2 p-2 border rounded">
    //                   <p><strong>Name:</strong> ${user.name}</p>
    //                   <p><strong>Email:</strong> ${user.email}</p>
    //                   <p><strong>Category:</strong> ${user.category}</p>
    //                   <button onclick="disableUser('${user._id}')" class="bg-red-500 text-white px-4 py-2 rounded mt-2">Disable Account</button>
    //               </div>
    //           `).join('');
    //       })
    //       .catch(error => console.error('Error fetching users:', error));
    //   });

      // Sort users by category
    //   document.getElementById('sort-users-button').addEventListener('click', () => {
    //       const category = document.getElementById('category-sort').value;
    //       fetch(`http://localhost:5000/api/admin/users/sort/${category}`, {
    //           method: 'GET',
    //           headers: {
    //               'Authorization': `Bearer ${token}`
    //           }
    //       })
    //       .then(response => response.json())
    //       .then(data => {
    //           const usersList = document.getElementById('users-list');
    //           usersList.innerHTML = data.map(user => `
    //               <div class="mb-2 p-2 border rounded">
    //                   <p><strong>Name:</strong> ${user.name}</p>
    //                   <p><strong>Email:</strong> ${user.email}</p>
    //                   <p><strong>Category:</strong> ${user.category}</p>
    //                   <button onclick="disableUser('${user._id}')" class="bg-red-500 text-white px-4 py-2 rounded mt-2">Disable Account</button>
    //               </div>
    //           `).join('');
    //       })
    //       .catch(error => console.error('Error sorting users:', error));
    //   });

      // Disable a user account
    //   window.disableUser = (userId) => {
    //       fetch(`http://localhost:5000/api/admin/users/disable/${userId}`, {
    //           method: 'PUT',
    //           headers: {
    //               'Authorization': `Bearer ${token}`
    //           }
    //       })
    //       .then(response => response.json())
    //       .then(data => {
    //           alert(data.message);
    //           window.location.reload();
    //       })
    //       .catch(error => console.error('Error disabling user:', error));
    //   };

      // Fetch and display website analytics
    //   document.getElementById('view-analytics-button').addEventListener('click', () => {
    //       fetch('http://localhost:5000/api/admin/analytics', {
    //           method: 'GET',
    //           headers: {
    //               'Authorization': `Bearer ${token}`
    //           }
    //       })
    //       .then(response => response.json())
    //       .then(data => {
    //           const analyticsData = document.getElementById('analytics-data');
    //           analyticsData.innerHTML = `
    //               <p><strong>Total Users:</strong> ${data.users}</p>
    //               <p><strong>Active Users:</strong> ${data.activeUsers}</p>
    //               <p><strong>Events:</strong> ${data.events}</p>
    //               <p><strong>Workshops:</strong> ${data.workshops}</p>
    //               <p><strong>Courses:</strong> ${data.courses}</p>
    //           `;
    //       })
    //       .catch(error => console.error('Error fetching analytics:', error));
    //   });

      // Fetch and display advertisements
    //   document.getElementById('view-ads-button').addEventListener('click', () => {
    //       fetch('http://localhost:5000/api/admin/advertisements', {
    //           method: 'GET',
    //           headers: {
    //               'Authorization': `Bearer ${token}`
    //           }
    //       })
    //       .then(response => response.json())
    //       .then(data => {
    //           const adsList = document.getElementById('ads-list');
    //           adsList.innerHTML = data.map(ad => `
    //               <div class="mb-2 p-2 border rounded">
    //                   <p><strong>Title:</strong> ${ad.title}</p>
    //                   <p><strong>Description:</strong> ${ad.description}</p>
    //               </div>
    //           `).join('');
    //       })
    //       .catch(error => console.error('Error fetching advertisements:', error));
    //   });

      // Add a new resource
    //   document.getElementById('add-resource-form').addEventListener('submit', (e) => {
    //       e.preventDefault();
    //       const type = document.getElementById('resource-type').value;
    //       const title = document.getElementById('resource-title').value;
    //       const description = document.getElementById('resource-description').value;
    //       const sourceLink = document.getElementById('resource-source-link').value;

    //       fetch('http://localhost:5000/api/admin/resources', {
    //           method: 'POST',
    //           headers: {
    //               'Content-Type': 'application/json',
    //               'Authorization': `Bearer ${token}`
    //           },
    //           body: JSON.stringify({ type, title, description, sourceLink })
    //       })
    //       .then(response => response.json())
    //       .then(data => {
    //           alert('Resource added successfully');
    //           window.location.reload();
    //       })
    //       .catch(error => console.error('Error adding resource:', error));
    //   });

      // Fetch and display resources
    //   fetch('http://localhost:5000/api/admin/resources', {
    //       method: 'GET',
    //       headers: {
    //           'Authorization': `Bearer ${token}`
    //       }
    //   })
    //   .then(response => response.json())
    //   .then(data => {
    //       const resourcesList = document.getElementById('resources-list');
    //       resourcesList.innerHTML = data.map(resource => `
    //           <div class="mb-2 p-2 border rounded">
    //               <p><strong>Type:</strong> ${resource.type}</p>
    //               <p><strong>Title:</strong> ${resource.title}</p>
    //               <p><strong>Description:</strong> ${resource.description}</p>
    //               <p><strong>Source Link:</strong> <a href="${resource.sourceLink}" target="_blank" class="text-blue-500">${resource.sourceLink}</a></p>
    //           </div>
    //       `).join('');
    //   })
    //   .catch(error => console.error('Error fetching resources:', error));
  });