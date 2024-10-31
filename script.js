// jag hämtar html- element/ objekt
const inputTodo = document.getElementById("ny-todo");
const knappen = document.getElementById("add-knapp");
const listan = document.getElementById("todo-lista");



// här skapar jag en tom lista för att hålla koll på uppgifter
let tasks = [];

// detta är en funktion för att uppdatera local storage
function updateLocalStorage() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// detta är för att ladda uppgifter från local storage
function loadTasks() {
    const savedTasks = localStorage.getItem("tasks");
    if (savedTasks) {
        tasks = JSON.parse(savedTasks);
        tasks.forEach(task => addTaskToList(task));
    }
}

// detta är för funktion att inbringa en uppgift i listan
function addTaskToList(task) {
    // Skapa ett nytt list-element (li)
    const li = document.createElement("li");

    // Skapa en checkbox
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = task.completed || false;

    checkbox.addEventListener("change", function() {

        task.completed = checkbox.checked;
        updateLocalStorage();
    });

    // Skapa ett span-element för uppgiftens text
    const taskText = document.createElement("span");
    taskText.textContent = task.text || task;  // Hanterar äldre sparade tasks som enbart är text

    // Lägg till checkboxen och uppgiftens text till li-elementet
    li.appendChild(checkbox);
    li.appendChild(taskText);

    // Lägg till det nya li-elementet i todo-lista (ul)
    listan.appendChild(li);
}

// Funktion för att lägga till en uppgift
function addTask() {
    const newTask = inputTodo.value; 

    // Kontrollera om fältet är tomt
    if (newTask === "") {
        alert("Du kan inte lägga till en tom uppgift!");
        return;
    }

    // Kontrollera om uppgiften redan finns i listan
    if (tasks.includes(newTask)) {
        alert("Denna uppgift finns redan i listan!");
        return;
    }
    // Lägg till uppgiften i arrayen
    tasks.push({text: newTask, completed:false});
    // Uppdatera Local Storage
    updateLocalStorage();

    // inbringa den nya uppgiften i listan
    addTaskToList({text: newTask, completed:false});

    // Rensa input-fältet efter tillägg så att det är tomt
    inputTodo.value = "";
}

// Ladda uppgifter från Local Storage när sidan laddas om på nytt
window.addEventListener("load", loadTasks);

// Denna är för att lägga till knappen ska fungera på hemsidan 
knappen.addEventListener("click", addTask);

// Denna är för att enter knappen ska fungera på hemsidan
inputTodo.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        addTask();
    }
});


