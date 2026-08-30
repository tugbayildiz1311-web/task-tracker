export const TASK_STATUS = Object.freeze({
    TODO: "todo",
    IN_PROGRESS: "in-progress",
    DONE: "done"
});


export const TASK_PRIORITY = Object.freeze({
    LOW: "low",
    MEDIUM: "medium",
    HIGH: "high"
});


let messageTimeoutId = null;


export function getDomElements() {
    return {
        taskForm:
            document.getElementById("taskForm"),

        taskTitle:
            document.getElementById("taskTitle"),

        taskDescription:
            document.getElementById("taskDescription"),

        taskPriority:
            document.getElementById("taskPriority"),

        taskStatus:
            document.getElementById("taskStatus"),

        taskDueDate:
            document.getElementById("taskDueDate"),

        formMessage:
            document.getElementById("formMessage"),

        titleError:
            document.getElementById("titleError"),

        taskList:
            document.getElementById("taskList"),

        emptyState:
            document.getElementById("emptyState"),

        emptyStateTitle:
            document.getElementById("emptyStateTitle"),

        emptyStateText:
            document.getElementById("emptyStateText"),

        resultCount:
            document.getElementById("resultCount"),

        searchInput:
            document.getElementById("taskSearch"),

        statusFilter:
            document.getElementById("statusFilter"),

        priorityFilter:
            document.getElementById("priorityFilter"),

        sortFilter:
            document.getElementById("sortFilter"),

        submitButton:
            document.querySelector(
                '#taskForm button[type="submit"]'
            )
    };
}


export function renderTasks(tasks, taskList) {
    taskList.textContent = "";

    tasks.forEach((task) => {
        taskList.append(
            createTaskCard(task)
        );
    });
}


function createTaskCard(task) {
    const card =
        document.createElement("article");

    card.classList.add("task-card");
    card.dataset.id = task.id;

    if (task.status === TASK_STATUS.DONE) {
        card.classList.add("task-completed");
    }

    card.append(createTaskHeader(task));

    if (isTaskOverdue(task)) {
        card.append(
            createBadge(
                "Gecikti",
                "badge-overdue"
            )
        );
    }

    card.append(
        createDescription(task),
        createTaskInfo(task),
        createTaskActions(task)
    );

    return card;
}


function createTaskHeader(task) {
    const header =
        document.createElement("div");

    header.classList.add(
        "task-card-header"
    );

    const title =
        document.createElement("h3");

    title.textContent = task.title;

    const priorityBadge =
        createBadge(
            getPriorityText(task.priority),
            `badge-${task.priority}`
        );

    header.append(
        title,
        priorityBadge
    );

    return header;
}


function createDescription(task) {
    const description =
        document.createElement("p");

    description.textContent =
        task.description ||
        "Açıklama bulunmuyor";

    return description;
}


function createTaskInfo(task) {
    const taskInfo =
        document.createElement("div");

    taskInfo.classList.add("task-info");

    const status =
        document.createElement("span");

    status.textContent =
        `Durum: ${getStatusText(task.status)}`;

    const dueDate =
        document.createElement("span");

    dueDate.textContent =
        `Son Tarih: ${formatDate(task.dueDate)}`;

    taskInfo.append(
        status,
        dueDate
    );

    return taskInfo;
}


function createTaskActions(task) {
    const actions =
        document.createElement("div");

    actions.classList.add(
        "task-actions"
    );

    actions.append(
        createActionButton(
            "Düzenle",
            "edit",
            task.id,
            "button-secondary"
        ),

        createActionButton(
            "Durum Değiştir",
            "status",
            task.id,
            "button-status"
        ),

        createActionButton(
            "Sil",
            "delete",
            task.id,
            "button-danger"
        )
    );

    return actions;
}


function createActionButton(
    text,
    action,
    taskId,
    className
) {
    const button =
        document.createElement("button");

    button.type = "button";
    button.textContent = text;

    button.dataset.action = action;
    button.dataset.id = taskId;

    button.classList.add(
        "button",
        className
    );

    return button;
}


function createBadge(text, className) {
    const badge =
        document.createElement("span");

    badge.classList.add(
        "badge",
        className
    );

    badge.textContent = text;

    return badge;
}


export function updateListState(
    elements,
    visibleCount,
    totalCount,
    hasActiveFilters
) {
    elements.resultCount.textContent =
        `${totalCount} görevden ${visibleCount} tanesi gösteriliyor`;

    if (visibleCount > 0) {
        elements.emptyState.hidden = true;
        return;
    }

    elements.emptyState.hidden = false;

    setEmptyStateMessage(
        elements,
        totalCount,
        hasActiveFilters
    );
}


function setEmptyStateMessage(
    elements,
    totalCount,
    hasActiveFilters
) {
    const noFilterResult =
        totalCount > 0 &&
        hasActiveFilters;

    elements.emptyStateTitle.textContent =
        noFilterResult
            ? "Filtrelere uygun görev bulunamadı"
            : "Henüz görev bulunmuyor";

    elements.emptyStateText.textContent =
        noFilterResult
            ? "Arama veya filtre seçeneklerini değiştirerek tekrar deneyebilirsiniz."
            : "Yeni bir görev ekleyerek başlayabilirsiniz.";
}


export function fillTaskForm(
    elements,
    task
) {
    elements.taskTitle.value =
        task.title;

    elements.taskDescription.value =
        task.description;

    elements.taskPriority.value =
        task.priority;

    elements.taskStatus.value =
        task.status;

    elements.taskDueDate.value =
        task.dueDate;
}


export function resetTaskForm(elements) {
    elements.taskForm.reset();

    elements.taskPriority.value =
        TASK_PRIORITY.MEDIUM;

    elements.taskStatus.value =
        TASK_STATUS.TODO;

    elements.submitButton.textContent =
        "Görevi Kaydet";

    clearTitleError(elements);
}


export function setEditMode(elements) {
    elements.submitButton.textContent =
        "Görevi Güncelle";

    elements.taskTitle.focus();

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}


export function showFormMessage(
    elements,
    message,
    type
) {
    clearTimeout(messageTimeoutId);

    elements.formMessage.textContent =
        message;

    elements.formMessage.classList.remove(
        "message-success",
        "message-error"
    );

    elements.formMessage.classList.add(
        type === "success"
            ? "message-success"
            : "message-error"
    );

    messageTimeoutId =
        setTimeout(() => {
            clearFormMessage(elements);
        }, 2500);
}


export function clearFormMessage(elements) {
    elements.formMessage.textContent = "";

    elements.formMessage.classList.remove(
        "message-success",
        "message-error"
    );
}


export function showTitleError(
    elements,
    message
) {
    elements.titleError.textContent =
        message;

    elements.taskTitle.classList.add(
        "input-invalid"
    );

    elements.taskTitle.focus();
}


export function clearTitleError(elements) {
    elements.titleError.textContent = "";

    elements.taskTitle.classList.remove(
        "input-invalid"
    );
}


function getPriorityText(priority) {
    const priorityTexts = {
        [TASK_PRIORITY.LOW]: "Low",
        [TASK_PRIORITY.MEDIUM]: "Medium",
        [TASK_PRIORITY.HIGH]: "High"
    };

    return (
        priorityTexts[priority] ||
        priority
    );
}


function getStatusText(status) {
    const statusTexts = {
        [TASK_STATUS.TODO]: "Todo",

        [TASK_STATUS.IN_PROGRESS]:
            "In Progress",

        [TASK_STATUS.DONE]:
            "Done"
    };

    return (
        statusTexts[status] ||
        status
    );
}


function getValidDate(date) {
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


function formatDate(date) {
    const dateObject =
        getValidDate(date);

    if (!dateObject) {
        return "Tarih belirtilmedi";
    }

    return dateObject.toLocaleDateString(
        "tr-TR"
    );
}


function isTaskOverdue(task) {
    if (
        task.status ===
        TASK_STATUS.DONE
    ) {
        return false;
    }

    const dueDate =
        getValidDate(task.dueDate);

    if (!dueDate) {
        return false;
    }

    const today = new Date();

    today.setHours(0, 0, 0, 0);

    return dueDate < today;
}