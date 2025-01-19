export type initialModalState = {
    isAddTaskModalOpen: boolean,
    isEditTaskModalOpen: boolean
}

export type initialTaskViewState = {
    isListViewOpen: boolean,
    isBoardViewOpen: boolean
}

export type UploadedFile={
    file: File,
    preview: string
}

export type Task = {
    taskId: string,
    taskTitle: string,
    taskDescription: string,
    taskDueOn: string,
    taskCategory: string,
    taskStatus: string,
    taskFiles: UploadedFile[]
}

export type initialTaskState = {
    isFiltered: boolean,
    tasks: Task[],
    filteredTasks: Task[],
    selectedTasks: Task[],
    taskToEdit: Task
}

export type initialUserAuthState = {
    isAuth: boolean,
    profileImage: string
}