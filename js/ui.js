function renderTasks(tasksToRender) {
    const taskList =
        document.getElementById("taskList");

    taskList.textContent = "";

    tasksToRender.forEach((task) => {
        const card =
            document.createElement("article");

        card.classList.add("task-card");
        card.setAttribute("data-id", task.id);


        if (task.status === "done") {
            card.classList.add(
                "task-completed"
            );
        }


        const cardHeader =
            document.createElement("div");

        cardHeader.classList.add(
            "task-card-header"
        );


        const title =
            document.createElement("h3");

        title.textContent = task.title;


        const priorityBadge =
            document.createElement("span");

        priorityBadge.classList.add(
            "badge",
            `badge-${task.priority}`
        );

        priorityBadge.textContent =
            getPriorityText(task.priority);


        cardHeader.append(
            title,
            priorityBadge
        );


        if (isTaskOverdue(task)) {
            const overdueBadge =
                document.createElement("span");

            overdueBadge.classList.add(
                "badge",
                "badge-overdue"
            );

            overdueBadge.textContent =
                "Gecikti";

            card.append(overdueBadge);
        }


        const description =
            document.createElement("p");

        description.textContent =
            task.description ||
            "Açıklama bulunmuyor";


        const taskInfo =
            document.createElement("div");

        taskInfo.classList.add(
            "task-info"
        );


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


        const taskActions =
            document.createElement("div");

        taskActions.classList.add(
            "task-actions"
        );


        const editButton =
            document.createElement("button");

        editButton.type = "button";

        editButton.classList.add(
            "button",
            "button-secondary"
        );

        editButton.textContent =
            "Düzenle";

        editButton.addEventListener(
            "click",
            function () {
                editTask(task.id);
            }
        );


        const statusButton =
            document.createElement("button");

        statusButton.type = "button";

        statusButton.classList.add(
            "button",
            "button-status"
        );

        statusButton.textContent =
            "Durum Değiştir";

        statusButton.addEventListener(
            "click",
            function () {
                changeTaskStatus(task.id);
            }
        );


        const deleteButton =
            document.createElement("button");

        deleteButton.type = "button";

        deleteButton.classList.add(
            "button",
            "button-danger"
        );

        deleteButton.textContent =
            "Sil";

        deleteButton.addEventListener(
            "click",
            function () {
                deleteTask(task.id);
            }
        );


        taskActions.append(
            editButton,
            statusButton,
            deleteButton
        );


        card.append(
            cardHeader,
            description,
            taskInfo,
            taskActions
        );

        taskList.append(card);
    });
}


function updateListState(
    visibleCount,
    totalCount,
    hasActiveFilters
) {
    const emptyState =
        document.getElementById("emptyState");

    const emptyStateTitle =
        document.getElementById(
            "emptyStateTitle"
        );

    const emptyStateText =
        document.getElementById(
            "emptyStateText"
        );

    const resultCount =
        document.getElementById(
            "resultCount"
        );


    resultCount.textContent =
        `${totalCount} görevden ${visibleCount} tanesi gösteriliyor`;


    if (visibleCount > 0) {
        emptyState.hidden = true;
        return;
    }


    emptyState.hidden = false;


    if (
        totalCount > 0 &&
        hasActiveFilters
    ) {
        emptyStateTitle.textContent =
            "Filtrelere uygun görev bulunamadı";

        emptyStateText.textContent =
            "Arama veya filtre seçeneklerini değiştirerek tekrar deneyebilirsiniz.";

        return;
    }


    emptyStateTitle.textContent =
        "Henüz görev bulunmuyor";

    emptyStateText.textContent =
        "Yeni bir görev ekleyerek başlayabilirsiniz.";
}


function getPriorityText(priority) {
    const priorityTexts = {
        low: "Low",
        medium: "Medium",
        high: "High"
    };

    return priorityTexts[priority] || priority;
}


function getStatusText(status) {
    const statusTexts = {
        todo: "Todo",
        "in-progress": "In Progress",
        done: "Done"
    };

    return statusTexts[status] || status;
}


function getValidDate(date) {
    if (!date) {
        return null;
    }

    const dateObject =
        new Date(`${date}T00:00:00`);

    if (
        Number.isNaN(
            dateObject.getTime()
        )
    ) {
        return null;
    }

    return dateObject;
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
    if (task.status === "done") {
        return false;
    }

    const dueDate =
        getValidDate(task.dueDate);

    if (!dueDate) {
        return false;
    }


    const today = new Date();

    today.setHours(
        0,
        0,
        0,
        0
    );


    return dueDate < today;
}