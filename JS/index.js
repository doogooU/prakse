
let windowHeight = window.outerHeight
window.addEventListener("resize", () => {
    windowHeight = window.outerHeight;
});

let imgDensity = 25; // how many imgs
let imgCount = 0; // current img counter

function randomIntPicker(max, offset = 0) {
    return Math.floor(Math.random() * max) + offset;
}
function randomFloatPicker(max, offset = 0) {
    return Math.floor(Math.random() * max) + offset;
}
const imgSrc = ["../IMG/normalCross.png", "../IMG/redUpsideDownCross.png"];
function imgConstructor (isDevil) {
    let srcPicker = randomIntPicker(2); //0 or 1

    const newImg = document.createElement("img");
    newImg.src = imgSrc[srcPicker];
    newImg.classList.add("spawnedImg");
    newImg.style.right = `${randomIntPicker(96, 5)}%`;
    document.querySelector("body").appendChild(newImg);
    newImg.style.animation = `fallingImgAnim ${randomFloatPicker(10, 1)}s linear infinite`;
    newImg.alt = " ";
}

for (let i = 0; i < 30; i++) { // create 30 imges
    const newImg = new imgConstructor();    
}
//  ** TYPEWRITER
let typewriterSpeed = [10, 200]; // speed (time) in ms
function typewriter(obj, objChangeToText, currText, placeholder, isButton = false) {
    console.log("contains class question: " + obj.classList.contains("question"));
    if (currText.length !== 0 && !isButton) {
        currText = currText.slice(0,-1);
        obj.innerHTML = currText;
    } else if (currText.length !== 0 && isButton) {
        currText = currText.slice(0,-1);
        obj.innerHTML = currText;
    } else {
        placeholder += objChangeToText.charAt(0);
        objChangeToText = objChangeToText.slice(1);
        obj.innerHTML = placeholder;
        if (objChangeToText.length === 0) return;
    }
    let typewriterIndex = (obj.classList.contains("question")) ? 0 : 1;
        setTimeout(() => {
            typewriter(obj, objChangeToText, currText, placeholder);
        }, typewriterSpeed[typewriterIndex]);
}

let textSource = []; // 0 is header, 1 btn left, 2 btn right
const textClasses = document.querySelectorAll(".getText");
textClasses.forEach((e, i) => {
    setTimeout(() => {
        typewriter(e, e.dataset.text, e.innerHTML, "", true);
    }, 1000);
});


// ** QUIZ
[
  { page: 1, answer: "Devil" },
  { page: 1, answer: "God" },

  { page: 2, answer: "Yes" },
  { page: 2, answer: "No" },

  { page: 3, answer: "Embrace it" },
  { page: 3, answer: "Run" },

  { page: 4, answer: "Yes" },
  { page: 4, answer: "No" },

  { page: 5, answer: "Yes" },
  { page: 5, answer: "No" },
  
  { page: 6, answer: "Investigate" },
  { page: 6, answer: "Isn't real" },

  { page: 7, answer: "Yes" },
  { page: 7, answer: "No" },

  { page: 8, answer: "Follow it" },
  { page: 8, answer: "Run away" },

  { page: 9, answer: "Yes" },
  { page: 9, answer: "No" },

  { page: 10, answer: "Yes" },
  { page: 10, answer: "No" }
]




let answers = JSON.parse(localStorage.getItem('quizAnswers')) || []; //holds every answer per page (which btn was picked)
function filterAnswers(ans, pageIndex, color) {

    const exists = answers.some(entry => entry.page === pageIndex);

    if (!exists) {
        answers.push({ page: pageIndex, answer: ans, color: color});
        localStorage.setItem('quizAnswers', JSON.stringify(answers));
    }
    // }
}
console.log('Answers:', answers);

const resultParagraph = document.querySelector("p");
const resultArea = document.querySelector("body");
let color = 0; // holds dark vs light tokens, light = 0, dark = 1

function result() {
    answers.forEach(answer => {
        color += answer.color;
        resultParagraph.innerHTML += answer.answer + "    " + answer.color + "             ";
    });
    resultParagraph.innerHTML += "\n" + color;
    resultParagraph.innerHTML = (color === 0)
    ? "You stand at the crossroads of light and darkness. Neither fully believer nor complete skeptic, you walk the thin veil between the known and unknown. You're cautious, curious, and maybe even a little dangerous. Spirits may whisper to you, but you also carry your own light. You don’t fear the dark—but you respect it."
    : (color > 0) ? "You believe in the good beyond the veil—divine protection, hope, and higher meaning. While you may fear what lurks in the shadows, you put your faith in the light. You resist the pull of the unknown unless absolutely necessary. Ghost stories may chill your bones, but your soul stays anchored."
    : "You aren’t afraid of the dark—in fact, you're drawn to it. Haunted houses, strange symbols, whispers in dreams—these are invitations to you. Whether from skepticism or fascination, you delve where others would flee. The line between thrill and danger? You crossed it already."

    if (color > 0) {
        resultArea.style.backgroundColor = "#efefef";
        resultParagraph.style.color = "#202020";

    } else if (color < 0) {
        resultArea.style.backgroundColor = "#101010";
        resultParagraph.style.color = "rgb(128, 33, 33)";

    } else {
        resultArea.style.backgroundColor = "#343832";
        resultParagraph.style.color = "#969696";

    }
    resetQuiz();
}

function  resetQuiz() {
    localStorage.removeItem('quizAnswers');
}