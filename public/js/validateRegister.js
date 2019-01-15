const inputUserName = document.getElementById('inputUserName');
const inputEmail = document.getElementById('inputEmail');
const inputPassword = document.getElementById('inputPassword');
const inputConfirmPassword = document.getElementById('inputConfirmPassword');


const regexUsername = /^[a-z][a-z0-9_]{5,20}/;
const regexEmail = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
const regexPassword = /^(?=.*\d).{4,8}$/;


function isMatchRegex (str, regex){
    return regex.test(str);
}

