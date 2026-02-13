document.addEventListener('DOMContentLoaded', function () {
    const btnF = document.querySelector(".btnF");
    const btnB = document.querySelector(".btnB");
    const container = document.querySelector(".container");
    const container1 = document.querySelector(".container1");
    const quizBox = document.querySelector(".question_text");
    const btnPrev = document.querySelector(".btn1");
    const btnAnswer = document.querySelector(".btn2");
    const btnNext = document.querySelector(".btn3");
    const ansDiv = document.querySelector(".ans_div");
    const ansText = ansDiv.querySelector("p");
    const cross = document.querySelector(".bi");
    const btnShuffle = document.querySelector(".btn4");

    let currentQuestions = [];
    let currentIndex = 0;

    function showQuestion() {
        const currentQ = currentQuestions[currentIndex];
        quizBox.textContent = `Q${currentIndex + 1}. ${currentQ.question}`;
        ansText.textContent = "Answer: " + currentQ.answer;
        ansDiv.style.display = "none";
        btnAnswer.textContent = "Show Answer";
    }

    fetch('Question.json')
        .then(response => response.json())
        .then(data => {

            btnF.addEventListener("click", function () {
                container.style.display = "none";
                container1.style.display = "flex";
                currentQuestions = data.frontend;
                currentIndex = 0;
                showQuestion();
            });

            btnB.addEventListener("click", function () {
                container.style.display = "none";
                container1.style.display = "flex";
                currentQuestions = data.backend;
                currentIndex = 0;
                showQuestion();
            });

            btnAnswer.addEventListener("click", function () {
                if (ansDiv.style.display === "none") {
                    ansDiv.style.display = "flex";
                    btnAnswer.textContent = "Hide Answer";
                } else {
                    ansDiv.style.display = "none";
                    btnAnswer.textContent = "Show Answer";
                }
            });

            btnNext.addEventListener("click", function () {
                currentIndex = (currentIndex + 1) % currentQuestions.length;
                showQuestion();
            });

            btnPrev.addEventListener("click", function () {
                currentIndex =
                    (currentIndex - 1 + currentQuestions.length) % currentQuestions.length;
                showQuestion();
            });

            btnShuffle.addEventListener("click", function () {
                currentIndex = Math.floor(Math.random() * currentQuestions.length);
                showQuestion();
            });

            cross.addEventListener("click", function () {
                container1.style.display = "none";
                container.style.display = "flex";
            });

        })
        .catch(error => console.error("Error loading JSON:", error));
});
