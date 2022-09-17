let app = require('express')()
let bodyParser = require('body-parser')
let cors = require('cors');

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(cors())

app.post('/user/register', (request, response) => {
    let Models = require('./models/Models')
    Models.register(request.body.username, request.body.password, function(id) {
        response.json(id)
    })
});
app.post('/user/login', (request, response) => {
    let Models = require('./models/Models')
    Models.login(request.body.username, request.body.password, function(id) {
        response.json(id)
    })
});
app.get('/quiz/categories', (request, response) => {
    let Models = require('./models/Models')
    Models.categories(function(categories) {
        response.json(categories)
    })
});
app.get('/quiz/all', (request, response) => {
    let Models = require('./models/Models')
    Models.quizAll(function(data) {
        response.json(data)
    })
});
app.get('/quiz/by-category/:category', (request, response) => {
    let Models = require('./models/Models')
    Models.quizByCategory(request.params.category, function(data) {
        response.json(data)
    })
});
app.get('/quiz/my-quiz/:user', (request, response) => {
    let Models = require('./models/Models')
    Models.quizByUser(request.params.user, function(data) {
        response.json(data)
    });
});
app.post('/quiz/add', (request, response) => {
    let Models = require('./models/Models')
    Models.quizAdd(request.body.user, request.body.category, request.body.title, request.body.time)
    response.sendStatus(200)
});
app.post('/quiz/update/:id', (request, response) => {
    let Models = require('./models/Models')
    Models.quizUpdate(request.params.id, request.body.category, request.body.title, request.body.time)
    response.sendStatus(200)
});
app.get('/quiz/delete/:id', (request, response) => {
    let Models = require('./models/Models')
    Models.quizDelete(request.params.id)
    response.sendStatus(200)
});
app.get('/quiz/get/:id', (request, response) => {
    let Models = require('./models/Models')
    Models.quizGet(request.params.id, function(data) {
        response.send(data)
    })
});
app.get('/quiz/nbre-question/:id', (request, response) => {
    let Models = require('./models/Models')
    Models.quizGetNbreQuestion(request.params.id, function(data) {
        response.send(data)
    })
});
app.post('/question/add', (request, response) => {
    let Models = require('./models/Models')
    Models.questionAdd(request.body.id, request.body.type, request.body.question, function(data) {
        response.json(data)
        for (let i = 0; i < request.body.answers[0].length; i++) {
            Models.answerAdd(data, request.body.answers[0][i], request.body.answers[1][i])
        }
    })
});
app.get('/quiz/question-list/:id', (request, response) => {
    let Models = require('./models/Models')
    Models.quizGetQuestions(request.params.id, function(data) {
        response.send(data)
    })
});
app.get('/quiz/question-answers/:id', (request, response) => {
    let Models = require('./models/Models')
    Models.questionGetAnswers(request.params.id, function(data) {
        response.send(data)
    })
})
app.get('/questions/:id/:question', (request, response) => {
    let Models = require('./models/Models')
    Models.getQuestions(request.params.question, function(data) {
        Models.getAnswers(request.params.id, request.params.question, function(data) {
            response.send(data);
        })
    })
});
app.get('/question-answers/delete-all/:question/:user', (request, response) => {
    let Models = require('./models/Models')
    Models.deleteQuestionAnswers(request.params.user, request.params.question)
    response.sendStatus(200);
});
app.post('/question-answer/add', (request, response) => {
    let Models = require('./models/Models');
    //Models.deleteQuestionAnswers(request.body.user, request.body.question)
    Models.addUserAnswer(request.body.user, request.body.question, request.body.answer);
    response.sendStatus(200);
});
app.get('/quiz/nombre-true-response/:quiz/:user', (request, response) => {
    let Models = require('./models/Models');
    Models.trueResponseNumber(request.params.quiz, request.params.user, function(data) {
        response.send(data);
    })
})
app.get('/quiz/nombre-false-response/:quiz/:user', (request, response) => {
    let Models = require('./models/Models');
    Models.falseResponseNumber(request.params.quiz, request.params.user, function(data) {
        response.send(data);
    })
})
app.get('/quiz/nombre-empty-response/:quiz/:user', (request, response) => {
    let Models = require('./models/Models');
    Models.emptyResponseNumber(request.params.quiz, request.params.user, function(data) {
        response.send(data);
    })
})
app.get('/quiz/nombre-total-response/:quiz', (request, response) => {
    let Models = require('./models/Models');
    Models.totalResponseNumber(request.params.quiz, function(data) {
        response.send(data);
    })
})
app.get('/quiz/delete-quiz-response/:user/:quiz', (request, response) => {
    let Models = require('./models/Models');
    Models.deleteQuizResponse(request.params.user, request.params.quiz);
    response.send(200);
})
app.get('/quiz/delete-question/:question', (request, response) => {
    let Models = require('./models/Models');
    Models.quizDeleteQuestion(request.params.question);
    response.send(200);
})
/*app.post('/answer/add', (request, response) => {
    let Models = require('./models/Models')
    Models.answerAdd(request.body.question, request.body.answer, request.body.isTrue, function(data) {
        response.json(data)
    })
});*/
//: OLD
app.post('/set-answer/:user/:question', (request, response) => {
    let Models = require('./models/Models')
    Models.setAnswer(request.params.user, request.params.question, request.body.RefAnswer);
    response.sendStatus(200);
});
app.get('/score/:user/:level', (request, response) => {
    let Models = require('./models/Models')
    Models.getScore(request.params.user, request.params.level, function(data) {
        response.send(data);
    })
});
app.get('/test', (request, response) => {
    let Models = require('./models/Models')
    Models.test();
    response.sendStatus(200);
});

app.listen(8080)