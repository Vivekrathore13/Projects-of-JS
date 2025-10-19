// Get reference to the password input field
const passwordBox = document.getElementById("password");  // Fixed: Matches HTML id

const length = 12;  // Password length

// Constants for generating passwords with different character types
const uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";  // All capital letters
const lowercase = "abcdefghijklmnopqrstuvwxyz";  // All small letters
const numbers = "0123456789";  // All digits
const special = "!@#$%^&*()_+-=[]{}|;:,.<>?/`~";  // Common special characters

// Combine all character sets for random selection
const allChars = uppercase + lowercase + numbers + special;  // Fixed: 'allchars' to 'allChars', 'Symbol' to 'special'

// Function to generate a random password
function createPassword() {
    let password = "";
    
    // Ensure at least one of each type (for security)
    password += uppercase[Math.floor(Math.random() * uppercase.length)];  // Fixed: Consistent naming
    password += lowercase[Math.floor(Math.random() * lowercase.length)];  // Fixed: 'lowercasecase' to 'lowercase'
    password += numbers[Math.floor(Math.random() * numbers.length)];  // Fixed: 'number' to 'numbers'
    password += special[Math.floor(Math.random() * special.length)];  // Fixed: 'Symbol' to 'special'
    
    // Fill the rest randomly from all characters
    while (password.length < length) {  // Fixed: '<' instead of '>' for correct loop
        password += allChars[Math.floor(Math.random() * allChars.length)];  // Fixed: 'allchars' to 'allChars'
    }
    
    // Set the generated password in the input field
    passwordBox.value = password;
}

// Function to copy password to clipboard
function copypass() {
    passwordBox.select();  // Select the text
    document.execCommand("copy");  // Copy to clipboard (deprecated but works; modern way: navigator.clipboard.writeText(passwordBox.value))
    alert("Password copied!");  // Optional: Feedback to user
}