'use strict';

var passLength,
    charCode,
    i,
    formButton = document.getElementById('bv-sign-up'),
    errorWrapper = document.getElementById('bv-error-wrapper'),
    errorMsg = document.getElementById('bv-error-msg'),
    showPassIcon = document.getElementById('bv-show-password'),
    username = document.getElementById('bv-username-input'),
    usernameWrapper = document.getElementById('bv-username-field'),
    password = document.getElementById('bv-password-input'),
    passwordWrapper = document.getElementById('bv-password-field'),
    header = document.getElementById('bv-header'),
    nav = document.getElementById('bv-nav'),
    menu = document.getElementById('bv-btn-menu');


// Set nav equal to window height
function setNavHeight(){
  nav.style.height = (window.innerHeight - 50) + 'px';
}

window.onload = setNavHeight();

// Toggle form type between password and text to show/hide password

function showPass(){
  var passType = password.getAttribute('type');
  if( passType === 'password'){
    password.setAttribute('type','text');
  }else{
    password.setAttribute('type','password');
  }
}

showPassIcon.addEventListener('click', showPass);

// Menu Transition Animations

function menuVisible(){
  header.classList.remove('bv-menu-transition-in'); // Clean up
  header.classList.add('bv-menu-visible'); // Increases wrapper with to 70%
}

function menuTransitionIn(){
  header.classList.remove('bv-menu-transition-out'); // Clean up
  header.classList.add('bv-menu-transition-in'); // Moves nav onscreen
}

function menuTransitionOut(){
  header.classList.remove('bv-menu-transition-in'); // Clean up
  header.classList.add('bv-menu-transition-out'); // moves nav offscreen
}

function menuHidden(){
  header.classList.add('bv-menu-hidden'); // set nav to display none
  header.classList.remove('bv-menu-transition-out'); // Clean up
}

function menuShrinkWrapper(){
  header.classList.add('bv-menu-transition-in'); // Decreases Wrapper width to 30%
  header.classList.remove('bv-menu-visible'); // Clean up
}

function menuNavSetup(){
  header.classList.add('bv-menu-transition-out'); // Gives nav display block
  header.classList.remove('bv-menu-hidden'); // Removes display none
}

function toggleMenu(){
  if(header.classList.contains('bv-menu-visible')){
    menuShrinkWrapper();
    window.setTimeout(menuTransitionOut, 200);
    window.setTimeout(menuHidden, 300);
  }else{
    menuNavSetup();
    window.setTimeout(menuTransitionIn, 50);
    window.setTimeout(menuVisible, 100);
  }
}

menu.addEventListener('click', toggleMenu);

// Form Error Transition Animations

function errorReset(){
  if(errorWrapper.classList.contains('bv-visible')){
    errorWrapper.classList.add('bv-hidden');
    errorWrapper.classList.remove('bv-visible');
  }
  if(usernameWrapper.classList.contains('bv-field-error')){
    usernameWrapper.classList.remove('bv-field-error');
  }
  if(passwordWrapper.classList.contains('bv-field-error')){
    passwordWrapper.classList.remove('bv-field-error');
  }
}

function errorVisible(){
  errorWrapper.classList.add('bv-visible');
  errorWrapper.classList.remove('bv-transition');
}

function errorTransition(){
  errorReset();
  errorWrapper.classList.remove('bv-hidden');
  errorWrapper.classList.add('bv-transition');
  window.setTimeout(errorVisible, 100);
}

// Form Validations

// Return true if at least one upper case character exists, else return false
function passHasUpperCase(pass) {
  for (i = 0, passLength = pass.length; i < passLength;) {
    charCode = pass.charCodeAt(i);
    if (charCode > 64 && charCode < 91) { // Upper case A to Z
      return true;
    }
    i++;
  }
  return false;
}

// Return true if at least one non-alphanumeric character exists, else return false
function passHasNonAlpha(pass) {
  for (i = 0, passLength = pass.length; i < passLength;) {
    charCode = pass.charCodeAt(i);
    if (!(charCode > 47 && charCode < 58) &&
        !(charCode > 64 && charCode < 91) && // Upper case A to Z
        !(charCode > 96 && charCode < 123)) {
      return true;
    }
    i++;
  }
  return false;
}

// Return true if all password conditions met, else return false
function passwordValid(password){
  if(password.length <= 6){
    errorMsg.textContent = 'Password must be at least six characters.';
    errorTransition();
    passwordWrapper.classList.add('bv-field-error');
    return false;
  }
  if(passHasUpperCase(password) === false){
    errorMsg.textContent = 'Password must have at least one uppercase letter.';
    errorTransition();
    passwordWrapper.classList.add('bv-field-error');
    return false;
  }
  if(passHasNonAlpha(password) === false){
    errorMsg.textContent = 'Password must have at least one non-alphanumeric character.';
    errorTransition();
    passwordWrapper.classList.add('bv-field-error');
    return false;
  }
  else{
    errorReset();
    return true;
  }
}

// Return true if all username conditions met, else return false
function usernameValid(username){
  if(username === ''){
    errorMsg.textContent = 'Username must not be blank';
    errorTransition();
    usernameWrapper.classList.add('bv-field-error');
    return false;
  }
  else{
    return true;
  }
}

// Return true if username and password both meet all conditions above, else false
function validateForm(){
  event.preventDefault();
  var usernameValue = username.value,
      passwordValue = password.value;
  if (usernameValid(usernameValue) !== false && passwordValid(passwordValue) !== false){
    errorReset();
    return true;
  }else{
    return false;
  }
}

formButton.onclick = validateForm;
