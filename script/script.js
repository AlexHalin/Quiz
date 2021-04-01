class Quiz {
    currentDate = new Date();
    date = 0;

    answersEls = document.querySelectorAll(".answer");
    quiz = document.querySelector("#quiz");
    questionEl = document.querySelector('#question');
    a_text = document.querySelector('#a_text');
    b_text = document.querySelector('#b_text');
    c_text = document.querySelector('#c_text');
    d_text = document.querySelector('#d_text');
    submitBtn = document.querySelector('#submit');

    currentQuiz = 0;
    score = 0;

    month = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    monthFunc(num) {

        if (this.currentDate.getMonth() >= 0 && this.currentDate.getMonth() <= 6) {
            let n = this.month[this.currentDate.getMonth() + num];
            return n;
        } else if (this.currentDate.getMonth() < 11){
            let n = this.month[this.currentDate.getMonth() - num];
            return n;
        }
    }

    randomDate(max) {
        return this.date = [Math.floor(Math.random() * max)];
    }

    dateFunk() {
        this.randomDate(31)
        if (this.date == 0) {
            this.dateFunk();
        } else if (this.date == this.currentDate.getDate()) {
            this.dateFunk();
        }
        return this.date;
    }

    dayV = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    dayFunc(num) {

        if (this.currentDate.getDay() >= 0 && this.currentDate.getDay() <= 3) {
            let n = this.dayV[this.currentDate.getDay() + num];
            return n;
        } else if (this.currentDate.getDay() <= 6){
            let n = this.dayV[this.currentDate.getDay() - num];
            return n;
        }

    }

    timeFunc(timeEl) {
        if (timeEl == 0) {
            return `${this.formatTime(this.currentDate.getHours())}:${this.formatTime(this.currentDate.getMinutes())}`
        } else if (this.currentDate.getHours() >= 0 && this.currentDate.getHours() <= 11){
            return `${this.formatTime(this.currentDate.getHours()) + timeEl}:${this.formatTime(this.currentDate.getMinutes())}`
        } else if (this.currentDate.getHours() <= 23){
            return `${this.formatTime(this.currentDate.getHours()) - timeEl}:${this.formatTime(this.currentDate.getMinutes())}`
        }

    }

    formatTime(time) {
        return time < 10 ? (`0${time}`) : time;
    }

    quizDate = [
        {
            question: 'What year is it now?',
            a: '2019',
            b: '1987',
            c: this.currentDate.getFullYear(),
            d: '2007',
            correct: 'c'
        },

        {
            question: 'What month is it now?',
            a: this.monthFunc(0),
            b: this.monthFunc(2),
            c: this.monthFunc(1),
            d: this.monthFunc(4),
            correct: 'a'
        },


        {
            question: 'What date is it now?',
            a: this.dateFunk(),
            b: this.currentDate.getDate(),
            c: this.dateFunk(),
            d: this.dateFunk(),
            correct: 'b'
        },

        {
            question: 'What day is it now?',
            a: this.dayV[this.currentDate.getDay()],
            b: this.dayFunc(1),
            c: this.dayFunc(3),
            d: this.dayFunc(2),
            correct: 'a'
        },

        {
            question: 'What time is it now?',
            a: this.timeFunc(3),
            b: this.timeFunc(2),
            c: this.timeFunc(5),
            d: this.timeFunc(0),
            correct: 'd'
        }
    ]

    loadQuiz() {
        this.deselectAnswers()
        this.listenerAnswer()
        const currentQuizData = this.quizDate[this.currentQuiz]
        this.questionEl.innerText = currentQuizData.question
        this.a_text.innerText = currentQuizData.a;
        this.b_text.innerText = currentQuizData.b;
        this.c_text.innerText = currentQuizData.c;
        this.d_text.innerText = currentQuizData.d;
    }

    getSelected() {
        let answer = undefined;

        this.answersEls.forEach((answerEl) => {
            if (answerEl.checked) {
                answer = answerEl.id;
            }
        });

        return answer
    }

    deselectAnswers() {
        this.answersEls.forEach((answerEl) => {
            answerEl.checked = false;
        });

    }

    listenerAnswer() {
        this.submitBtn.addEventListener('click', () => {
            const answer = this.getSelected();

            if (answer) {
                if (answer === this.quizDate[this.currentQuiz].correct) {
                    this.score++;
                }
                this.currentQuiz++;
                if (this.currentQuiz < this.quizDate.length) {
                    this.loadQuiz();
                } else {
                    this.quiz.innerHTML = `<h2 class="results">You answered correctly at ${this.score}/${this.quizDate.length} questions.</h2> 
                                           <button class="results_btn" onclick="location.reload()">Reload</button>`
                }
            }

        })
    }
}

let quizApp = new Quiz()
quizApp.loadQuiz()
