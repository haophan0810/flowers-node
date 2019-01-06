const formLogin = document.getElementById('formLogin');
// console.log(formLogin);

const inputEmail = document.getElementById('inputEmail');
const inputPassword = document.getElementById('inputPassword');

function validateInputEmail(e) {
    console.log(e);
}

// function validateInputPassword(e) {
//     console.log(e);
    
// }

inputEmail.addEventListener('input', validateInputEmail );
// inputPassword.addEventListener('input', validateInputPassword );



formLogin.addEventListener('submit',function (e){
    console.log(e.target);
    e.preventDefault();
    // return false;
})