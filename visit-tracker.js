import { initializeApp } from "https://www.gstatic.com/firebasejs/13.1.0/firebase-app.js";
import {
    getFirestore,
    doc,
    getDoc,
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
const summaryRef = doc(db, "stats", "summary");

function showVisits(count) {
    const container = document.getElementById("visit-count");
    const value = document.getElementById("visit-count-value");
    const label = document.getElementById("visit-count-label");
    if (!container || !value || !label || typeof count !== "number") {
        return;
    }

    value.textContent = count.toLocaleString();
    label.textContent = count === 1 ? "VISIT" : "VISITS";
    container.hidden = false;
}

async function trackVisit() {
    if (!sessionStorage.getItem(visitKey)) {
        await setDoc(
            summaryRef,
            {
                visits: increment(1),
                updatedAt: serverTimestamp()
            },
            { merge: true }
        );
        sessionStorage.setItem(visitKey, "1");
    }

    if (!document.getElementById("visit-count")) {
        return;
    }

    const snapshot = await getDoc(summaryRef);
    showVisits(snapshot.exists() ? snapshot.data().visits : 0);
}

trackVisit().catch((error) => {
    console.warn("Visit tracker:", error.code || error.message);
});
