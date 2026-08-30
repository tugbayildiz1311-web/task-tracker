function renderTasks(tasksToRender) {
    const taskList = document.getElementById("taskList");
    const emptyState = document.getElementById("emptyState");

    taskList.textContent = "";

    if (tasksToRender.length === 0) {
        emptyState.hidden = false;
        return;
    }

    emptyState.hidden = true;

    tasksToRender.forEach((task) => {
        const card = document.createElement("article");
        card.classList.add("task-card");
        card.setAttribute("data-id", task.id);

        const cardHeader = document.createElement("div");
        cardHeader.classList.add("task-card-header");

        const title = document.createElement("h3");
        title.textContent = task.title;

        const priorityBadge = document.createElement("span");
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


        const description = document.createElement("p");

        description.textContent =
            task.description || "Açıklama bulunmuyor";


        const taskInfo = document.createElement("div");
        taskInfo.classList.add("task-info");

        const status = document.createElement("span");

        status.textContent =
            `Durum: ${getStatusText(task.status)}`;

        const dueDate = document.createElement("span");

        dueDate.textContent =
            `Son Tarih: ${formatDate(task.dueDate)}`;

        taskInfo.append(
            status,
            dueDate
        );


        const taskActions = document.createElement("div");
        taskActions.classList.add("task-actions");

        const editButton = document.createElement("button");
        editButton.type = "button";
        editButton.classList.add(
            "button",
            "button-secondary"
        );
        editButton.textContent = "Düzenle";

        const deleteButton = document.createElement("button");
        deleteButton.type = "button";
        deleteButton.classList.add(
            "button",
            "button-danger"
        );
        deleteButton.textContent = "Sil";

        taskActions.append(
            editButton,
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


function formatDate(date) {
    if (!date) {
        return "Tarih belirtilmedi";
    }

    const dateObject = new Date(`${date}T00:00:00`);

    if (Number.isNaN(dateObject.getTime())) {
        return "Geçersiz tarih";
    }

    return dateObject.toLocaleDateString("tr-TR");
}