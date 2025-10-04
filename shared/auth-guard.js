// shared/auth-guard.js
(function(){
  const cfg = {
    apiKey: "AIzaSyDxnmPRp_Kr_FZj9Q_E8Dy1cxv1_D2KwHQ",
    authDomain: "mother-duck-kitchen.firebaseapp.com",
    projectId: "mother-duck-kitchen",
    storageBucket: "mother-duck-kitchen.appspot.com",
    messagingSenderId: "925762762893",
    appId: "1:925762762893:web:1bcd3228ddc9481fbccac4",
    measurementId: "G-FLXJB5YBCV"
  };

  // Initialize Firebase only once
  if (!firebase.apps.length) firebase.initializeApp(cfg);
  const auth = firebase.auth();

  // 30-min inactivity logout
  const TIMEOUT = 30*60*1000;
  let t;
  function reset() {
    clearTimeout(t);
    t = setTimeout(() => {
      auth.signOut().then(() => location.replace("login.html?msg=expired"));
    }, TIMEOUT);
  }
  ["click","keydown","mousemove","touchstart","scroll","focus"].forEach(e => 
    window.addEventListener(e, reset, { passive: true })
  );

  // Auth check
  auth.onAuthStateChanged(u => {
    if (!u) {
      location.replace("login.html");
    } else {
      document.getElementById("mdk-hide")?.remove();
      reset();
      window.mdkLogout = () => auth.signOut().then(() => location.replace("login.html"));
    }
  });
})();
