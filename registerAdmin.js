import { doc, setDoc } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-firestore.js";

document.getElementById('register-form').addEventListener('submit', async (e) => {
    e.preventDefault();

    const phoneOtp = document.getElementById('phone-otp').value;
    const emailOtp = document.getElementById('email-otp').value;

    try {
        // Verify Phone OTP
        await window.confirmationResult.confirm(phoneOtp);
        alert('Phone verification successful!');

        // Complete Email OTP verification
        const emailForSignIn = window.localStorage.getItem('emailForSignIn');
        if (auth.isSignInWithEmailLink(window.location.href) && emailForSignIn) {
            await auth.signInWithEmailLink(emailForSignIn, window.location.href);
            alert("Email verification successful!");
        }

        // Save admin data to Firestore
        const userId = auth.currentUser.uid; // Get user ID
        await setDoc(doc(db, "admins", userId), {
            firstName: document.getElementById('firstname').value,
            lastName: document.getElementById('lastname').value,
            dob: document.getElementById('dob').value,
            gender: document.getElementById('gender').value,
            email: emailForSignIn,
            phone: document.getElementById('register-phone').value,
            role: 'admin' // Specify the role as admin
        });

        alert("Admin registration successful!");
        window.location.href = "admin-login.html";
    } catch (error) {
        alert('Verification failed, please check your OTPs and try again.');
        console.error("Verification Error:", error.message);
    }
});
