// Firebase Setup
const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_PROJECT.firebaseapp.com",
    projectId: "YOUR_PROJECT",
    storageBucket: "YOUR_PROJECT.appspot.com",
    messagingSenderId: "YOUR_SENDER_ID",
    appId: "YOUR_APP_ID"
};
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// Register User
function registerUser() {
    let name = document.getElementById("nameInput").value;
    if (name === "") return alert("Enter your name!");

    db.collection("users").doc(name).set({ name: name, innoCoins: 0 })
    .then(() => {
        alert("Registered successfully!");
        loadBalance(name);
    });
}

// Load Balance
function loadBalance(name) {
    db.collection("users").doc(name).get().then(doc => {
        if (doc.exists) {
            document.getElementById("balance").innerText = doc.data().innoCoins;
        }
    });
}

// Spend Coins
function spendCoins(amount) {
    let name = document.getElementById("nameInput").value;
    let userRef = db.collection("users").doc(name);

    userRef.get().then(doc => {
        if (doc.exists && doc.data().innoCoins >= amount) {
            userRef.update({ innoCoins: doc.data().innoCoins - amount })
            .then(() => {
                alert("Coins deducted!");
                animateCoin();
            });
        } else {
            alert("Not enough InnoCoins!");
        }
    });
}

// Animate Coin
function animateCoin() {
    let coin = document.getElementById("coin");
    coin.classList.add("spin");
    setTimeout(() => coin.classList.remove("spin"), 1000);
}

// Load Leaderboard
function loadLeaderboard() {
    db.collection("users").orderBy("innoCoins", "desc").onSnapshot(snapshot => {
        let leaderboard = document.getElementById("leaderboard");
        leaderboard.innerHTML = "";
        snapshot.forEach(doc => {
            let li = document.createElement("li");
            li.innerText = `${doc.data().name}: ${doc.data().innoCoins} InnoCoins`;
            leaderboard.appendChild(li);
        });
    });
}

loadLeaderboard();
