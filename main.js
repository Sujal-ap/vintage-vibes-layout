import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-app.js";
import { getAuth, GoogleAuthProvider, signInWithRedirect, getRedirectResult, signOut } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-auth.js";

// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCEXDTA-9yOtQHfTqzl0c3g1aNLzY4_3pg",
    authDomain: "auth-df231.firebaseapp.com",
    projectId: "auth-df231",
    storageBucket: "auth-df231.appspot.com",
    messagingSenderId: "459558142200",
    appId: "1:459558142200:web:dc776e693fd9d333bd7b0d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const provider = new GoogleAuthProvider(app);
export const auth = getAuth(app);

// Get references to HTML elements
const signInLink = document.getElementById('signInLink');
const profileImg = document.getElementById('profileImg');
const userName = document.getElementById('userName');
export const logoutBtn = document.getElementById('logoutBtn');

// Hide sign-in link initially
signInLink.style.display = 'none';

// Add event listener to the sign-in link
signInLink.addEventListener('click', () => {
    signInWithRedirect(auth, provider);
});

// Check if user is signed in
getRedirectResult(auth)
    .then((result) => {
        const user = result.user;
        if (user) {
            signInLink.style.display = 'none'; // Hide sign-in link
            profileImg.src = user.photoURL;
            userName.textContent = user.displayName;
            profileImg.style.display = 'inline-block'; // Show profile image
            userName.style.display = 'inline-block'; // Show user name
            logoutBtn.style.display = 'inline-block'; // Show logout button
        } else {
            signInLink.style.display = 'inline-block'; // Show sign-in link if user is not logged in
        }
    })
    .catch((error) => {
        console.error("Error:", error);
    });
