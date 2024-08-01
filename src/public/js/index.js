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

    