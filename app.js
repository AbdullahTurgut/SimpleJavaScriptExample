function Question(text,choices,answer){
    this.text = text;
    this.choices = choices;
    this.answer = answer;
}

//Question prototype

Question.prototype.checkAnswer = function(answer){
    return this.answer === answer;//tip kontrolü içinde 3 tane eşittir kullandık
}

// Quiz Constructor

function Quiz(questions){
    this.questions = questions;
    this.score = 0;
    this.questionIndex = 0;
}

// Quiz Prototype

Quiz.prototype.getQuestion = function(){
    return this.questions[this.questionIndex];
}

// Quiz isFinish
Quiz.prototype.isFinish = function(){
    return this.questions.length === this.questionIndex;
}

// Quiz guess
Quiz.prototype.guess= function(answer){
    var question = this.getQuestion(); 
    
    if(question.checkAnswer(answer)){
        this.score++;
    }

    this.questionIndex++;
}

var q1 = new Question("what's the best programming language?",["C#","javascript","pyhton","asp.net"],"javascript");

var q2 = new Question("what's the most popular programming language?",["C#","visual basic","node.js","javascript"], "javascript");

var q3 = new Question("what's the best modern programming language?",["C#","pyhton","asp.net","javascript"], "javascript");



var questions = [q1,q2,q3];



// Start Quiz

var quiz = new Quiz(questions);

loadQuestion();


function loadQuestion(){
    if(quiz.isFinish()){
        ShowScore();
    }else{
        var question = quiz.getQuestion();//spruları bu şekilde ön yüzde göstericez
        var choices = question.choices;
        //console.log(choices);
        document.querySelector('#question').textContent = question.text;//burda # olarak yazdığımızda id olarak seçmiş olucaz

        for(var i=0 ; i<choices.length ; i++){
            var element = document.querySelector('#choice'+i);//burdada cevapları butonlara atadık
            //4 tane cevap için 4 buton yaptık fordaki i değerini '#choice'+i şekilde butonlara verdik
            element.innerHTML = choices[i];//cevapları butonların içine string şeklinde yazdırdık
           
            //burda tabi birde her bir buton için bir click olayı gerçekleştirmemiz gerekiyor 
            guess('btn'+i,choices[i]); //mesela buton 1 için c# gibi guess e gidicek
            
            //console.log(choices[i]);
        }

        showProgress();
    }

}

function guess(id,guess){
    var btn = document.getElementById(id);
    btn.onclick = function(){
        quiz.guess(guess);//aldığımız cevabı gönderdik.
        //bir sonraki question için tekrar loadQuestion'ı çalıştıralım
        loadQuestion();
    }
}


function ShowScore(){
    var html = `<h2>Score : </h2><h4>${quiz.score}</h4>`;

    document.querySelector('.card-body').innerHTML = html;
    //yukarıda yaptığımız index.html de card-body olan kısmımızı score bilgisiyle değiştirmek oldu

}

function showProgress(){
    var totalQuestion = quiz.questions.length;
    var questionNumber = quiz.questionIndex +1 ;//+1 olması örneğin 0 sa 1 olsun diye o anki soru
    //örneğin burda soru sayısını yazdırıcaz 
    document.querySelector('#progress').innerHTML= 'Question ' + questionNumber + ' of ' + totalQuestion;
}

















// console.log(quiz.isFinish());//henüz ilk aşamada quizimiz bitmediği için false döndürdü

// console.log(quiz.getQuestion());//burda çağırdığımız 1.soru
// quiz.guess('javascript');

// console.log(quiz.getQuestion());//2.soru
// quiz.guess('pyhton');

// console.log(quiz.getQuestion());//3.soru
// quiz.guess('javascript');

// //Note : 4.bir soru oluşturup 3 soru ve cevap veridiğimiz de sondaki isFinish'in true değil false 
// //olduğunu göreceğiz
// console.log(quiz.score);//2 soruyu doğru bildiğimiz için score'u 2 olarak yazdı
// console.log(quiz.isFinish());//Son aşamada bittiği için true döndürcek












// console.log(q1.checkAnswer('c#'));//mesela burda false verdi
// console.log(q1.checkAnswer('javascript'));//burda da true verdi

// console.log(q2.checkAnswer('visual basic'));//burda da cevap javascript'di o yüzden false