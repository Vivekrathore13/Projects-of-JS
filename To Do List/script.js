const inputbox = document.getElementById("input-box");
const listcont = document.getElementById("list-contain");

// Attach the event listener once, outside the function
listcont.addEventListener("click", function(e) {
    if (e.target.tagName === "LI") {
        e.target.classList.toggle("checked");
        saveData();
    } else if (e.target.tagName === "SPAN") {
        e.target.parentElement.remove();
        saveData();
    }
}, false);

function saveData(){
    localStorage.setItem("data",listcont.innerHTML);
}

function showtask(){
    listcont.innerHTML=localStorage.getItem("data");
}

showtask();

function addtask() {
    if (inputbox.value === '') {
        alert("You must write something!");
        return;  // Optional: Exit early to avoid clearing on empty input
    }
    
    let li = document.createElement("li");
    li.innerHTML = inputbox.value;
    listcont.appendChild(li);
    
    let span = document.createElement("span");
    span.innerHTML = "\u00d7";
    li.appendChild(span);
    
    inputbox.value = "";  // Now safely inside the else-equivalent
    saveData();
}