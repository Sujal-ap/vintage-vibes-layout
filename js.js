import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-app.js";
import { getAuth, GoogleAuthProvider, signInWithRedirect, getRedirectResult, signOut } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-auth.js";

// Firebase configuration
const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_AUTH_DOMAIN",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_STORAGE_BUCKET",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    appId: "YOUR_APP_ID"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const provider = new GoogleAuthProvider();
export const auth = getAuth(app);

document.addEventListener('DOMContentLoaded', () => {
    const signInLink = document.getElementById('signInLink');
    const userInfo = document.getElementById('userInfo');

    const handleSignIn = () => {
        signInWithRedirect(auth, provider);
    };

    const displayUserInfo = (user) => {
        const userName = user.displayName;
        const userProfile = user.photoURL;
        signInLink.style.display = 'none'; // Hide sign-in link
        userInfo.innerHTML = `
            <img src="${userProfile}" alt="Profile Image" class="profile-img">
            <span>${userName}</span>
            <button id="logoutBtn">Logout</button>
        `; // Display user name, profile image, and logout button
        userInfo.style.display = 'inline'; // Show user info
    };

    const handleSignOut = () => {
        signOut(auth).then(() => {
            signInLink.style.display = 'block'; // Show sign-in link after sign-out
            userInfo.style.display = 'none'; // Hide user info after sign-out
        }).catch((error) => {
            console.error("Error signing out:", error);
        });
    };

    // Event listener for sign-in link
    signInLink.addEventListener('click', handleSignIn);

    // Check if the user is already signed in
    getRedirectResult(auth)
    .then((result) => {
        const user = result.user;
        if (user) {
            displayUserInfo(user);
        }
    })
    .catch((error) => {
        console.error("Error:", error);
    });

    // Event listener for logout button
    document.addEventListener('click', (event) => {
        if (event.target && event.target.id === 'logoutBtn') {
            handleSignOut();
        }
    });
});
