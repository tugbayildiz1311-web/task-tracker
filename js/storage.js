const STORAGE_KEY = "taskTrackerTasks";


export function loadTasks() {
    const storedTasks =
        localStorage.getItem(STORAGE_KEY);

    if (!storedTasks) {
        return [];
    }

    try {
        const parsedTasks =
            JSON.parse(storedTasks);

        return Array.isArray(parsedTasks)
            ? parsedTasks
            : [];
    } catch {
        return [];
    }
}


export function saveTasks(tasks) {
    localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(tasks)
    );
}