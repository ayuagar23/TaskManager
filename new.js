const toggle_btn = document.getElementById('toggle-btn');
const body = document.querySelector('body');
const navv = document.getElementById('navv');
const bgModeBtn = document.getElementById('bgModeBtn');
const bgModeIcon = document.getElementById('bgModeIcon');
const sectionHeader = document.querySelector('section h1');

bgModeBtn.onclick = function(){
    body.classList.toggle("dark-mode");
	navv.classList.toggle("dark-mode");
    bgModeIcon.classList.toggle("fa-sun-o");
    bgModeIcon.classList.toggle("fa-moon-o");
    sectionHeader.classList.toggle("dark-mode");
};