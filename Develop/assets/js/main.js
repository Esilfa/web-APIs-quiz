// Questions

var questions = [
    {
        title: "What is the head tag for?",
        choices: ["It makes important text like headline standout", "It defines the title for a webpage",
            "It’s a container for information about a webpage", "It tells the web browser which version of the HTML a webpage uses"],
        answer: "It’s a container for information about a webpage"
    },
    {
        title: "What happens when there’s no doctype in a webpage?",
        choices: ["The web browser will quit", "The web browser has to guess the HTML version"],
        answer: "The web browser has to guess the HTML version"
    },
    {
        title: "Arrays can be used to store ____.",
        choices: ["numbers and strings", "other arrays", "booleans", "all of the above"],
        answer: "all of the above"
    },
    {
        title: "What is the tag used for breaking the line",
        choices: ["<b></b>", "<br>", "<em></em>", "<mark></mark>"],
        answer: "<br>"

    }];
var score = 0;
var questionIndex = 0;


var currentTime = document.querySelector("#currentTime");
var timer = document.querySelector("#startTime");
var questionsDiv = document.querySelector("#questionsDiv");
var wrapper = document.querySelector("#wrapper");

// contdown
var secondsLeft = 76;
var holdInterval = 0;
var penalty = 10;
var ulCreate = document.createElement("ul");

// Triggers button
timer.addEventListener("click", function () {

    if (holdInterval === 0) {
        holdInterval = setInterval(function () {
            secondsLeft--;
            currentTime.textContent = "Time: " + secondsLeft;
            if (secondsLeft <= 0) {
                clearInterval(holdInterval);
                allDone();
                currentTime.textContent = "Time's up!";
            }
        }, 1000);
    }
    render(questionIndex);
});

            function render(questionIndex) {

                questions.innerHTML = "";
                ulCreate.innerHTML = "";
                // For loops to loop array
                for (var i = 0; i < questions.length; i++) {

                    var userQuestion = questions[questionIndex].title;
                    var userChoices = questions[questionIndex].choices;
                    questions.textContent = userQuestion;
                }
                // Questions 
                userChoices.forEach(function (newItem) {
                    var listItem = document.createElement("li");
                    listItem.textContent = newItem;
                    questions.appendChild(ulCreate);
                    ulCreate.appendChild(listItem);
                    listItem.addEventListener("click", (compare));
                })
            }
            function compare(event) {
                var element = event.target;
                console.log(event.target);

                if (element.matches("ul")) {

                    var createDiv = document.createElement("div");
                    createDiv.setAttribute("id", "createDiv");
                     
                    if (element.textContent == questions[questionIndex].answer) {
                        score++;
                        createDiv.textContent = "Correct! The answer is:  " + questions[questionIndex].answer;
                        // Correct condition 
                    } else {
                        secondsLeft = secondsLeft - penalty;
                        createDiv.textContent = "Wrong! The correct answer is:  " + questions[questionIndex].answer;
                    }
                }

                questionsIndex++;

                if (questionsIndex >= questions.length) {
                    allDone();
                    createDiv.textContent = "End of quiz!" + " " + "You got  " + score + "/" + questions.length + " Correct!";
                } else {
                    render(questionsIndex);
                }
                questionsDiv.appendChild(createDiv);
            }
        
function render(questionsIndex) {

    questionsDiv.innerHTML = "";
    ulCreate.innerHTML = "";
    // For loops to loop through all info in array
    for (var i = 0; i < questions.length; i++) {
        // Appends question title only
        var userQuestion = questions[questionsIndex].title;
        var userChoices = questions[questionsIndex].choices;
        questionsDiv.textContent = userQuestion;
    }
    // New for each for question choices
    userChoices.forEach(function (newItem) {
        var listItem = document.createElement("li");
        listItem.textContent = newItem;
        questionsDiv.appendChild(ulCreate);
        ulCreate.appendChild(listItem);
        listItem.addEventListener("click", (compare));
    })
}
// Event to compare choices with answer
function compare(event) {
    var element = event.target;

    if (element.matches("li")) {

        var createDiv = document.createElement("div");
        createDiv.setAttribute("id", "createDiv");
        
        if (element.textContent == questions[questionIndex].answer) {
            score++;
            createDiv.textContent = "Correct! The answer is:  " + questions[questionIndex].answer;
            
        } else {
            // Will deduct -5 seconds off secondsLeft for wrong answers
            secondsLeft = secondsLeft - penalty;
            createDiv.textContent = "Wrong! The correct answer is:  " + questions[questionIndex].answer;
        }

    }
    // Question Index determines number question user is on
    questionIndex++;

    if (questionIndex >= questions.length) {
        // All done will append last page with user stats
        allDone();
        createDiv.textContent = "End of quiz!" + " " + "You got  " + score + "/" + questions.length + " Correct!";
    } else {
        render(questionIndex);
    }
    questionsDiv.appendChild(createDiv);

}
// All done will append last page
function allDone() {
    questionsDiv.innerHTML = "";
    currentTime.innerHTML = "";

    // Heading:
    var createH1 = document.createElement("h1");
    createH1.setAttribute("id", "createH1");
    createH1.textContent = "All Done!"

    questionsDiv.appendChild(createH1);


    // Calculates time remaining and replaces it with score
    if (secondsLeft >= 0) {
        var timeRemaining = secondsLeft;
        clearInterval(holdInterval);
        var createP = document.createElement("h1");
    createP.setAttribute("id", "createH1");
            createP.textContent = "Your final score is: " + timeRemaining;

        questionsDiv.appendChild(createP);
    }

    // Label
    var createLabel = document.createElement("label");
    createLabel.setAttribute("id", "createLabel");
    createLabel.textContent = "Enter your initials: ";

    questionsDiv.appendChild(createLabel);

    // input
    var createInput = document.createElement("input");
    createInput.setAttribute("type", "text");
    createInput.setAttribute("id", "initials");
    createInput.textContent = "";

    questionsDiv.appendChild(createInput);

    // submit
    var createSubmit = document.createElement("button");
    createSubmit.setAttribute("type", "submit");
    createSubmit.setAttribute("id", "Submit");
    createSubmit.textContent = "Submit";

    questionsDiv.appendChild(createSubmit);

    // Event listener to capture initials and local storage for initials and score
    createSubmit.addEventListener("click", function () {
        var initials = createInput.value;

        if (initials === null) {

            console.log("No value entered!");

        } else {
            var finalScore = {
                initials: initials,
                score: timeRemaining
            }
            console.log(finalScore);
            var allScores = localStorage.getItem("allScores");
            if (allScores === null) {
                allScores = [];
            } else {
                allScores = JSON.parse(allScores);
            }
            allScores.push(finalScore);
            var newScore = JSON.stringify(allScores);
            localStorage.setItem("allScores", newScore);
            // Travels to final page
            // window.location.replace("./HighScores.html");
        }
    });
}

