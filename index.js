const URL = "https://teaching.maumt.se/apis/access/";

let user = null;
let main = document.querySelector("main");

if (window.localStorage.getItem("loginOrQuiz")) {
    user = JSON.parse(window.localStorage.getItem("loginOrQuiz"));
    attemptLogin();
} else {
    loginPage();
}