const formLogin = document.getElementById('formLogin');
const inputEmail = document.getElementById('inputEmail');
const inputPassword = document.getElementById('inputPassword');

const regexUsername = /^[a-z][a-z0-9_@.]{5,20}/;
const regexEmail = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
const regexPassword = /^.{6,12}/;

function isMatchRegex (str, regex){
    return regex.test(str);
}

function validateInputEmail(e) {
    const valueEmail = e.target.value.toLowerCase();
    const messageErr = document.querySelector('#inputEmail ~ .errorValidate');
    console.log(messageErr);
    const isValidUserName = isMatchRegex(valueEmail, regexUsername);
    const isValidEmail = isMatchRegex(valueEmail, regexEmail);
    if(isValidUserName || isValidEmail){
        e.target.classList.remove('validate');
        messageErr.classList.remove('errorActive');

    }else {
        e.target.classList.add('validate');
        messageErr.classList.add('errorActive');
    }
}


function validateInputPassword(e) {
    const valuePassword = e.target.value;
    const messageErr = document.querySelector('#inputPassword~.errorValidate');
    const isValidPassword = isMatchRegex(valuePassword, regexPassword);    
    console.log(valuePassword);
    if(!isValidPassword){
        e.target.classList.add('validate');
        messageErr.classList.add('errorActive');
    }else {
        e.target.classList.remove('validate');
        messageErr.classList.remove('errorActive');

    }
}

inputEmail.addEventListener('input', validateInputEmail );
inputPassword.addEventListener('input', validateInputPassword );



formLogin.addEventListener('submit',function (even){
    const valueEmail = inputEmail.value.toLowerCase();
    const valuePassword = inputPassword.value;
    console.log(valueEmail, "email");
    console.log(valuePassword);
    const isValidUserName = isMatchRegex(valueEmail, regexUsername);
    const isValidEmail = isMatchRegex(valueEmail, regexEmail);
    const isValidPassword = isMatchRegex(valuePassword, regexPassword);   
    console.log(isValidUserName, isValidEmail, isValidPassword) 
    if((!isValidUserName && !isValidEmail) || !isValidPassword){
        even.preventDefault();
    }    
    // return false;
})