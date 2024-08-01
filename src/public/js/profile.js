async function fetchUserData() {
  try {
      const token = localStorage.getItem('token'); 
              if (!token) {
                  window.location.href = '/login#login';
                  return;
              }

              const response = await fetch('/api/users/profile', {
                  method: 'GET',
                  headers: {
                      'Authorization': `Bearer ${token}`,
                      'Content-Type': 'application/json',
                  },
              });

              if (!response.ok) {
                  throw new Error('Failed to fetch user data');
              }
              
              const data = await response.json();
              console.log(data)
              document.getElementById('name').innerText = data?.name;
              document.getElementById('email').innerText = data?.email;
              document.getElementById('category').innerText = data?.category ;
              document.getElementById('location').innerText = data?.location || 'none';
              document.getElementById('company').innerText = data?.company || 'none';
              document.getElementById('bio').innerText = data?.bio || 'none';
              document.getElementById('phone').innerText = data?.contactInfo?.phone || 'none';
              // document.getElementById('other-email').innerText = data?.otherEmail || '';
             //  document.querySelector('#instagram\\ link')?.innerText = data?.contactInfo?.socialMedia?.instagram || '';


             //  document.getElementById('linkedin').innerText = data?.contactInfo?.socialMedia?.linkedin || '';
             //  document.getElementById('whatsapp').innerText = data?.contactInfo?.socialMedia?.whatsapp || '';
              document.getElementById('profile-picture').src = data?.profilePicture ? `../${data.profilePicture}` : '../Images/cc-profile.jpg';


          } catch (err) {
              console.error('Error fetching user data:', err);
              alert('Error fetching user data. Please try again.');
          }
  }

  async function fetchUserWorks() {
       try {
           const token = localStorage.getItem('token');
           const response = await fetch('/api/users/works', {
               method: 'GET',
               headers: {
                   'Authorization': `Bearer ${token}`,
                   'Content-Type': 'application/json',
               },
           });
   
           if (!response.ok) {
               throw new Error('Failed to fetch user works');
           }
   
           const works = await response.json();
           console.log(works)
           const portfolioDiv = document.getElementById('portfolio-works');
           portfolioDiv.innerHTML = '';
   
           if (Array.isArray(works?.data)) {
               works.data.forEach(work => {
                   const workDiv = document.createElement('div');
                   workDiv.className = 'bg-white p-2 overflow-hidden rounded-lg shadow-lg';
                   workDiv.innerHTML = `
                   <img src="${work?.workImageLink}" alt="Portfolio Image" class="w-full h-52 object-cover rounded-lg mb-4">
                   <div class="text-xl font-bold mb-2">${work?.title}</div>
                   <p class="text-gray-700 text-base mb-4">${work?.description}</p>
                   <div class="px-6 pt-4 pb-2">
                       ${work?.tags.map(tag => `<span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#${tag}</span>`).join('')}
                   </div>
               `;
                   portfolioDiv.appendChild(workDiv);
               });
           } else {
               console.error('Expected an array but received:', works);
           }
       } catch (err) {
           console.error('Error fetching user works:', err);
           alert('Error fetching user works. Please try again.');
       }
   }



   document.addEventListener("DOMContentLoaded", async ()=>{
     await fetchUserData()
     await  fetchUserWorks()
 

        
 });
     
         