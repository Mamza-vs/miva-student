import { loadTasks } from "./taskUtils.js";

let tasks = [];

// Render all tasks
const renderTasks = () => {
    const taskList = document.getElementById("taskList");

    taskList.innerHTML = tasks
        .map(
            ({ text, done }, index) => `
                <li>
                    <span style="text-decoration: ${done ? "line-through" : "none"}">
                        ${text}
                    </span>

                    <button data-action="complete" data-index="${index}">
                        Complete
                    </button>

                    <button data-action="delete" data-index="${index}">
                        Delete
                    </button>
                </li>
            `
        )
        .join("");

    // Add click events to the buttons
    taskList.querySelectorAll("button").forEach((button) => {
        button.addEventListener("click", () => {
            const { action, index } = button.dataset;

            if (action === "complete") {
                completeTask(Number(index));
            }

            if (action === "delete") {
                deleteTask(Number(index));
            }
        });
    });
};

// Add a new task
const addTask = () => {
    const input = document.getElementById("taskInput");
    const taskText = input.value.trim();

    if (taskText === "") {
        alert("Please enter a task");
        return;
    }

    tasks.push({
        text: taskText,
        done: false
    });

    input.value = "";

    renderTasks();
};

// Complete a task
const completeTask = (index) => {
    tasks[index].done = true;

    renderTasks();
};

// Delete a task
const deleteTask = (index) => {
    tasks = tasks.filter((_, taskIndex) => taskIndex !== index);

    renderTasks();
};

// Connect the Add Task button
const addButton = document.getElementById("addTaskButton");

addButton.addEventListener("click", addTask);

// Load saved tasks when the page starts
const initialize = async () => {
    tasks = await loadTasks();

    renderTasks();
};

initialize();