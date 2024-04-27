/* main.js */

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-app.js";
import { getAuth, GoogleAuthProvider, signInWithRedirect, getRedirectResult, signOut } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-auth.js";

const firebaseConfig = {
    apiKey: "AIzaSyCEXDTA-9yOtQHfTqzl0c3g1aNLzY4_3pg",
    authDomain: "auth-df231.firebaseapp.com",
    projectId: "auth-df231",
    storageBucket: "auth-df231.appspot.com",
    messagingSenderId: "459558142200",
    appId: "1:459558142200:web:dc776e693fd9d333bd7b0d"    
};

const app = initializeApp(firebaseConfig);
const provider = new GoogleAuthProvider(app);
export const auth = getAuth(app);

const signInLink = document.getElementById('signInLink');
const userInfo = document.getElementById('userInfo');
const profileImg = document.getElementById('profileImg');
const userName = document.getElementById('userName');
export const logoutBtn = document.getElementById('logoutBtn');

signInLink.addEventListener('click', () => {
    signInWithRedirect(auth, provider);
});

getRedirectResult(auth)
.then((result) => {
    const user = result.user;
    if (user) {
        signInLink.style.display = 'none'; // Hide sign-in link
        userInfo.style.display = 'inline-block'; // Show user info
        profileImg.src = user.photoURL;
        userName.textContent = user.displayName;
        logoutBtn.style.display = 'inline-block'; // Show logout button
        window.location.href = "index.html";
    } else {
        signInLink.style.display = 'block'; // Show sign-in link if user is not logged in
        userInfo.style.display = 'none'; // Hide user info if user is not logged in
        logoutBtn.style.display = 'none'; // Hide logout button if user is not logged in
    }
})
.catch((error) => {
    console.error("Error:", error);
});

logoutBtn.addEventListener('click', () => {
    signOut(auth)
    .then(() => {
        // Sign-out successful.
        window.location.href = "index.html"; // Redirect to main page after logout
    })
    .catch((error) => {
        // An error happened.
        console.error("Error:", error);
    });
});
