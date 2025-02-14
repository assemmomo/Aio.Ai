// async function generateText(prompt) {
//     const response = await fetch('https://api.openai.com/v1/completions', {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json',
//             'Authorization': 'API KEY'
//         },
//         body: JSON.stringify({
//             model: 'text-davinci-003',
//             prompt: prompt,
//             max_tokens: 200,
//             temperature: 0.7,
//         }),
//     });

//     if (!response.ok) {
//         const errorMessage = `Error: ${response.status} ${response.statusText}`;
//         console.error(errorMessage);
//         return `Sorry, there was an error: ${errorMessage}`;
//     }

//     const data = await response.json();
//     if (!data.choices || !data.choices.length) {
//         console.error('No choices found in the response.');
//         return 'No response from AI.';
//     }

//     return data.choices[0].text.trim();
// }


// // التحكم في الـ input والـ output في الموقع
// document.querySelector('.chatInput').addEventListener('keypress', async function (e) {
//     if (e.key === 'Enter') {
//         const userInput = e.target.value;
//         e.target.value = ''; // تفريغ الـ input بعد الضغط على Enter
        
//         // عرض سؤال المستخدم في منطقة الـ chat
//         const userMessage = document.createElement('p');
//         userMessage.classList.add('userP');
//         userMessage.textContent = userInput;
//         document.querySelector('.chatArea').appendChild(userMessage);

//         // جلب الرد من ChatGPT
//         const aiResponse = await generateText(userInput);

//         // عرض رد ChatGPT في منطقة الـ chat
//         const aiMessage = document.createElement('p');
//         aiMessage.classList.add('aiP');
//         aiMessage.textContent = aiResponse;
//         document.querySelector('.chatArea').appendChild(aiMessage);
//     }
// });

// الحصول على عناصر الصفحة
// const chatInput = document.querySelector('.chatInput');
// const chatArea = document.querySelector('.chatArea');

// // مفتاح API من Hugging Face (بدله بمفتاحك الخاص)
// const apiKey = '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';

// // دالة لإرسال الرسالة للـ API واستقبال الرد
// async function sendMessageToAI(message) {
//     const url = 'https://api-inference.huggingface.co/models/facebook/blenderbot-1B-distill';

//     try {
//         const response = await fetch(url, {
//             method: 'POST',
//             headers: {
//                 'Authorization': `Bearer ${apiKey}`,
//                 'Content-Type': 'application/json',
//             },
//             body: JSON.stringify({ inputs: message }),
//         });

//         const data = await response.json();
//         if (data && data.generated_text) {
//             return data.generated_text.trim();
//         } else {
//             return 'Sorry, I didn\'t understand that.';
//         }
//     } catch (error) {
//         console.error('Error:', error);
//         return 'An error occurred while communicating with the AI.';
//     }
// }

// // دالة لإضافة الرسائل إلى منطقة المحادثة
// function addMessageToChat(role, message) {
//     const p = document.createElement('p');
//     p.className = role === 'user' ? 'userP' : 'aiP';
//     p.textContent = message;
//     chatArea.appendChild(p);

//     // تحريك منطقة المحادثة للأسفل لعرض الرسالة الجديدة
//     chatArea.scrollTop = chatArea.scrollHeight;
// }

// حدث الإدخال عند الضغط على Enter



async function sendMessage() {
    let userInput = document.querySelector('.chatInput').value;
    if (!userInput) return;

    let chatBox = document.querySelector('.chatArea');
    chatBox.innerHTML += `<p class="userP"><span style="color:blue;">- </span> ${userInput}</p>`;

    document.querySelector('.chatInput').value = '';
    chatBox.querySelector("h3").style.display = "none";

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

    chatBox.innerHTML += `<p class="aiP"><span style="color:red;">- </span>${botReply}</p>`;
    chatBox.scrollTop = chatBox.scrollHeight;
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

function signup(){
    document.querySelector('.loginForm').style.marginLeft="-50%";
    document.querySelector('.loginTxt').style.right="-50%";
    document.querySelector('.signInBtn').classList.remove("signActive");
    document.querySelector('.signUpBtn').classList.add("signActive");
    document.querySelector('.signH2').textContent="Sign Up";
    document.querySelector('.signBtn').innerHTML="Sign Up";
    document.querySelector('.loginTxt h1').innerHTML="Join us and start chatting with our AI";
    document.querySelector('.loginTxt h1').style.fontSize="45px";
}
function signin(){
    document.querySelector('.loginForm').style.marginLeft="0";
    document.querySelector('.loginTxt').style.right="0";
    document.querySelector('.signInBtn').classList.add("signActive");
    document.querySelector('.signUpBtn').classList.remove("signActive");
    document.querySelector('.signBtn').innerHTML="Sign In";
    document.querySelector('.signH2').textContent="Sign In";
    document.querySelector('.loginTxt h1').innerHTML="Welcome back !";
    document.querySelector('.loginTxt h1').style.fontSize="70px";
}
