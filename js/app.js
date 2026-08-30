let tasks = loadTasks();

let editingTaskId = null;


const taskForm =
    document.getElementById("taskForm");

const taskTitle =
    document.getElementById("taskTitle");

const taskDescription =
    document.getElementById(
        "taskDescription"
    );

const taskPriority =
    document.getElementById(
        "taskPriority"
    );

const taskStatus =
    document.getElementById(
        "taskStatus"
    );

const taskDueDate =
    document.getElementById(
        "taskDueDate"
    );

const formMessage =
    document.getElementById(
        "formMessage"
    );

const titleError =
    document.getElementById(
        "titleError"
    );

const submitButton =
    taskForm.querySelector(
        'button[type="submit"]'
    );


const searchInput =
    document.getElementById(
        "taskSearch"
    );

const statusFilter =
    document.getElementById(
        "statusFilter"
    );

const priorityFilter =
    document.getElementById(
        "priorityFilter"
    );

const sortFilter =
    document.getElementById(
        "sortFilter"
    );


function createTaskId() {
    if (
        typeof crypto !== "undefined" &&
        typeof crypto.randomUUID ===
            "function"
    ) {
        return crypto.randomUUID();
    }

    return Date.now().toString();
}


function validateTask(taskData) {
    if (taskData.title === "") {
        return {
            field: "title",
            message:
                "Görev başlığı boş bırakılamaz."
        };
    }


    if (taskData.title.length > 100) {
        return {
            field: "title",
            message:
                "Görev başlığı en fazla 100 karakter olabilir."
        };
    }


    const validPriorities = [
        "low",
        "medium",
        "high"
    ];

    if (
        !validPriorities.includes(
            taskData.priority
        )
    ) {
        return {
            field: "form",
            message:
                "Geçersiz öncelik değeri."
        };
    }


    const validStatuses = [
        "todo",
        "in-progress",
        "done"
    ];

    if (
        !validStatuses.includes(
            taskData.status
        )
    ) {
        return {
            field: "form",
            message:
                "Geçersiz durum değeri."
        };
    }


    if (taskData.dueDate === "") {
        return {
            field: "form",
            message:
                "Son tarih boş bırakılamaz."
        };
    }


    const dateObject =
        new Date(
            `${taskData.dueDate}T00:00:00`
        );

    if (
        Number.isNaN(
            dateObject.getTime()
        )
    ) {
        return {
            field: "form",
            message:
                "Geçerli bir son tarih seçiniz."
        };
    }


    return null;
}


function showFormMessage(
    message,
    type
) {
    formMessage.textContent =
        message;

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


function clearValidationMessages() {
    titleError.textContent = "";

    taskTitle.classList.remove(
        "input-invalid"
    );
}


function showValidationError(error) {
    clearValidationMessages();


    if (error.field === "title") {
        titleError.textContent =
            error.message;

        taskTitle.classList.add(
            "input-invalid"
        );

        taskTitle.focus();

        return;
    }


    showFormMessage(
        error.message,
        "error"
    );
}


function resetFormMode() {
    editingTaskId = null;

    taskForm.reset();

    taskPriority.value = "medium";
    taskStatus.value = "todo";

    submitButton.textContent =
        "Görevi Kaydet";

    clearValidationMessages();
}


function getTaskById(taskId) {
    return tasks.find(
        (task) =>
            task.id === taskId
    );
}


function editTask(taskId) {
    const task =
        getTaskById(taskId);


    if (!task) {
        showFormMessage(
            "Düzenlenecek görev bulunamadı.",
            "error"
        );

        return;
    }


    editingTaskId = task.id;

    taskTitle.value =
        task.title;

    taskDescription.value =
        task.description;

    taskPriority.value =
        task.priority;

    taskStatus.value =
        task.status;

    taskDueDate.value =
        task.dueDate;


    submitButton.textContent =
        "Görevi Güncelle";


    clearValidationMessages();

    taskTitle.focus();


    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}


function deleteTask(taskId) {
    const taskIndex =
        tasks.findIndex(
            (task) =>
                task.id === taskId
        );


    if (taskIndex === -1) {
        showFormMessage(
            "Silinecek görev bulunamadı.",
            "error"
        );

        return;
    }


    const confirmed =
        confirm(
            "Bu görevi silmek istediğinize emin misiniz?"
        );


    if (!confirmed) {
        return;
    }


    tasks.splice(
        taskIndex,
        1
    );

    saveTasks(tasks);

    applyFilters();


    if (
        editingTaskId === taskId
    ) {
        resetFormMode();
    }


    showFormMessage(
        "Görev başarıyla silindi.",
        "success"
    );
}


function changeTaskStatus(taskId) {
    const task =
        getTaskById(taskId);


    if (!task) {
        showFormMessage(
            "Durumu değiştirilecek görev bulunamadı.",
            "error"
        );

        return;
    }


    if (task.status === "todo") {
        task.status =
            "in-progress";

    } else if (
        task.status ===
        "in-progress"
    ) {
        task.status = "done";

    } else {
        task.status = "todo";
    }


    saveTasks(tasks);

    applyFilters();


    showFormMessage(
        "Görev durumu güncellendi.",
        "success"
    );
}


function getDateForSorting(date) {
    if (!date) {
        return null;
    }


    const dateObject =
        new Date(
            `${date}T00:00:00`
        );


    if (
        Number.isNaN(
            dateObject.getTime()
        )
    ) {
        return null;
    }


    return dateObject;
}


function applyFilters() {
    const searchText =
        searchInput.value
            .trim()
            .toLowerCase();

    const selectedStatus =
        statusFilter.value;

    const selectedPriority =
        priorityFilter.value;

    const selectedSort =
        sortFilter.value;


    let filteredTasks =
        tasks.filter((task) => {
            const normalizedTitle =
                String(
                    task.title || ""
                ).toLowerCase();

            const normalizedDescription =
                String(
                    task.description || ""
                ).toLowerCase();


            const matchesSearch =
                searchText === "" ||
                normalizedTitle.includes(
                    searchText
                ) ||
                normalizedDescription.includes(
                    searchText
                );


            const matchesStatus =
                selectedStatus ===
                    "all" ||
                task.status ===
                    selectedStatus;


            const matchesPriority =
                selectedPriority ===
                    "all" ||
                task.priority ===
                    selectedPriority;


            return (
                matchesSearch &&
                matchesStatus &&
                matchesPriority
            );
        });


    if (
        selectedSort ===
        "due-date-asc"
    ) {
        filteredTasks =
            [...filteredTasks].sort(
                (firstTask, secondTask) => {
                    const firstDate =
                        getDateForSorting(
                            firstTask.dueDate
                        );

                    const secondDate =
                        getDateForSorting(
                            secondTask.dueDate
                        );


                    if (
                        !firstDate &&
                        !secondDate
                    ) {
                        return 0;
                    }


                    if (!firstDate) {
                        return 1;
                    }


                    if (!secondDate) {
                        return -1;
                    }


                    return (
                        firstDate -
                        secondDate
                    );
                }
            );
    }


    const hasActiveFilters =
        searchText !== "" ||
        selectedStatus !== "all" ||
        selectedPriority !== "all" ||
        selectedSort !== "default";


    renderTasks(filteredTasks);

    updateListState(
        filteredTasks.length,
        tasks.length,
        hasActiveFilters
    );
}


taskForm.addEventListener(
    "submit",
    function (event) {
        event.preventDefault();

        clearValidationMessages();


        const taskData = {
            title:
                taskTitle.value.trim(),

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


        if (
            validationError !== null
        ) {
            showValidationError(
                validationError
            );

            return;
        }


        if (
            editingTaskId !== null
        ) {
            const taskIndex =
                tasks.findIndex(
                    (task) =>
                        task.id ===
                        editingTaskId
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

                title:
                    taskData.title,

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

            applyFilters();

            resetFormMode();


            showFormMessage(
                "Görev başarıyla güncellendi.",
                "success"
            );

        } else {
            const newTask = {
                id:
                    createTaskId(),

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

            applyFilters();

            resetFormMode();


            showFormMessage(
                "Görev başarıyla eklendi.",
                "success"
            );
        }


        setTimeout(
            function () {
                formMessage.textContent =
                    "";

                formMessage.classList.remove(
                    "message-success",
                    "message-error"
                );
            },
            2500
        );
    }
);


taskTitle.addEventListener(
    "input",
    function () {
        if (
            taskTitle.value
                .trim() !== ""
        ) {
            titleError.textContent =
                "";

            taskTitle.classList.remove(
                "input-invalid"
            );
        }
    }
);


searchInput.addEventListener(
    "input",
    applyFilters
);


statusFilter.addEventListener(
    "change",
    applyFilters
);


priorityFilter.addEventListener(
    "change",
    applyFilters
);


sortFilter.addEventListener(
    "change",
    applyFilters
);


applyFilters();