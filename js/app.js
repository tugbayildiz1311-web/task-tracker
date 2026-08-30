import {
    loadTasks,
    saveTasks
} from "./storage.js";


import {
    TASK_STATUS,
    TASK_PRIORITY,
    getDomElements,
    renderTasks,
    updateListState,
    fillTaskForm,
    resetTaskForm,
    setEditMode,
    showFormMessage,
    showTitleError,
    clearTitleError
} from "./ui.js";


let tasks = loadTasks();

let editingTaskId = null;

const elements =
    getDomElements();


const VALID_STATUSES =
    Object.values(TASK_STATUS);

const VALID_PRIORITIES =
    Object.values(TASK_PRIORITY);


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


function getTaskById(taskId) {
    return tasks.find(
        (task) =>
            String(task.id) ===
            String(taskId)
    );
}


function getTaskIndexById(taskId) {
    return tasks.findIndex(
        (task) =>
            String(task.id) ===
            String(taskId)
    );
}


function getFormData() {
    return {
        title:
            elements.taskTitle.value.trim(),

        description:
            elements.taskDescription.value.trim(),

        priority:
            elements.taskPriority.value,

        status:
            elements.taskStatus.value,

        dueDate:
            elements.taskDueDate.value
    };
}


function validateTask(taskData) {
    if (!taskData.title) {
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

    if (
        !VALID_PRIORITIES.includes(
            taskData.priority
        )
    ) {
        return {
            field: "form",
            message:
                "Geçersiz öncelik değeri."
        };
    }

    if (
        !VALID_STATUSES.includes(
            taskData.status
        )
    ) {
        return {
            field: "form",
            message:
                "Geçersiz durum değeri."
        };
    }

    if (!isValidDate(taskData.dueDate)) {
        return {
            field: "form",
            message:
                "Geçerli bir son tarih seçiniz."
        };
    }

    return null;
}


function isValidDate(date) {
    if (!date) {
        return false;
    }

    const dateObject =
        new Date(`${date}T00:00:00`);

    return !Number.isNaN(
        dateObject.getTime()
    );
}


function handleValidationError(error) {
    if (error.field === "title") {
        showTitleError(
            elements,
            error.message
        );

        return;
    }

    showFormMessage(
        elements,
        error.message,
        "error"
    );
}


function createTask(taskData) {
    return {
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
}


function addTask(taskData) {
    tasks.push(
        createTask(taskData)
    );

    saveAndRefresh();

    finishFormAction(
        "Görev başarıyla eklendi."
    );
}


function updateTask(taskData) {
    const taskIndex =
        getTaskIndexById(
            editingTaskId
        );

    if (taskIndex === -1) {
        editingTaskId = null;

        resetTaskForm(elements);

        showFormMessage(
            elements,
            "Güncellenecek görev bulunamadı.",
            "error"
        );

        return;
    }

    tasks[taskIndex] = {
        ...tasks[taskIndex],
        ...taskData
    };

    saveAndRefresh();

    finishFormAction(
        "Görev başarıyla güncellendi."
    );
}


function finishFormAction(message) {
    editingTaskId = null;

    resetTaskForm(elements);

    showFormMessage(
        elements,
        message,
        "success"
    );
}


function startEditingTask(taskId) {
    const task =
        getTaskById(taskId);

    if (!task) {
        showFormMessage(
            elements,
            "Düzenlenecek görev bulunamadı.",
            "error"
        );

        return;
    }

    editingTaskId = task.id;

    fillTaskForm(
        elements,
        task
    );

    setEditMode(elements);
}


function deleteTask(taskId) {
    const taskIndex =
        getTaskIndexById(taskId);

    if (taskIndex === -1) {
        showFormMessage(
            elements,
            "Silinecek görev bulunamadı.",
            "error"
        );

        return;
    }

    if (!confirmDelete()) {
        return;
    }

    tasks.splice(taskIndex, 1);

    handleDeletedEditingTask(taskId);

    saveAndRefresh();

    showFormMessage(
        elements,
        "Görev başarıyla silindi.",
        "success"
    );
}


function confirmDelete() {
    return window.confirm(
        "Bu görevi silmek istediğinize emin misiniz?"
    );
}


function handleDeletedEditingTask(taskId) {
    if (
        String(editingTaskId) !==
        String(taskId)
    ) {
        return;
    }

    editingTaskId = null;

    resetTaskForm(elements);
}


function changeTaskStatus(taskId) {
    const task =
        getTaskById(taskId);

    if (!task) {
        showFormMessage(
            elements,
            "Durumu değiştirilecek görev bulunamadı.",
            "error"
        );

        return;
    }

    task.status =
        getNextStatus(task.status);

    saveAndRefresh();

    showFormMessage(
        elements,
        "Görev durumu güncellendi.",
        "success"
    );
}


function getNextStatus(currentStatus) {
    const statusOrder = [
        TASK_STATUS.TODO,
        TASK_STATUS.IN_PROGRESS,
        TASK_STATUS.DONE
    ];

    const currentIndex =
        statusOrder.indexOf(
            currentStatus
        );

    const nextIndex =
        (currentIndex + 1) %
        statusOrder.length;

    return statusOrder[nextIndex];
}


function saveAndRefresh() {
    saveTasks(tasks);
    applyFilters();
}


function getFilterState() {
    return {
        searchText:
            elements.searchInput.value
                .trim()
                .toLowerCase(),

        status:
            elements.statusFilter.value,

        priority:
            elements.priorityFilter.value,

        sort:
            elements.sortFilter.value
    };
}


function taskMatchesFilters(
    task,
    filters
) {
    return (
        matchesSearch(task, filters.searchText) &&
        matchesStatus(task, filters.status) &&
        matchesPriority(task, filters.priority)
    );
}


function matchesSearch(
    task,
    searchText
) {
    if (!searchText) {
        return true;
    }

    const title =
        String(
            task.title || ""
        ).toLowerCase();

    const description =
        String(
            task.description || ""
        ).toLowerCase();

    return (
        title.includes(searchText) ||
        description.includes(searchText)
    );
}


function matchesStatus(
    task,
    selectedStatus
) {
    return (
        selectedStatus === "all" ||
        task.status === selectedStatus
    );
}


function matchesPriority(
    task,
    selectedPriority
) {
    return (
        selectedPriority === "all" ||
        task.priority ===
            selectedPriority
    );
}


function sortFilteredTasks(
    filteredTasks,
    sortType
) {
    if (sortType !== "due-date-asc") {
        return filteredTasks;
    }

    return [...filteredTasks].sort(
        compareTasksByDueDate
    );
}


function compareTasksByDueDate(
    firstTask,
    secondTask
) {
    const firstDate =
        getSortableDate(
            firstTask.dueDate
        );

    const secondDate =
        getSortableDate(
            secondTask.dueDate
        );

    if (!firstDate && !secondDate) {
        return 0;
    }

    if (!firstDate) {
        return 1;
    }

    if (!secondDate) {
        return -1;
    }

    return firstDate - secondDate;
}


function getSortableDate(date) {
    if (!date) {
        return null;
    }

    const dateObject =
        new Date(`${date}T00:00:00`);

    return Number.isNaN(
        dateObject.getTime()
    )
        ? null
        : dateObject;
}


function hasActiveFilters(filters) {
    return (
        filters.searchText !== "" ||
        filters.status !== "all" ||
        filters.priority !== "all" ||
        filters.sort !== "default"
    );
}


function applyFilters() {
    const filters =
        getFilterState();

    const matchingTasks =
        tasks.filter(
            (task) =>
                taskMatchesFilters(
                    task,
                    filters
                )
        );

    const visibleTasks =
        sortFilteredTasks(
            matchingTasks,
            filters.sort
        );

    renderTasks(
        visibleTasks,
        elements.taskList
    );

    updateListState(
        elements,
        visibleTasks.length,
        tasks.length,
        hasActiveFilters(filters)
    );
}


function handleFormSubmit(event) {
    event.preventDefault();

    clearTitleError(elements);

    const taskData =
        getFormData();

    const validationError =
        validateTask(taskData);

    if (validationError) {
        handleValidationError(
            validationError
        );

        return;
    }

    if (editingTaskId !== null) {
        updateTask(taskData);
        return;
    }

    addTask(taskData);
}


function handleTaskListClick(event) {
    const button =
        event.target.closest(
            "button[data-action]"
        );

    if (!button) {
        return;
    }

    const taskId =
        button.dataset.id;

    const action =
        button.dataset.action;

    handleTaskAction(
        action,
        taskId
    );
}


function handleTaskAction(
    action,
    taskId
) {
    const actions = {
        edit:
            startEditingTask,

        status:
            changeTaskStatus,

        delete:
            deleteTask
    };

    const selectedAction =
        actions[action];

    if (selectedAction) {
        selectedAction(taskId);
    }
}


function handleTitleInput() {
    if (
        elements.taskTitle.value
            .trim() !== ""
    ) {
        clearTitleError(elements);
    }
}


function registerEvents() {
    elements.taskForm.addEventListener(
        "submit",
        handleFormSubmit
    );

    elements.taskList.addEventListener(
        "click",
        handleTaskListClick
    );

    elements.taskTitle.addEventListener(
        "input",
        handleTitleInput
    );

    elements.searchInput.addEventListener(
        "input",
        applyFilters
    );

    elements.statusFilter.addEventListener(
        "change",
        applyFilters
    );

    elements.priorityFilter.addEventListener(
        "change",
        applyFilters
    );

    elements.sortFilter.addEventListener(
        "change",
        applyFilters
    );
}


function initializeApp() {
    registerEvents();
    applyFilters();
}


initializeApp();