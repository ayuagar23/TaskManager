const addBox = document.querySelector(".add-box"),
popupBox = document.querySelector(".popup-box"),
popupTitle = popupBox.querySelector("header p"),
closeIcon = popupBox.querySelector("header i"),
titleTag = popupBox.querySelector("input"),
workTag = popupBox.querySelector("select"),
descTag = popupBox.querySelector("textarea"),
addBtn = popupBox.querySelector("button");
const toggle_btn = document.getElementById('toggle-btn');
const body = document.querySelector('body');
const bgModeBtn = document.getElementById('bgModeBtn');
const bgModeIcon = document.getElementById('bgModeIcon');
const sectionHeader = document.querySelector('section h1');



const months = ["January", "February", "March", "April", "May", "June", "July",
              "August", "September", "October", "November", "December"];
const notes = JSON.parse(localStorage.getItem("notes") || "[]");
let isUpdate = false, updateId;

addBox.addEventListener("click", () => {
    popupTitle.innerText = "Add a new Note";
    addBtn.innerText = "Add Note";
    popupBox.classList.add("show");
    document.querySelector("body").style.overflow = "hidden";
    if(window.innerWidth > 660) titleTag.focus();
});

closeIcon.addEventListener("click", () => {
    isUpdate = false;
    titleTag.value = workTag.value = descTag.value = "";
    popupBox.classList.remove("show");
    document.querySelector("body").style.overflow = "auto";
});

function showNotes() {
    if(!notes) return;
    document.querySelectorAll(".note").forEach(li => li.remove());
	
    notes.forEach((note, id) => {
		//console.log('note.work');
        let filterDesc = note.description.replaceAll("\n", '<br/>');
        let liTag = `<li class="note">
                        <div class="details">
							<h4> ${note.work}</h4>
							
						
                            <p>${note.title}</p>
                            <span>${filterDesc}</span>
                        </div>
                        <div class="bottom-content">
                            <span>${note.date}</span>
                            <div class="settings">
                                <i onclick="showMenu(this)" class="uil uil-ellipsis-h"></i>
                                <ul class="menu">
                                    <li onclick="updateNote(${id}, '${note.title}', '${note.work}', '${filterDesc}')"><i class="uil uil-pen"></i>Edit</li>
                                    <li onclick="deleteNote(${id})"><i class="uil uil-trash"></i>Delete</li>
								</ul>
                            </div>
                        </div>
                    </li>`;
        addBox.insertAdjacentHTML("afterend", liTag);
    });
}
showNotes();

function showMenu(elem) {
    elem.parentElement.classList.add("show");
    document.addEventListener("click", e => {
        if(e.target.tagName != "I" || e.target != elem) {
            elem.parentElement.classList.remove("show");
        }
    });
}

function deleteNote(noteId) {
    let confirmDel = confirm("Are you sure you want to delete this note?");
    if(!confirmDel) return;
    notes.splice(noteId, 1);
    localStorage.setItem("notes", JSON.stringify(notes));
    showNotes();
}

function updateNote(noteId, title,work, filterDesc) {
    let description = filterDesc.replaceAll('<br/>', '\r\n');
    updateId = noteId;
    isUpdate = true;
    addBox.click();
    titleTag.value = title;
    descTag.value = description;
	workTag.value = work;
    popupTitle.innerText = "Update a Note";
    addBtn.innerText = "Update Note";
}


addBtn.addEventListener("click", e => {
    e.preventDefault();
    let title = titleTag.value.trim(),
    description = descTag.value.trim();
	let work = workTag.value;


    if(title || work || description) {
        let currentDate = new Date(),
        month = months[currentDate.getMonth()],
        day = currentDate.getDate(),
        year = currentDate.getFullYear();
		
        let noteInfo = {title, work , description, date: `${month} ${day}, ${year}`}
        if(!isUpdate) {
            notes.push(noteInfo);
        } else {
            isUpdate = false;
            notes[updateId] = noteInfo;
        }
        localStorage.setItem("notes", JSON.stringify(notes));
        showNotes();
        closeIcon.click();
    }
	else{
		alert("Please Fill the details");
	}
});

bgModeBtn.onclick = function(){
    body.classList.toggle("dark-mode");
    bgModeIcon.classList.toggle("fa-sun-o");
    bgModeIcon.classList.toggle("fa-moon-o");
    sectionHeader.classList.toggle("dark-mode");
};
