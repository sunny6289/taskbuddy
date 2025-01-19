// import { SelectChangeEvent } from "@mui/material"
import { Dayjs } from "dayjs"
import { Task } from "../../features/StateType/stateType";


export type DropdownProps = {
    value?: string,
    style?: React.CSSProperties,
    label: string,
    options: string[],
    defaultValue?: string,
    handleChange: (data: string)=> void
}

export type TextInputProps = {
    placeholder: string,
    value: string,
    style?: React.CSSProperties,
    onChange: (event: React.ChangeEvent<HTMLInputElement>)=> void,
}

export type ButtonProps = {
    variant: "text" | "contained" | "outlined",
    content: string,
    buttonStatus?: boolean,
    endIcon?: React.ReactNode,
    startIcon?: React.ReactNode,
    style?: React.CSSProperties,
    onClick: ()=>void
}

export type DatePickerProps = {
    value?: Dayjs | null
    label?: string,
    style?:  React.CSSProperties
    setDate?: (date: Dayjs | null) => void
}

export type TaskAccordianProps = {
    taskListTitle: "Todo" | "In-Progress" | "Completed",
    tasks: Task[],
    totalTask: number,
    style?: React.CSSProperties
}

export type ListTaskProps = {
    taskData: Task
}

export type BoardTaskProps = {
    task: Task
}

export type TaskBoardProps = {
    taskListTitle: "Todo" | "In-Progress" | "Completed",
    totalTask: number,
    tasks: Task[],
    style?: React.CSSProperties
}

export type TaskToolboxProps = {
    openModal?: ()=> void
}

export type AddTaskModalProps = {
    isOpen: boolean
}

export type EditTaskModalProps = {
    isOpen: boolean
}

export type MultiSelectUpdateProps = {
    totalSelectedTask: number
}