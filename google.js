import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-app.js";
import { getAuth, GoogleAuthProvider, signInWithRedirect, getRedirectResult } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-auth.js";

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

const loginBtn = document.getElementById('login');

loginBtn.addEventListener('click', () => {
    signInWithRedirect(auth, provider);
});

getRedirectResult(auth)
.then((result) => {
    const user = result.user;
    if (user) {
        window.location.href = "index.html"; // Redirect to main page
    }
})
.catch((error) => {
    console.error("Error:", error);
});
