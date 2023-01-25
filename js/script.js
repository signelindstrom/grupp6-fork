import { initializeApp } from "https://www.gstatic.com/firebasejs/9.16.0/firebase-app.js";
import { getAuth, signOut, updateProfile, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.16.0/firebase-auth.js";
import {
    getDatabase,
    ref,
    set,
    onValue,
    remove,
    push,
} from "https://www.gstatic.com/firebasejs/9.16.0/firebase-database.js";

const loginWrapper = document.querySelector('#loginWrapper');
const audio = new Audio("https://www.fesliyanstudios.com/play-mp3/387");

// Your web app's Firebase configuration
const firebaseConfig = {
    databaseURL:
        "https://chatapp-76264-default-rtdb.europe-west1.firebasedatabase.app/",

    apiKey: "AIzaSyAZ0KJhUc6ltrF7QACjM8IW2JqeLWT3n3g",

    authDomain: "chatapp-76264.firebaseapp.com",

    projectId: "chatapp-76264",

    storageBucket: "chatapp-76264.appspot.com",

    messagingSenderId: "957844540887",

    appId: "1:957844540887:web:b31870f3a4d046dd3d4f92",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase();

// skriva
function writeUserData(user, message) {
    let adressRef = ref(database, "user/arr");
    push(adressRef, {
        displayName: user,
        message: message
    });
}


let signUp = false;

var loginForm = document.getElementById("login-form");
var dropdown = document.querySelector(".dropdown");
var loginTitle = document.querySelector(".login-title");
var emailInput = document.getElementById("email");
var userInput = document.getElementById("username");
var passwordInput = document.getElementById("password");
var logout = document.getElementById("logout");
var loginBtn = document.getElementById("login-button");
var navBtn = document.getElementById("nav-button");
const post = document.querySelector('#post');
const postBox = document.querySelector('#postBox');
const searchField = document.querySelector('.search-field');
const searchBtn = document.querySelector('#search');
const displayNameP = document.querySelector('#displayName p')
const profileBtn = document.querySelector('.material-symbols-outlined');
const displayProfileBtn = document.querySelector('.username');
const profileWrapper = document.querySelector('#profileWrapper');
const displayNameChange = document.querySelector('#displayNameChange');
const newDisplayName = document.querySelector('#newDisplayName');
const xProfile = document.querySelector('#xProfile');
const searchButton = document.querySelector(".search-btn");
const searchInput = document.querySelector(".search-input");
const submitBtn = document.querySelector('#submit-button');

submitBtn.addEventListener('submit', () => {
    e.preventDefault();
    console.log("tesdasdsa");
})
const cardContainer = document.querySelector('.card-container');
searchButton.addEventListener('click', () => {

    writeUserData(username.textContent, searchInput.value);
    let urlRef = ref(database, "user");
    onValue(urlRef, (snapshot) => {
        const data = snapshot.val();
        let arr = Object.values(data.arr).reverse();
        cardContainer.innerHTML = "";
        arr.forEach((val) => {
            let div = document.createElement('div');
            let title = document.createElement('h1');
            let text = document.createElement('p');
            title.innerText = val.displayName;
                div.append(title);
            text.innerText = val.message;
            div.append(text);
            div.className = "card";
            cardContainer.append(div);
            console.log(val);
        })
      
    });
})

displayNameP.addEventListener('click', function (e) {
    e.preventDefault();
    displayNameP.classList.add('hide');
    displayNameChange.classList.remove('hide');
    newDisplayName.setAttribute('placeholder', displayNameP.innerText);
});

profileBtn.addEventListener('click', function () {
    profileWrapper.classList.remove('hide');
});

displayProfileBtn.addEventListener('click', function () {
    profileWrapper.classList.remove('hide');
});

xProfile.addEventListener('click', function () {
    profileWrapper.classList.add('hide');
})

post.addEventListener('click', function () {
    console.log("test");

    postBox.classList.remove('hide');
    searchField.classList.add('hide');
    searchBtn.classList.remove('hide');
    post.classList.add('hide');

});

searchBtn.addEventListener('click', function () {
    searchBtn.classList.add('hide');
    postBox.classList.add('hide');
    post.classList.remove('hide');
    searchField.classList.remove('hide');
});

userInput.classList.add('hide');
loginForm.addEventListener("click", function (e) {
    e.preventDefault();
    var email = emailInput.value;
    var password = passwordInput.value;
    //register();

    if (e.target.id == "login-button") {
        if (!signUp) {
            audio.play();
            login(email, password);
        } else {
            register(email, userInput.value, password);
        }
    }

    else if (e.target.id == "nav-button") {
        if (signUp) {
            userInput.classList.add('hide');
            loginBtn.innerText = "Sign In";
            navBtn.innerText = "Create Account";
            loginTitle.innerText = "Login";
            console.log("test");
            signUp = false;
        } else {
            userInput.classList.remove('hide');
            loginTitle.innerText = "Register";
            loginBtn.innerText = "Register";
            navBtn.innerText = "Back to Sign In";
            signUp = true;
        }

    }

});
dropdown.classList.add('hide');
logout.addEventListener("click", function (e) {
    profileWrapper.classList.add('hide');
    signOut(auth).then(() => {
        console.log("logout");
        dropdown.classList.add('hide');
        loginWrapper.classList.remove('hide');
    }).catch((error) => {
        // An error happened.
    });
})

const auth = getAuth();
let currentUser = auth.currentUser;

displayNameChange.addEventListener('submit', function () {
    e.preventDefault();
    let newName = newDisplayName.value;
    profileWrapper.classList.add('hide');

    updateProfile(auth.currentUser, {
        displayName: newName
    }).then(() => {
        // Profile updated!
        // ...
    }).catch((error) => {
        // An error occurred
        // ...
    });
})


onAuthStateChanged(auth, (user) => {

    if (user) {
        console.log(user);
        console.log(user.displayName + ' already signed in')
        dropdown.classList.remove('hide');
        loginWrapper.classList.add('hide');
        username.innerText = auth.currentUser.displayName;
        const uid = user.uid;
        displayNameP.innerText = auth.currentUser.displayName;
        console.log(auth.currentUser.displayName);
        let urlRef = ref(database, "user");
    onValue(urlRef, (snapshot) => {
        const data = snapshot.val();
        let arr = Object.values(data.arr).reverse();
        cardContainer.innerHTML = "";
        arr.forEach((val) => {
            let div = document.createElement('div');
            let title = document.createElement('h1');
            let text = document.createElement('p');
            title.innerText = val.displayName;
                div.append(title);
            text.innerText = val.message;
            div.append(text);
            div.className = "card";
            cardContainer.append(div);
            console.log(val);
        })
      
    });
    } else {
        loginForm.style.visibility = "visible";
        loginWrapper.classList.remove('hide');
        dropdown.classList.add('hide');
        // User is signed out
        // ...
    }
});

function login(email, password) {
    signInWithEmailAndPassword(auth, email, password)
        .then(function (user) {
            // Login success
            dropdown.classList.remove('hide');
            loginWrapper.classList.remove('hide');

            loginWrapper.classList.add('hide');
            auth.currentUser.reload();
            username.innerText = auth.currentUser.displayName;
            displayNameP.innerText = auth.currentUser.displayName;

        })
        .catch(function (error) {
            var errorCode = error.code;
            var errorMessage = error.message;
            alert(errorMessage);
        });
}

let username = document.querySelector(".username");

function register(email, user, password) {

    createUserWithEmailAndPassword(auth, email, password)
        .then(function () {
            updateProfile(auth.currentUser, {
                displayName: user,
                photoURL: "da",
            }).then(function () {
                auth.currentUser.reload();
                username.innerText = auth.currentUser.displayName;
                dropdown.classList.remove('hide');

            }).catch(function (error) {
                // An error occurred.
            });


        })
        .catch(function (error) {
            // Handle errors
            var errorCode = error.code;
            var errorMessage = error.message;
            alert(errorMessage);
        });
}

/*
//DANYS FEATURE
let danyBtn = document.getElementById("danyBtn");
let danyh4 = document.getElementById("danyh4");

danyBtn.addEventListener("click", () => {
    danyh4.classList.toggle("hidden");
})*/