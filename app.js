// Import Firebase modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-app.js";
import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-auth.js";
import { getFirestore, collection, getDocs, query, where } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-firestore.js";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyA9BBV8dNbrsKzG-tvFEIz32amRpPxc-5s",
    authDomain: "wattnest-cde1f.firebaseapp.com",
    projectId: "wattnest-cde1f",
    storageBucket: "wattnest-cde1f.appspot.com", // Fixed storageBucket URL
    messagingSenderId: "881782206993",
    appId: "1:881782206993:web:5b722fad4d83edb26b37b0",
    measurementId: "G-E8X673ZRVB"
  };
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Function to check user authentication state
onAuthStateChanged(auth, (user) => {
    if (user) {
        console.log('User is signed in:', user.email);
    } else {
        console.log('No user is signed in.');
    }
});

// Function to sign out the user
async function signOutUser() {
    try {
        await signOut(auth);
        alert("Successfully signed out.");
        window.location.href = "login.html"; // Redirect to login page
    } catch (error) {
        console.error("Error signing out: ", error.message);
    }
}

// Fetch cities from Firestore and populate dropdown
async function loadCities() {
    const citiesDropdown = document.getElementById('city-input'); // Changed to match input ID
    const citiesSnapshot = await getDocs(collection(db, 'cities'));
    citiesSnapshot.forEach((doc) => {
        const option = document.createElement('option');
        option.value = doc.id;
        option.textContent = doc.id;
        citiesDropdown.appendChild(option);
    });
}

// Fetch charging stations for the selected city
async function fetchChargingStations() {
    const city = document.getElementById('city-input').value; // Changed to match input ID
    const stationsList = document.getElementById('stations-list');
    stationsList.innerHTML = ''; // Clear previous results

    const hubsQuery = query(collection(db, 'chargingHubs'), where("city", "==", city));
    const hubsSnapshot = await getDocs(hubsQuery);
    
    if (hubsSnapshot.empty) {
        const listItem = document.createElement('li');
        listItem.textContent = 'No charging stations found for this city.';
        stationsList.appendChild(listItem);
        return;
    }

    hubsSnapshot.forEach((doc) => {
        const hub = doc.data();
        const listItem = document.createElement('li');
        listItem.textContent = `${hub.name} - Available: ${hub.availability}`;
        stationsList.appendChild(listItem);
    });
}

// Add event listener to submit button
document.getElementById('submit-button').addEventListener('click', fetchChargingStations);

// Load cities on DOM content loaded
document.addEventListener('DOMContentLoaded', loadCities);
