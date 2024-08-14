// const OpenAI = require('openai');

// const openai = new OpenAI({
//     apiKey:'sk-I1jsnRy2EK-jYO2ahcXP2b9V981yLEI7fQmJh_5VhWT3BlbkFJRSj_mWty8XsuS-IyThx_A3d8LMAQ09_6Ki0NQGA6gA',
// });

// async function generateText(prompt) {
//     const response = await openai.createCompletion({
//         engine:'text-davinci-003',
//         prompt,
//         max_tokens:200,
//         n:1,
//         stop:null,
//         temperature:0.7,
//     });
//     return response.data.choices[0].text.trim();
// }

// generateText("are you dog ?").then(text => console.log(text)).catch(error => console.error(error));




// const OpenAI = require('openai');

// const openai = new OpenAI({
//     apiKey: 'sk-I1jsnRy2EK-jYO2ahcXP2b9V981yLEI7fQmJh_5VhWT3BlbkFJRSj_mWty8XsuS-IyThx_A3d8LMAQ09_6Ki0NQGA6gA',
// });

// async function generateText(prompt) {
//     const response = await openai.createCompletion({
//         engine: 'text-davinci-003',
//         prompt: prompt,
//         max_tokens: 200,
//         n: 1,
//         stop: null,
//         temperature: 0.7,
//     });
//     return response.data.choices[0].text.trim();
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



async function generateText(prompt) {
    const response = await fetch('https://api.openai.com/v1/completions', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': '/'
        },
        body: JSON.stringify({
            model: 'text-davinci-003',
            prompt: prompt,
            max_tokens: 200,
            temperature: 0.7,
        }),
    });

    if (!response.ok) {
        const errorMessage = `Error: ${response.status} ${response.statusText}`;
        console.error(errorMessage);
        return `Sorry, there was an error: ${errorMessage}`;
    }

    const data = await response.json();
    if (!data.choices || !data.choices.length) {
        console.error('No choices found in the response.');
        return 'No response from AI.';
    }

    return data.choices[0].text.trim();
}


// التحكم في الـ input والـ output في الموقع
document.querySelector('.chatInput').addEventListener('keypress', async function (e) {
    if (e.key === 'Enter') {
        const userInput = e.target.value;
        e.target.value = ''; // تفريغ الـ input بعد الضغط على Enter
        
        // عرض سؤال المستخدم في منطقة الـ chat
        const userMessage = document.createElement('p');
        userMessage.classList.add('userP');
        userMessage.textContent = userInput;
        document.querySelector('.chatArea').appendChild(userMessage);

        // جلب الرد من ChatGPT
        const aiResponse = await generateText(userInput);

        // عرض رد ChatGPT في منطقة الـ chat
        const aiMessage = document.createElement('p');
        aiMessage.classList.add('aiP');
        aiMessage.textContent = aiResponse;
        document.querySelector('.chatArea').appendChild(aiMessage);
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
        for (const element of imgs) {
            element.style.marginTop = "0px";
        }
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