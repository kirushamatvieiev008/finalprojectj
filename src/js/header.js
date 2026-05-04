window.addEventListener('load', () => {
  const preloader = document.querySelector('.preloader');
  const content = document.getElementById('content');
  const circle = document.querySelector('.progress-ring__circle');
  const radius = circle.r.baseVal.value;
  const circumference = 2 * Math.PI * radius;

  circle.style.strokeDasharray = `${circumference} ${circumference}`;
  circle.style.strokeDashoffset = circumference;


  let progress = 0;
  const interval = setInterval(() => {
    progress += 1;
    const offset = circumference - (progress / 100) * circumference;
    circle.style.strokeDashoffset = offset;
    if (progress >= 100) {
      clearInterval(interval);
  
      preloader.style.transition = 'opacity 1s ease';
      preloader.style.opacity = '0';
      setTimeout(() => {
        preloader.style.display = 'none';
        content.style.display = 'block';
        document.body.style.overflow = 'auto';
      }, 1000);
    }
  }, 15);
});

const countryBox = document.querySelector(".country");

countryInput.addEventListener("click", () => {

  countryList.classList.toggle("open");
  countryBox.classList.toggle("open");

});




// увійти 

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";

import {
getAuth,
GoogleAuthProvider,
signInWithPopup,
signInAnonymously,
onAuthStateChanged,
signOut
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";


const firebaseConfig = {
apiKey: "AIzaSyC4NsRRqrPTkrffod7c5jsM1QSRJvpVe0w",
authDomain: "events-project-21e9a.firebaseapp.com",
projectId: "events-project-21e9a",
storageBucket: "events-project-21e9a.appspot.com",
messagingSenderId: "480946051710",
appId: "1:480946051710:web:76486820763f85d427162f"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);


const signBtn = document.querySelector(".sign-in-button");
const authContainer = document.querySelector(".auth-container");

signBtn.addEventListener("click", () => {

    authContainer.classList.toggle("open");
    
    if (authContainer.classList.contains("open")) {
        signBtn.textContent = "Close";
    } else {
        signBtn.textContent = "Sign in";
    }
});


const googleBtn = document.querySelector(".google");
const guestBtn = document.querySelector(".guest");

googleBtn.addEventListener("click",()=>{

const provider = new GoogleAuthProvider();

signInWithPopup(auth,provider);

});


guestBtn.addEventListener("click",()=>{

signInAnonymously(auth);

});


const userName = document.querySelector(".user-name");
const userBox = document.querySelector(".user-info");
const logoutBtn = document.querySelector(".logout");


onAuthStateChanged(auth,(user)=>{

if(user){

userBox.classList.add("active");

userName.textContent =
user.displayName || "Guest user";

}else{

userBox.classList.remove("active");

}

});


logoutBtn.addEventListener("click",()=>{

signOut(auth);

});


const userPhoto = document.querySelector(".user-photo");
const authWrapper = document.querySelector(".auth-wrapper");
const userDisplayName = document.querySelector(".user-display-name");

onAuthStateChanged(auth, (user) => {
  if (user) {
      userBox.classList.add("active");
      authWrapper.classList.add("logged-in");
      authContainer.classList.remove("open"); 

      let nameToDisplay = "";

      if (user.isAnonymous) {
          const shortId = user.uid.slice(-4).toUpperCase();
          nameToDisplay = `Guest_${shortId}`;
      } else if (user.displayName) {
          nameToDisplay = user.displayName;
      } else if (user.email) {
          nameToDisplay = user.email.split('@')[0];
      } else {
          nameToDisplay = "User";
      }

      userDisplayName.textContent = nameToDisplay;

      if (user.photoURL) {
          userPhoto.src = user.photoURL;
      } else {
          const firstLetter = nameToDisplay.charAt(0).toUpperCase();
          const bg = user.isAnonymous ? "7b1fa2" : "34495e";
          userPhoto.src = `https://ui-avatars.com/api/?name=${firstLetter}&background=${bg}&color=fff&size=128`;
      }
  } else {
      userBox.classList.remove("active");
      authWrapper.classList.remove("logged-in");
  }
});