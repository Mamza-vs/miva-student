export const loadTasks = () => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve([
                {
                    text: "Study JavaScript",
                    done: false
                },
                {
                    text: "Build Miva project",
                    done: true
                }
            ]);
        }, 1000);
    });
};