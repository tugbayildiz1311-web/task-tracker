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

        if (!Array.isArray(parsedTasks)) {
            localStorage.removeItem(
                STORAGE_KEY
            );

            return [];
        }

        return parsedTasks;

    } catch {
        localStorage.removeItem(
            STORAGE_KEY
        );

        return [];
    }
}


export function saveTasks(tasks) {
    localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(tasks)
    );
}