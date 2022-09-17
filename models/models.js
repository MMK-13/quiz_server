let connection = require('../config/db');

class Models {
    static register(username, password, callback) {
        connection.query("INSERT INTO tbluser(Username, Password) VALUES(?, ?)", [username, password], (err, result) => {
            if (err) throw err;
            callback(result.insertId)
            console.log(result.insertId)
        })
    }
    static login(username, password, callback) {
        connection.query("SELECT * FROM tbluser WHERE Username = ? AND Password = ?", [username, password], (err, result) => {
            if (err) throw err;
            console.log(result);
            callback(result);
        })
    }
    static categories(callback) {
        connection.query("SELECT * FROM tblcategory ORDER BY RefCategory DESC", [], (err, result) => {
            if (err) throw err;
            console.log(result);
            let a = {RefCategory: 0, Category: 'Все'};
            result.push(a);
            result.reverse();
            console.log(result);
            callback(result);
        })
    }
    static quizAll(callback) {
        connection.query("SELECT tblquiz.*, tblcategory.Category, COUNT(tblquestion.RefQuestion) AS NbreQuestion FROM tblquiz INNER JOIN tblcategory ON (tblquiz.RefCategory = tblcategory.RefCategory) LEFT JOIN tblquestion ON (tblquiz.RefQuiz = tblquestion.RefQuiz) GROUP BY tblquiz.RefQuiz", [], (err, result) => {
            if (err) throw err;
            console.log(result);
            callback(result);
        })
    }
    static quizByCategory(category, callback) {
        connection.query("SELECT tblquiz.*, tblcategory.Category, COUNT(tblquestion.RefQuestion) AS NbreQuestion FROM tblquiz INNER JOIN tblcategory ON (tblquiz.RefCategory = tblcategory.RefCategory) LEFT JOIN tblquestion ON (tblquiz.RefQuiz = tblquestion.RefQuiz) WHERE tblquiz.RefCategory = ? GROUP BY tblquiz.RefQuiz", [category], (err, result) => {
            if (err) throw err;
            console.log(result);
            callback(result);
        })
    }
    static quizByUser(user, callback) {
        connection.query("SELECT tblquiz.*, tblcategory.Category, COUNT(tblquestion.RefQuestion) AS NbreQuestion FROM tblquiz INNER JOIN tblcategory ON (tblquiz.RefCategory = tblcategory.RefCategory) LEFT JOIN tblquestion ON (tblquiz.RefQuiz = tblquestion.RefQuiz) WHERE tblquiz.RefUser = ? GROUP BY tblquiz.RefQuiz", [user], (err, result) => {
            if (err) throw err;
            console.log(result);
            callback(result);
        })
    }
    static quizAdd(user, category, quiz, time) {
        connection.query("INSERT INTO tblquiz(RefUser, RefCategory, Quiz, Time) VALUES(?, ?, ?, ?)", [user, category, quiz, time], (err, result) => {
            if (err) throw err;
            console.log(result.insertId)
        })
    }
    static quizUpdate(id, category, quiz, time) {
        connection.query("UPDATE tblquiz SET RefCategory = ?, Quiz = ?, Time = ? WHERE RefQuiz = ?", [category, quiz, time, id], (err, result) => {
            if (err) throw err;
        })
    }
    static quizDelete(id) {
        connection.query("DELETE FROM tblquiz WHERE RefQuiz = ?", [id], (err, result) => {
            if (err) throw err
            console.log(result);
        })
    }
    static quizDeleteQuestion(question) {
        connection.query("DELETE FROM tblquestion WHERE RefQuestion = ?", [question], (err, result) => {
            if (err) throw err
            console.log(result);
        })
    }
    static quizGet(id, callback) {
        connection.query("SELECT * FROM tblquiz INNER JOIN tblcategory ON (tblquiz.RefCategory = tblcategory.RefCategory) WHERE RefQuiz = ?", [id], (err, result) => {
            if (err) throw err;
            console.log(result);
            callback(result);
        })
    }
    static questionAdd(quiz, type, question, callback) {
        connection.query("INSERT INTO tblquestion(RefQuiz, RefTypeQuestion, Question) VALUES(?, ?, ?)", [quiz, type, question], (err, result) => {
            if (err) throw err;
            callback(result.insertId)
            console.log(result.insertId)
        })
    }
    static answerAdd(question, answer, isTrue) {
        connection.query("INSERT INTO tblanswer(RefQuestion, Answer, isTrue) VALUES(?, ?, ?)", [question, answer, isTrue], (err, result) => {
            if (err) throw err;
            console.log(result.insertId)
        })
    }
    static quizGetQuestions(id, callback) {
        connection.query("SELECT * FROM tblquestion WHERE RefQuiz = ?", [id], (err, result) => {
            if (err) throw err;
            //console.log(result);
            callback(result);
        })
    }
    static questionGetAnswers(id, callback) {
        connection.query("SELECT * FROM tblanswer WHERE RefQuestion = ?", [id], (err, result) => {
            if (err) throw err;
            //console.log(result);
            callback(result);
        })
    }
    static quizGetNbreQuestion(id, callback) {
        connection.query("SELECT COUNT(*) AS Nbre FROM tblquestion WHERE RefQuiz = ?", [id], (err, result) => {
            if (err) throw err;
            console.log(result);
            callback(result);
        })
    }
    static getAnswers(user, question, callback) {
        connection.query("SELECT tblanswer.*, tbluseranswer.RefAnswer AS MyAnswer FROM tblanswer LEFT JOIN tbluseranswer ON (tblanswer.RefAnswer = tbluseranswer.RefAnswer AND tbluseranswer.RefUser= ?) WHERE tblanswer.RefQuestion = ?", [user, question], (err, result) => {
            if (err) throw err;
            //console.log(result);
            callback(result);
        })
    }
    static deleteQuestionAnswers(user, question) {
        connection.query("DELETE FROM tbluseranswer WHERE RefUser = ? AND RefQuestion = ?", [user, question], (err, result) => {
            if (err) throw err;
            console.log(result);
        })
    }
    static addUserAnswer(user, question, answer) {
        connection.query("INSERT INTO tbluseranswer (RefUser, RefQuestion, RefAnswer) VALUES (?, ?, ?)", [user, question, answer], (err, result) => {
            if (err) throw err;
            console.log(result);
        })
    }
    static trueResponseNumber(quiz, user, callback) {
        connection.query("SELECT COUNT(*) AS Nbre FROM tblanswer INNER JOIN tbluseranswer ON (tblanswer.RefAnswer = tbluseranswer.RefAnswer) INNER JOIN tblquestion ON (tblanswer.RefQuestion = tblquestion.RefQuestion) INNER JOIN tblquiz ON (tblquestion.RefQuiz = tblquiz.RefQuiz) WHERE tblquiz.RefQuiz = ? AND tbluseranswer.RefUser = ? AND tblanswer.isTrue = 1;", [quiz, user], (err, result) => {
            if (err) throw err;
            console.log(result);
            callback(result);
        })
    }
    static falseResponseNumber(quiz, user, callback) {
        connection.query("SELECT COUNT(*) AS Nbre FROM tblanswer INNER JOIN tbluseranswer ON (tblanswer.RefAnswer = tbluseranswer.RefAnswer) INNER JOIN tblquestion ON (tblanswer.RefQuestion = tblquestion.RefQuestion) INNER JOIN tblquiz ON (tblquestion.RefQuiz = tblquiz.RefQuiz) WHERE tblquiz.RefQuiz = ? AND tbluseranswer.RefUser = ? AND tblanswer.isTrue = 0;", [quiz, user], (err, result) => {
            if (err) throw err;
            console.log(result);
            callback(result);
        })
    }
    static emptyResponseNumber(quiz, user, callback) {
        connection.query("SELECT COUNT(*) AS Nbre FROM tblquestion WHERE RefQuiz = ? AND RefQuestion NOT IN (SELECT tblquestion.RefQuestion FROM tblquestion INNER JOIN tblanswer ON (tblquestion.RefQuestion = tblanswer.RefQuestion) INNER JOIN tbluseranswer ON (tblanswer.RefAnswer = tbluseranswer.RefAnswer) WHERE tbluseranswer.RefUser = ? AND tblquestion.RefQuiz = ? GROUP BY tblquestion.RefQuestion);", [quiz, user, quiz], (err, result) => {
            if (err) throw err;
            console.log(result);
            callback(result);
        })
    }
    static totalResponseNumber(quiz, callback) {
        connection.query("SELECT COUNT(*) AS Nbre FROM `tblanswer` INNER JOIN tblquestion ON (tblanswer.RefQuestion = tblquestion.RefQuestion) WHERE tblquestion.RefQuiz = ? AND tblanswer.isTrue=1;", [quiz], (err, result) => {
            if (err) throw err;
            console.log(result);
            callback(result);
        })
    }
    static deleteQuizResponse(user, quiz) {
        connection.query("DELETE FROM tbluseranswer WHERE RefUser = ? AND RefQuestion IN (SELECT RefQuestion FROM tblquestion WHERE RefQuiz = ?)", [user, quiz], (err, result) => {
            if (err) throw err;
            console.log(result);
        })
    }
    //: OLD
    static getQuestions(id, callback) {
        connection.query("SELECT * FROM tblquestion WHERE RefQuestion = ?", [id], (err, result) => {
            if (err) throw err;
            //console.log(result);
            callback(result);
        })
    }
    static setAnswer(user, question, answer) {
        connection.query("DELETE FROM tbluseranswer WHERE RefUser = ? AND RefQuestion= ?", [user, question], (err, result) => {
            if (err) throw err
        })
        connection.query("INSERT INTO tbluseranswer (RefUser, RefQuestion, RefAnswer) VALUES (?, ?, ?)", [user, question, answer], (err, result) => {
            if (err) throw err
        })
    }
    static getScore(user, level, callback) {
        let nbreQuestion = 0;
        switch (level) {
            case '1':
                nbreQuestion = 10;
                break;
            case '2':
                nbreQuestion = 15;
                break;
            case '3':
                nbreQuestion = 20;
                break;
            default:
                nbreQuestion = 10;
                break;
        }
        connection.query("SELECT COUNT(*) AS Nbre FROM tbluseranswer INNER JOIN tblanswer ON (tbluseranswer.RefAnswer = tblanswer.RefAnswer) WHERE tbluseranswer.RefUser = ? AND tblanswer.isTrue=1", [user], (err, result) => {
            if (err) throw err;
            //console.log(result);
            callback(result[0]);
        })
    }
    static test() {
        for (let i = 1; i <= 20; i++) {
            connection.query("INSERT INTO tblanswer (RefQuestion, Answer, isTrue) VALUES (?, 'Да', 0)", [i], (err, result) => {
                if (err) throw err
            })
            connection.query("INSERT INTO tblanswer (RefQuestion, Answer, isTrue) VALUES (?, 'Нет', 0)", [i], (err, result) => {
                if (err) throw err
            })
        }
    }
}

module.exports = Models;