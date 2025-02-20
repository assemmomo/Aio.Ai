const fNameV = document.querySelector('.firstName').value;
const lNameV = document.querySelector('.lastName').value;
const emailV = document.querySelector('.email').value;
const oldpassword = document.querySelector('.oldPass').value;
const newpassword = document.querySelector('.newPass').value;
const newpassword2 = document.querySelector('.newPass2').value;
const user = JSON.parse(localStorage.getItem('user'));

document.querySelector('.firstName').value=user.fName;
document.querySelector('.lastName').value=user.lName;
document.querySelector('.email').value=user.email;


function updateProfile(){
    const fNameV = document.querySelector('.firstName').value;
    const lNameV = document.querySelector('.lastName').value;
    const emailV = document.querySelector('.email').value;
    const userr = JSON.parse(localStorage.getItem('user'));

    const user = {
        fName: fNameV,
        lName: lNameV,
        email: emailV,
        password: userr.password,
        id: userr.id
    }

    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem(`user_${user.id}`, JSON.stringify(user));
}

function updatePassword(){
    const oldpassword = document.querySelector('.oldPass').value;
    const newpassword = document.querySelector('.newPass').value;
    const newpassword2 = document.querySelector('.newPass2').value;
    const userr = JSON.parse(localStorage.getItem('user'));

    if(newpassword !== newpassword2 || newpassword == '' || newpassword2 == '' || oldpassword !== userr.password){
        console.log('Passwords do not match');
    }else{

    const user = {
        fName: userr.fName,
        lName: userr.lName,
        email: userr.email,
        password: newpassword,
        id: userr.id
    }

    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem(`user_${user.id}`, JSON.stringify(user));
}}


if(window.localStorage.getItem('doneLogin') === 'true'){
    document.body.classList.add("doneLogin");
    document.querySelector('.loginBtn').style.display = "none";
    document.querySelector('.profileBtn').style.display = "flex";
    document.querySelector('.profileMenu').style.display = "flex";
    document.querySelector('.profileMenu').classList.remove("profileMenuActive");
    document.querySelector('.profileN').innerHTML = window.localStorage.getItem('user') ? JSON.parse(window.localStorage.getItem('user')).fName : "User";
}else{
    document.body.classList.remove("doneLogin");
    document.querySelector('.loginBtn').style.display = "flex";
    document.querySelector('.profileBtn').style.display = "none";
    document.querySelector('.profileMenu').style.display = "none";
}
function openProfileMenu(){
    document.querySelector('.profileMenu').classList.toggle("profileMenuActive");
}
document.querySelector('.profileBtn').addEventListener('click', openProfileMenu);

function logout(){
    window.localStorage.setItem('doneLogin', 'false');
    document.body.classList.remove("doneLogin");
    document.querySelector('.loginBtn').style.display = "flex";
    document.querySelector('.profileMenu').style.display = "none";
    document.querySelector('.profileBtn').style.display = "none";
    document.querySelector('.loginFirst').style.display = "flex";
}
let logoutBtn = document.querySelector('.logoutBtn');

logoutBtn.addEventListener('click', logout);

setInterval(function(){
    if(window.localStorage.getItem('doneLogin') === 'false'){
        window.localStorage.removeItem('user');
        document.querySelector('.profileBtn').style.display = "none";
    }
}, 1000);

document.querySelector('#nav').firstChild.addEventListener('click', function(){
    window.location.href = 'index.html';
});