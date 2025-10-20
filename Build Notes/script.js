const notescard = document.querySelector(".notes-card");
const createbtn = document.querySelector(".btn");

// Show saved notes on page load
function showNotes() {
    notescard.innerHTML = localStorage.getItem("notes") || "";
}
showNotes();

// Save notes to localStorage
function update() {
    localStorage.setItem("notes", notescard.innerHTML);
}

// Create new note
createbtn.addEventListener("click", () => {
    let inputbox = document.createElement("p");
    let img = document.createElement("img");

    inputbox.className = "input-box";
    inputbox.setAttribute("contenteditable", "true");
    img.src = "images/delete.png";

    // Append image inside paragraph
    inputbox.appendChild(img);
    // Append new note to container
    notescard.appendChild(inputbox);

    // Save immediately
    update();

    // Focus the new note for instant typing
    inputbox.focus();
});

// Delete note or update content
notescard.addEventListener("click", (e) => {
    if (e.target.tagName === "IMG") {
        e.target.parentElement.remove();
        update();
    }
});

// Detect typing in any note to update
notescard.addEventListener("keyup", (e) => {
    if (e.target.classList.contains("input-box")) {
        update();
    }
});

// Prevent Enter key from creating new note
document.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        document.execCommand("insertLineBreak");
        event.preventDefault();
    }
});
