let file;

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
                document.getElementById('name').value = data?.name;
                document.getElementById('email').value = data?.email;
                document.getElementById('category').value = data?.category;
                document.getElementById('location').value = data?.location || '';
                document.getElementById('company').value = data?.company || '';
                document.getElementById('bio').value = data?.bio || '';
                document.getElementById('phone').value = data?.contactInfo?.phone || '';
                // document.getElementById('other-email').value = data?.otherEmail || '';
                document.querySelector('#instagram\\ link').value = data?.contactInfo?.socialMedia?.instagram || '';


                document.getElementById('linkedin').value = data?.contactInfo?.socialMedia?.linkedin || '';
                document.getElementById('whatsapp').value = data?.contactInfo?.socialMedia?.whatsapp || '';
                document.getElementById('profile-picture').src = data?.profilePicture ? `../${data.profilePicture}` : '../Images/cc-profile.jpg';


            } catch (err) {
                console.error('Error fetching user data:', err);
                alert('Error fetching user data. Please try again.');
            }
    }


async function saveUserData() {
      const token = localStorage.getItem('token');
      const userData = {
        location: document.getElementById('location')?.value,
        company: document.getElementById('company')?.value,
        bio: document.getElementById('bio')?.value,
        phone: document.getElementById('phone')?.value,
        // otherEmail: document.getElementById('other-email')?.value,
        instagram:  document.querySelector('#instagram\\ link').value,
        linkedin: document.getElementById('linkedin')?.value,
        whatsapp: document.getElementById('whatsapp')?.value,
      };

      try {
        const response = await fetch('/api/users/profile/update', {
          method: 'PUT',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(userData),
        });

        if (response.ok) {
          alert('User data saved successfully');
        } else {
          alert('Error saving user data');
        }
      } catch (err) {
        console.error('Error saving user data:', err);
      }
    }
 

    async function uploadProfilePicture() {
      const token = localStorage.getItem('token');
      const fileInput = document.getElementById('profile-picture-input');
      console.log(file)
      const formData = new FormData();
      formData.append('profilePicture', file    );
  
      try {
          const response = await fetch('/api/users/profile/picture', {
              method: 'POST',
              headers: {
                  'Authorization': `Bearer ${token}`,
              },
              body: formData,
          });
  
          if (response.ok) {
              const data = await response.json();
              console.log(data)
              document.getElementById('profile-picture').src = `..${data.profilePictureUrl}`;
              alert('Profile picture uploaded successfully');
          } else {
              alert('Error uploading profile picture');
          }
      } catch (err) {
          console.error('Error uploading profile picture:', err);
      }
  }

  //new work upload

  

async function uploadNewWork() {
    const token = localStorage.getItem('token');
    const title = document.getElementById('work-title')?.value;
    const description = document.getElementById('work-description')?.value;
    const tags = document.getElementById('work-tags')?.value.split(',').map(tag => tag.trim());
    const workFile = document.getElementById('work-image-input');
    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('tags', JSON.stringify(tags));
    console.log()
    formData.append('workImage', workFile.files[0]);

    try {
        const response = await fetch('/api/users/createWork/', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
            },
            body: formData,
        });

        if (response.ok) {
            await fetchUserWorks();
            alert('New work uploaded successfully');
            document.querySelector('#work-form').reset();
        } else {
            alert('Error uploading new work');
        }
    } catch (err) {
        console.error('Error uploading new work:', err);
    }
}


document.addEventListener("DOMContentLoaded", async ()=>{
    await fetchUserData()
    document.getElementById('save-button').addEventListener('click', saveUserData);
    document.getElementById('profile-page').addEventListener('click', function () {
    document.getElementById('user-profile').classList.remove('hidden');
    document.getElementById('portfolio').classList.add('hidden');
            });
    document.getElementById('logout').addEventListener('click', async function (event) {
            event.preventDefault(); 
             localStorage.removeItem("token")
             window.location.href="/"
        });

        document.getElementById('profile-picture-input').addEventListener('change',    document.getElementById('profile-picture-input').addEventListener('change', function(event) {
            file = event.target.files[0];
            console.log(file)
            if (file) {
                const reader = new FileReader();
                reader.onload = function(e) {
                    document.getElementById('profile-picture').src = e.target.result;
                };
                reader.readAsDataURL(file);
            }
        }));
        document.getElementById('upload-picture').addEventListener('click', uploadProfilePicture);
        document.getElementById('upload-work-button').addEventListener('click', uploadNewWork);
        document.getElementById('show-work-form-button').addEventListener('click', function(e) {
            const workForm = document.getElementById("work-form");


            if (workForm.classList.contains("hidden")) {
                workForm.classList.remove("hidden");
                workForm.classList.add("block");
    
            }
            
        });
});
    
        