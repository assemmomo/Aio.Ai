async function sendMessage() {
    let userInput = document.querySelector('.chatInput').value;
    if (!userInput) return;

    if(document.body.classList.contains("doneLogin")==false){
        document.querySelector('.loginFirst').style.border="3px solid red";
        setTimeout(() => {
            document.querySelector('.loginFirst').style.border="none";
        }, 200);
    }else{
    let chatBox = document.querySelector('.chatArea');
    chatBox.innerHTML += `<p class="userP"><span><i class="fa-solid fa-user-tie" style="color:rgb(55, 165, 55);font-size:25px;"></i> -</span> ${userInput}</p>`;

    document.querySelector('.chatInput').value = '';
    chatBox.querySelector("h3").style.display = "none";
    document.querySelector('.aiStartM').style.display = "none";

    // استبدل YOUR_API_KEY بمفتاح الـ API الخاص بك
    let apiKey = "ljF7rA55eraj7jeMj1YWdnteOttf7pzq";

    let response = await fetch('https://api.mistral.ai/v1/chat/completions', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify({
            model: "mistral-tiny",
            messages: [{ role: "user", content: userInput }]
        })
    });

    let data = await response.json();
    let botReply = data.choices?.[0]?.message?.content || "Error: No response.";

    chatBox.innerHTML += `<p class="aiP"><span><i class="fa-solid fa-robot" style="color:rgb(55, 165, 55);font-size:25px;"></i></span>${botReply}</p>`;
    chatBox.scrollTop = chatBox.scrollHeight;
    }
}


document.body.addEventListener('keypress', s =>{
    if(s.code==="Enter"){
          sendMessage();
    }
});

let dots = document.querySelectorAll(".dot");
let imgs = document.querySelectorAll(".img");



setInterval(function(){
    if(window.scrollY < 400){
        dots[0].classList.add("dotActive")
        dots[1].classList.remove("dotActive")
        dots[2].classList.remove("dotActive")
        dots[3].classList.remove("dotActive")
    }
    if(window.scrollY > 400){
        dots[0].classList.remove("dotActive")
        dots[1].classList.add("dotActive")
        dots[2].classList.remove("dotActive")
        dots[3].classList.remove("dotActive")
    }
    if(window.scrollY > 1200){
        dots[0].classList.remove("dotActive")
        dots[1].classList.remove("dotActive")
        dots[2].classList.add("dotActive")
        dots[3].classList.remove("dotActive")
    }
    if(window.scrollY > 2100){
        dots[0].classList.remove("dotActive")
        dots[1].classList.remove("dotActive")
        dots[2].classList.remove("dotActive")
        dots[3].classList.add("dotActive")
    }
},100)

let loginPage = document.querySelector(".loginPage");

function openLoginPage(){
    loginPage.classList.toggle("loginActive");
}
function closeLoginPage(){
    loginPage.classList.remove("loginActive");
}

document.addEventListener('scroll', function() {
    const imgsHolder = document.querySelector('.imgsHolder');
    const imgsPosition = imgsHolder.getBoundingClientRect().top + 300;
    const screenPosition = window.innerHeight / 1.5;
    const aiStartM = document.querySelector('.aiStartM');
    const chatIP = document.querySelector('.chatInput');
    

    if (imgsPosition < screenPosition) {
        imgsHolder.style.opacity = '1';
        imgsHolder.style.left = '50%';
    }else{
        imgsHolder.style.opacity = '0';
        imgsHolder.style.left = '-50%';
    }
    if(chatIP.getBoundingClientRect().top < window.innerHeight){
        aiStartM.style.left = '0';
    }
});
function updateNavbarLinks() {
    const navbarLinks = document.querySelectorAll('.navMid a');
    if (window.innerWidth < 1000) {
        navbarLinks.forEach(link => link.style.display = 'none');
    } else {
        navbarLinks.forEach(link => link.style.display = 'block');
    }
}

window.addEventListener('resize', updateNavbarLinks);
window.addEventListener('load', updateNavbarLinks);

let fName = document.createElement('input');
fName.setAttribute('type', 'text');
fName.setAttribute('placeholder', 'First Name');
fName.classList.add('fName');
let lName = document.createElement('input');
lName.setAttribute('type', 'text');
lName.setAttribute('placeholder', 'Last Name');
lName.classList.add('lName');



function signup(){
    document.querySelector('.loginForm').style.marginLeft="-50%";
    document.querySelector('.loginTxt').style.right="-50%";
    document.querySelector('.signInBtn').classList.remove("signActive");
    document.querySelector('.signUpBtn').classList.add("signActive");
    document.querySelector('.signH2').textContent="Sign Up";
    document.querySelector('.signBtn').innerHTML="Sign Up";
    document.querySelector('.signBtn').setAttribute('onclick','register()');
    document.querySelector('.loginTxt h1').innerHTML="Join us and start chatting with our AI";
    document.querySelector('.loginTxt h1').style.fontSize="45px";
    document.querySelector('.signForm').appendChild(fName);
    document.querySelector('.signForm').appendChild(lName);
    document.querySelector('.wrongEmail').style.display = "none";
    setTimeout(() => {
        document.querySelector('.signImg').style.cssText = "right:-110px !important; left: auto !important;transform: rotate(-60deg);";
    }, 310);
}
function signin(){
    document.querySelector('.loginForm').style.marginLeft="0";
    document.querySelector('.loginTxt').style.right="0";
    document.querySelector('.signInBtn').classList.add("signActive");
    document.querySelector('.signUpBtn').classList.remove("signActive");
    document.querySelector('.signBtn').innerHTML="Sign In";
    document.querySelector('.signBtn').setAttribute('onclick','login()');
    document.querySelector('.signH2').textContent="Sign In";
    document.querySelector('.loginTxt h1').innerHTML="Welcome back !";
    document.querySelector('.loginTxt h1').style.fontSize="70px";
    document.querySelector('.signForm').removeChild(fName);
    document.querySelector('.signForm').removeChild(lName);
    document.querySelector('.wrongEmail').style.display = "none";
    setTimeout(() => {
        document.querySelector('.signImg').style.cssText = "left:-100px !important; right: auto !important;transform: rotate(50deg);";
    }, 310);
}
function fullScreen(){
    const chatDad = document.querySelector('.chatDad');
    chatDad.classList.toggle("fullScreenActive");
    document.querySelector('.fullS i').classList.toggle("fa-expand");
    document.querySelector('.fullS i').classList.toggle("fa-compress");
    if (chatDad.classList.contains("fullScreenActive")) {
        document.body.style.overflow = "hidden";
    } else {
        document.body.style.overflow = "auto";
    }
}

function register(){
    let emailV = document.querySelector('.emailIp').value;
    let passwordV = document.querySelector('.passIp').value;
    let fNameV = fName.value;
    let lNameV = lName.value;
    if(emailV === "" || passwordV === "" || fNameV === "" || lNameV === ""){
        document.querySelector('.wrongEmail').innerHTML = "Please fill all the fields";
        document.querySelector('.wrongEmail').style.display = "block";
    }else{
        let data = {
            email: emailV,
            password: passwordV,
            fName: fNameV,
            lName: lNameV,
            id: Date.now()
        }
        let users = Object.keys(localStorage);
        let emailExists = users.some(user => {
            let userObj = JSON.parse(localStorage.getItem(user));
            return userObj.email === emailV;
        });
        
        if (emailExists) {
            document.querySelector('.wrongEmail').innerHTML = "This email is already registered";
            document.querySelector('.wrongEmail').style.display = "block";
        } else {
            window.localStorage.setItem(`user_${Date.now()}`, JSON.stringify(data));
            window.localStorage.setItem('user', JSON.stringify(data));
            document.querySelector('.emailIp').value = "";
            document.querySelector('.passIp').value = "";
            document.querySelector('.fName').value = "";
            document.querySelector('.lName').value = "";
            window.localStorage.setItem('doneLogin', 'true');
            document.querySelector('.loginPage').classList.remove("loginActive");
            document.querySelector('.wrongEmail').style.display = "none";
            isLogin();
        }
    }
}

function login(){
    let emailV = document.querySelector('.emailIp').value;
    let passwordV = document.querySelector('.passIp').value;
    if(emailV === "" || passwordV === ""){
        document.querySelector('.wrongEmail').innerHTML = "Please fill all the fields";
        document.querySelector('.wrongEmail').style.display = "block";
    }else{
        let users = Object.keys(localStorage);
        users.forEach(user => {
            let userObj = JSON.parse(localStorage.getItem(user));
            if(userObj.email === emailV && userObj.password === passwordV){
                document.querySelector('.emailIp').value = "";
                document.querySelector('.passIp').value = "";
                window.localStorage.setItem('doneLogin', 'true');
                document.querySelector('.loginPage').classList.remove("loginActive");
                document.querySelector('.wrongEmail').style.display = "none";
                window.localStorage.setItem('user', JSON.stringify(userObj));
                isLogin();
            }else{
                document.querySelector('.wrongEmail').style.display = "block";
                document.querySelector('.wrongEmail').innerHTML = "Email or password is incorrect";
            }
        });
    }
}



function isLogin(){
    if(window.localStorage.getItem('doneLogin') === 'true'){
        document.body.classList.add("doneLogin");
        document.querySelector('.loginBtn').style.display = "none";
        document.querySelector('.profileBtn').style.display = "flex";
        document.querySelector('.profileMenu').style.display = "flex";
        document.querySelector('.profileMenu').classList.remove("profileMenuActive");
        document.querySelector('.loginFirst').style.display = "none";
        document.querySelector('.profileN').innerHTML = window.localStorage.getItem('user') ? JSON.parse(window.localStorage.getItem('user')).fName : "User";
    }else{
        document.body.classList.remove("doneLogin");
        document.querySelector('.loginBtn').style.display = "flex";
        document.querySelector('.profileBtn').style.display = "none";
        document.querySelector('.profileMenu').style.display = "none";
        document.querySelector('.loginFirst').style.display = "flex";
    }
}
isLogin();

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

function openProfileMenu(){
    document.querySelector('.profileMenu').classList.toggle("profileMenuActive");
}
document.querySelector('.profileBtn').addEventListener('click', openProfileMenu);

function closeProfileMenu(){
    document.querySelector('.profileMenu').classList.remove("profileMenuActive");
}
