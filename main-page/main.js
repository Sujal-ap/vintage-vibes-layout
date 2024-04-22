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
const auth = getAuth(app);

const signInLink = document.getElementById('signInLink');
const profileImg = document.getElementById('profileImg');
const userName = document.getElementById('userName');
const logoutBtn = document.getElementById('logoutBtn');

signInLink.style.display = 'none'; // Hide sign-in link initially

signInLink.addEventListener('click', () => {
    signInWithRedirect(auth, provider);
});

logoutBtn.addEventListener('click', () => {
    signOut(auth)
    .then(() => {
        window.location.href = "index.html";
    })
    .catch((error) => {
        console.error("Error signing out:", error);
    });
});

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
    }
})
.catch((error) => {
    console.error("Error:", error);
});
