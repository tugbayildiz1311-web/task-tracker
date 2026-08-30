const STORAGE_KEY = "taskTrackerTasks";

function loadTasks() {
    const storedTasks = localStorage.getItem(STORAGE_KEY);

    if (storedTasks === null) {
        return [];
    }

    try {
        const parsedTasks = JSON.parse(storedTasks);

        if (!Array.isArray(parsedTasks)) {
            return [];
        }

        return parsedTasks;

    } catch (error) {
        console.error(
            "Görevler LocalStorage'dan okunamadı:",
            error
        );

        return [];
    }
}

function saveTasks(tasks) {
    localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(tasks)
    );
}