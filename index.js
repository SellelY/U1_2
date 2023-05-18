const URL = "https://teaching.maumt.se/apis/access/";

let user = null;
let main = document.querySelector("main");

if (window.localStorage.getItem("user")) {
    user = JSON.parse(window.localStorage.getItem("user"));
    attemptLogin();
} else {
    loginPage();
}