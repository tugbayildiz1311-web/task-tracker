let tasks = loadTasks();


const taskForm = document.getElementById("taskForm");

const taskTitle = document.getElementById("taskTitle");
const taskDescription =
    document.getElementById("taskDescription");

const taskPriority =
    document.getElementById("taskPriority");

const taskStatus =
    document.getElementById("taskStatus");

const taskDueDate =
    document.getElementById("taskDueDate");

const formMessage =
    document.getElementById("formMessage");


function createTaskId() {
    if (
        typeof crypto !== "undefined" &&
        typeof crypto.randomUUID === "function"
    ) {
        return crypto.randomUUID();
    }

    return Date.now().toString();
}


function validateTask(taskData) {
    if (taskData.title === "") {
        return "Görev başlığı boş bırakılamaz.";
    }

    if (taskData.title.length > 100) {
        return "Görev başlığı en fazla 100 karakter olabilir.";
    }

    const validPriorities = [
        "low",
        "medium",
        "high"
    ];

    if (!validPriorities.includes(taskData.priority)) {
        return "Geçersiz öncelik değeri.";
    }

    const validStatuses = [
        "todo",
        "in-progress",
        "done"
    ];

    if (!validStatuses.includes(taskData.status)) {
        return "Geçersiz durum değeri.";
    }

    if (
        taskData.dueDate === "" ||
        Number.isNaN(
            new Date(`${taskData.dueDate}T00:00:00`).getTime()
        )
    ) {
        return "Geçerli bir son tarih seçiniz.";
    }

    return null;
}


function showFormMessage(message, type) {
    formMessage.textContent = message;

    formMessage.classList.remove(
        "message-success",
        "message-error"
    );

    if (type === "success") {
        formMessage.classList.add(
            "message-success"
        );
    }

    if (type === "error") {
        formMessage.classList.add(
            "message-error"
        );
    }
}


taskForm.addEventListener(
    "submit",
    function (event) {
        event.preventDefault();

        const taskData = {
            title: taskTitle.value.trim(),
            description:
                taskDescription.value.trim(),
            priority: taskPriority.value,
            status: taskStatus.value,
            dueDate: taskDueDate.value
        };


        const validationError =
            validateTask(taskData);

        if (validationError !== null) {
            showFormMessage(
                validationError,
                "error"
            );

            return;
        }


        const newTask = {
            id: createTaskId(),
            title: taskData.title,
            description: taskData.description,
            priority: taskData.priority,
            status: taskData.status,
            dueDate: taskData.dueDate,
            createdAt: new Date().toISOString()
        };


        tasks.push(newTask);

        saveTasks(tasks);

        renderTasks(tasks);

        taskForm.reset();

        taskPriority.value = "medium";
        taskStatus.value = "todo";

        showFormMessage(
            "Görev başarıyla eklendi.",
            "success"
        );


        setTimeout(function () {
            formMessage.textContent = "";

            formMessage.classList.remove(
                "message-success"
            );
        }, 2500);
    }
);


renderTasks(tasks);