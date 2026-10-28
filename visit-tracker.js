import { initializeApp } from "https://www.gstatic.com/firebasejs/13.1.0/firebase-app.js";
import {
    getFirestore,
    doc,
    setDoc,
    increment,
    serverTimestamp
} from "https://www.gstatic.com/firebasejs/13.1.0/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyAbYBDvJTWOB5t7FDdIngFVlA17sOaAqmE",
    authDomain: "sellco-project-tracker.firebaseapp.com",
    projectId: "sellco-project-tracker",
    storageBucket: "sellco-project-tracker.firebasestorage.app",
    messagingSenderId: "635902201905",
    appId: "1:635902201905:web:90fa871eb8474031618510"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const visitKey = "sju-visit";

async function trackVisit() {
    if (sessionStorage.getItem(visitKey)) {
        return;
    }

    await setDoc(
        doc(db, "stats", "summary"),
        {
            visits: increment(1),
            updatedAt: serverTimestamp()
        },
        { merge: true }
    );

    sessionStorage.setItem(visitKey, "1");
}

trackVisit().catch((error) => {
    console.warn("Visit tracker:", error.code || error.message);
});
