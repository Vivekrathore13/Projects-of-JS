// Get the date input element and set max to today to prevent future dates
let userinput = document.getElementById("date");
userinput.max = new Date().toISOString().split("T")[0];  // Fixed: Added () for toISOString()

let result = document.getElementById("result");

function calculateage() {
    let birthdate = new Date(userinput.value + 'T00:00:00');  // Assume birth time as midnight for precision

    let d1 = birthdate.getDate();
    let m1 = birthdate.getMonth() + 1;
    let y1 = birthdate.getFullYear();

    let today = new Date();

    let d2 = today.getDate();
    let m2 = today.getMonth() + 1;
    let y2 = today.getFullYear();

    let d3, m3, y3;

    // Calculate years
    y3 = y2 - y1;

    // Calculate months
    if (m2 >= m1) {
        m3 = m2 - m1;
    } else {
        y3--;
        m3 = 12 + m2 - m1;
    }

    // Calculate days
    if (d2 >= d1) {
        d3 = d2 - d1;
    } else {
        m3--;
        d3 = getdaysmonth(y1, m1) + d2 - d1;  // Uses birth year/month days; approximate but common
    }

    // Adjust if months went negative after day borrow
    if (m3 < 0) {
        m3 = 11;  // Equivalent to m3 += 12; since it was -1
        y3--;
    }

    // Calculate remaining hours and minutes (from midnight of the current day)
    let hours = today.getHours();
    let minutes = today.getMinutes();

    // Display the full age breakdown
    result.innerHTML = `You are ${y3} years, ${m3} months, ${d3} days, ${hours} hours and ${minutes} minutes old!`;
    
    // Trigger animation by adding 'show' class
    result.classList.remove('show');  // Reset for re-trigger
    setTimeout(() => {
        result.classList.add('show');  // Animate in after brief reset
    }, 10);
}

// Helper function to get number of days in a given month/year
function getdaysmonth(year, month) {
    return new Date(year, month, 0).getDate();
}