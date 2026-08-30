let tasks = loadTasks();

let editingTaskId = null;


const taskForm =
    document.getElementById("taskForm");

const taskTitle =
    document.getElementById("taskTitle");

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

const submitButton =
    taskForm.querySelector('button[type="submit"]');


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
            new Date(
                `${taskData.dueDate}T00:00:00`
            ).getTime()
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


function resetFormMode() {
    editingTaskId = null;

    taskForm.reset();

    taskPriority.value = "medium";
    taskStatus.value = "todo";

    submitButton.textContent = "Görevi Kaydet";
}


function editTask(taskId) {
    const task = tasks.find(
        (task) => task.id === taskId
    );

    if (!task) {
        showFormMessage(
            "Düzenlenecek görev bulunamadı.",
            "error"
        );

        return;
    }

    editingTaskId = task.id;

    taskTitle.value = task.title;
    taskDescription.value = task.description;
    taskPriority.value = task.priority;
    taskStatus.value = task.status;
    taskDueDate.value = task.dueDate;

    submitButton.textContent =
        "Görevi Güncelle";

    taskTitle.focus();

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}


function deleteTask(taskId) {
    const taskIndex = tasks.findIndex(
        (task) => task.id === taskId
    );

    if (taskIndex === -1) {
        showFormMessage(
            "Silinecek görev bulunamadı.",
            "error"
        );

        return;
    }

    const confirmed = confirm(
        "Bu görevi silmek istediğinize emin misiniz?"
    );

    if (!confirmed) {
        return;
    }

    tasks.splice(taskIndex, 1);

    saveTasks(tasks);

    renderTasks(tasks);

    if (editingTaskId === taskId) {
        resetFormMode();
    }

    showFormMessage(
        "Görev başarıyla silindi.",
        "success"
    );
}


function changeTaskStatus(taskId) {
    const task = tasks.find(
        (task) => task.id === taskId
    );

    if (!task) {
        showFormMessage(
            "Durumu değiştirilecek görev bulunamadı.",
            "error"
        );

        return;
    }

    if (task.status === "todo") {
        task.status = "in-progress";

    } else if (task.status === "in-progress") {
        task.status = "done";

    } else {
        task.status = "todo";
    }

    saveTasks(tasks);

    renderTasks(tasks);

    showFormMessage(
        "Görev durumu güncellendi.",
        "success"
    );
}


taskForm.addEventListener(
    "submit",
    function (event) {
        event.preventDefault();

        const taskData = {
            title: taskTitle.value.trim(),

            description:
                taskDescription.value.trim(),

            priority:
                taskPriority.value,

            status:
                taskStatus.value,

            dueDate:
                taskDueDate.value
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


        if (editingTaskId !== null) {
            const taskIndex = tasks.findIndex(
                (task) =>
                    task.id === editingTaskId
            );

            if (taskIndex === -1) {
                showFormMessage(
                    "Güncellenecek görev bulunamadı.",
                    "error"
                );

                resetFormMode();
                return;
            }

            tasks[taskIndex] = {
                ...tasks[taskIndex],

                title: taskData.title,

                description:
                    taskData.description,

                priority:
                    taskData.priority,

                status:
                    taskData.status,

                dueDate:
                    taskData.dueDate
            };

            saveTasks(tasks);

            renderTasks(tasks);

            resetFormMode();

            showFormMessage(
                "Görev başarıyla güncellendi.",
                "success"
            );

        } else {
            const newTask = {
                id: createTaskId(),

                title:
                    taskData.title,

                description:
                    taskData.description,

                priority:
                    taskData.priority,

                status:
                    taskData.status,

                dueDate:
                    taskData.dueDate,

                createdAt:
                    new Date().toISOString()
            };

            tasks.push(newTask);

            saveTasks(tasks);

            renderTasks(tasks);

            resetFormMode();

            showFormMessage(
                "Görev başarıyla eklendi.",
                "success"
            );
        }


        setTimeout(function () {
            formMessage.textContent = "";

            formMessage.classList.remove(
                "message-success",
                "message-error"
            );
        }, 2500);
    }
);


renderTasks(tasks);