// Question data
const easyQuestions = [
    { question: "JavaScript is a statically typed language.", answer: false, explanation: "JavaScript is dynamically typed; types are checked at runtime." },
    { question: "In HTML, <p> defines a paragraph.", answer: true, explanation: "<p> is used to mark up a paragraph in HTML." },
    { question: "CSS stands for Cascading Style Sheets.", answer: true, explanation: "CSS is the language used to style HTML documents." },
    { question: "In Python, lists are immutable.", answer: false, explanation: "Python lists are mutable; you can change their contents." },
    { question: "In JavaScript, === checks both value and type equality.", answer: true, explanation: "=== performs a strict comparison without type coercion." },
    { question: "An ID selector in CSS starts with a dot (.), e.g., .container.", answer: false, explanation: "ID selectors in CSS start with #, e.g., #container." },
    {
        "question": "In HTML, &lt;p&gt; defines a paragraph.",
        "answer": true,
        "explanation": "&lt;p&gt; is used to mark up a paragraph in HTML."
    },
    { question: "In Python, indentation determines code blocks.", answer: true, explanation: "Python uses indentation levels to group statements." },
    { question: "JavaScript arrow functions use the 'func' keyword.", answer: false, explanation: "Arrow functions use => syntax, not a keyword like 'func'." },
    { question: "In CSS, margin controls the space outside an element’s border.", answer: true, explanation: "Margin defines the outer space, while padding defines inner space." }
];

const mediumQuestions = [
    {
        question: "Which HTML element is used to create a hyperlink?",
        options: ["&lt;link&gt;", "&lt;a&gt;", "&lt;href&gt;", "&lt;hyper&gt;"],
        answer: "<a>",
        explanation: "The <a> tag defines a hyperlink in HTML."
    },
    {
        question: "In CSS, which property changes text color?",
        options: ["font-style", "color", "text-color", "font-color"],
        answer: "color",
        explanation: "The 'color' property sets the text color."
    },
    { question: "Which method adds an element to the end of a Python list?", options: [".append()", ".push()", ".add()", ".insert()"], answer: ".append()", explanation: "list.append(x) adds x to the end of the list." },
    { question: "In JavaScript, which keyword declares a block-scoped variable?", options: ["var", "let", "const", "both let and const"], answer: "both let and const", explanation: "'let' and 'const' both create block-scoped variables." },
    { question: "Which HTML tag is used to define a table row?", options: ["&lt;rb&gt;", "&lt;td&gt;", "&lt;table&gt;", "&lt;row&gt;"], answer: "<tr>", explanation: "<tr> denotes a table row; <td> denotes a cell." },
    { question: "In CSS Flexbox, which property defines the main axis direction?", options: ["justify-content", "flex-direction", "align-items", "display"], answer: "flex-direction", explanation: "'flex-direction' sets row or column for the main axis." },
    { question: "Which Python keyword is used to handle exceptions?", options: ["try", "catch", "except", "error"], answer: "except", explanation: "In Python you write 'try:' followed by 'except:' to catch errors." },
    { question: "Which JavaScript array method creates a new array with the results of calling a function on every element?", options: [".filter()", ".reduce()", ".map()", ".forEach()"], answer: ".map()", explanation: ".map() returns a new array based on the callback’s return values." },
    { question: "In HTML, which attribute specifies an image’s alternative text?", options: ["alt", "src", "title", "description"], answer: "alt", explanation: "The 'alt' attribute provides alternative text for images." },
    {
        question: "Which CSS selector targets all <li> elements inside a <ul> with class 'menu'?",
        options: [".menu > li", "ul.menu li", "#menu li", "li.menu"],
        answer: "ul.menu li",
        explanation: "ul.menu li selects any li descendant of a ul with class 'menu'."
    }
];

const hardQuestions = [
    { question: "Fill in: In Python, to open a file for writing you use _____ mode.", answer: "w", explanation: "Mode 'w' opens a file for writing, creating or truncating it." },
    {
        "question": "Fill in: The HTML tag to embed a CSS stylesheet is _____.",
        "answer": "&lt;link&gt;",
        "explanation": "&lt;link rel=&quot;stylesheet&quot; href=&quot;...&quot;&gt; includes a CSS file."
    },
    { question: "Fill in: In CSS, to make an element’s width 50% of its parent, use width: ____;", answer: "50%", explanation: "Setting width: 50% makes it half the width of its container." },
    { question: "Fill in: In JavaScript, to add an event listener you call element._____(\"click\", handler).", answer: "addEventListener", explanation: "addEventListener(\"click\", ...) attaches a click handler." },
    { question: "Fill in: In Python, list comprehension syntax uses [expression _ for _ in _], where '_' is the ____.", answer: "iterator", explanation: "The 'for item in iterable' part loops over an iterable." },
    { question: "Fill in: In HTML5, the semantic tag for navigation links is _____.", answer: "<nav>", explanation: "<nav> defines a section intended for site navigation." },
    { question: "Fill in: In CSS Grid, to make a grid of three equal columns, use grid-template-columns: ____;", answer: "1fr 1fr 1fr", explanation: "Each '1fr' creates one fractional unit, dividing space equally." },
    { question: "Fill in: In JavaScript ES6, to import default export from 'module.js', use 'import _____ from \"module.js\";'.", answer: "name", explanation: "You write 'import name from \"module.js\";' where 'name' is the local binding." },
    { question: "Fill in: In Python, to create a virtual environment you run python -m _____ venv.", answer: "venv", explanation: "The venv module creates isolated virtual environments." },
    { question: "Fill in: In HTML, the attribute to make an input field required is _____.", answer: "required", explanation: "Adding 'required' to <input> forces the user to fill it before submission." }
];

let questionList = [];
let currentIndex = 0;
let score = 0;
let mode = "easy";
let nameUser = "";
let misses = [];
let count = 1;

const nextBtn = document.getElementById("next-btn");

// This function will give us the query parameters
// name of the person taking the quiz => username
// the mode of the quiz => mode

function getQueryParams() {
    const p = new URLSearchParams(window.location.search);
    mode = p.get("mode") || "easy";
    nameUser = p.get("username") || "Anonymous";
}

// Load questions & flag types
function loadQuestions() {
    if (mode === "easy") questionList = easyQuestions.map(q => ({ ...q, type: "tf" }));
    else if (mode === "medium") questionList = mediumQuestions.map(q => ({ ...q, type: "mc" }));
    else questionList = hardQuestions.map(q => ({ ...q, type: "fi" }));
}

// Show current question
function showQuestion() {
    const q = questionList[currentIndex];
    document.getElementById("counter").innerText =
        `Question ${count} of ${questionList.length}`;
    document.getElementById("question").innerText = q.question;

    const opts = document.getElementById("options");
    opts.innerHTML = "";
    nextBtn.style.display = q.type === "tf" ? "none" : "block";
    nextBtn.disabled = true;

    if (q.type === "tf") {
        ["True", "False"].forEach(txt => {
            const b = document.createElement("button");
            b.textContent = txt;
            b.onclick = () => {
                const ans = (txt === "True");
                if (ans === q.answer) score++;
                else misses.push({ ...q, user: ans });
                nextQuestion();
            };
            opts.appendChild(b);
        });
    }
    else if (q.type === "mc") {
        q.options.forEach(opt => {
            const lbl = document.createElement("label");
            lbl.innerHTML = `<input type="radio" name="mc" value="${opt}"> ${opt}`;
            lbl.querySelector("input").onchange = () => nextBtn.disabled = false;
            opts.appendChild(lbl);
        });
    }
    else {
        const inp = document.createElement("input");
        inp.type = "text";
        inp.id = "fill";
        inp.placeholder = "Your answer";
        inp.oninput = () => nextBtn.disabled = inp.value.trim() === "";
        opts.appendChild(inp);
    }
}

function nextQuestion() {
    const q = questionList[currentIndex];
    if (q.type === "mc") {
        const selected = document.querySelector('input[name="mc"]:checked');
        const sel = selected ? selected.value : "";
        if (sel === q.answer) score++;
        else misses.push({ ...q, user: sel });
    } else if (q.type === "fi") {
        const val = document.getElementById("fill").value.trim();
        if (val.toLowerCase() === q.answer.toLowerCase()) score++;
        else misses.push({ ...q, user: val });
    }

    currentIndex++;
    count++;
    if (currentIndex < questionList.length) showQuestion();
    else finishQuiz();
}


// Show results
function finishQuiz() {
    const box = document.getElementById("quiz-box");
    const total = questionList.length;

    // Get stored high score
    const storedHigh = parseInt(localStorage.getItem("quizHighscore") || "0", 10);
    const storedName = localStorage.getItem("quizHighscoreName") || "—";

    // Build score message
    let message = `Hello ${nameUser}, you scored ${score}/${total}. `;
    if (score > storedHigh) {
        localStorage.setItem("quizHighscore", score);
        localStorage.setItem("quizHighscoreName", nameUser);
        message += `🎉 New high score!`;
    } else {
        message += `High score: ${storedHigh} by ${storedName}.`;
    }

    // Start HTML
    let html = `<h2>${message}</h2>`;

    // Missed questions
    if (misses.length) {
        html += "<h3>❌Missed:</h3><ul>";
        misses.forEach(m => {
            html += `<li>
                        <b>Q:</b> ${m.question}<br>
                        <b>Your:</b> ${m.user}<br>
                        <b>Ans:</b> ${m.answer}<br>
                        <b>Why:</b> ${m.explanation}
                     </li>`;
        });
        html += "</ul>";
    }

    // End buttons
    html += `
      <div class="quiz-end-buttons">
        <button onclick="location.reload()">🔁 Try Again</button>
        <button onclick="window.location.href='../home/index.html'">🏠 Go Home</button>
      </div>
    `;

    box.innerHTML = html;
}

function toggleTheme() {
    document.body.classList.toggle("light-theme");
}

window.onload = () => {
    getQueryParams();
    loadQuestions();
    showQuestion();
};
