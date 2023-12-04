import React, {ChangeEvent, KeyboardEvent, useState} from 'react'
import {FilterValuesType} from "./App"



export type TaskType = {
    title: string,
    id: string,
    isDone: boolean
}
type PropsType = {
    title: string,
    tasks: Array<TaskType>,
    removeTask: (taskId: string) => void,
    changeFilter: (value: FilterValuesType) => void,
    addTask: (title:string)=>void,
    changeTaskStatus: (id: string, isDone: boolean) => void,
    filter: string
}

export function Todolist (props:PropsType) {
    // делаем стейт для названия новой таски
    const [title, setTitle] = useState('')
    const [error, setError] = useState<string | null>(null)

    const addTask = () => {
        if (title.trim() !== '') {
            props.addTask(title.trim())
            setTitle("")
        } else {
            setError('Title is required')
        }
            }
    const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setTitle(event.currentTarget.value)
    }
    const onKeyPressHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        setError(null)
        if(event.key === 'Enter') {
            addTask()
        }}
        const onAllClickHandler = () => {
            props.changeFilter("all")
        }
        const onActiveClickHandler = () => {
        props.changeFilter("active")
    }
    const onCompletedClickHandler = () => {
        props.changeFilter("completed")
    }
    return(

            <div className = "Todolist">
                <h3>{props.title}</h3>
                <div>
                    <input value={title}
                           onChange={onChangeHandler}
                           onKeyPress={onKeyPressHandler}
                           className={error? 'error': ''}
                    />
                    <button onClick={addTask}>+</button>
                    {error && <div className= 'error-message'>{error}</div> }
                </div>
                <ul>
                    {/*Вставляем метод map прямо в улку */}
                    {/* t =  Это параметр функции, одна таска - одна строчка в списке */}
                    {props.tasks.map(t => {
                       const onClickHandler = () => props.removeTask(t.id)
                        const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                            let newIsDoneValue = e.currentTarget.checked
                            props.changeTaskStatus(t.id, newIsDoneValue)
                        }
                        return (
                            <li key = {t.id}
                                className={t.isDone? 'is-done': ''}>
                                <input type = "checkbox" checked = {t.isDone} onChange={onChangeHandler} />
                                    <span>{t.title}</span>
                                <button onClick = {onClickHandler}>X</button>
                            </li>
                    )})}
                </ul>
                <div>
                    <button className={props.filter === 'all'? 'active-filter':''}
                        onClick = {onAllClickHandler}>All</button>
                    <button className = {props.filter === 'active'? 'active-filter': ''}
                        onClick = {onActiveClickHandler}>Active</button>
                    <button className={props.filter === 'completed'? 'active-filter': ''}
                            onClick = {onCompletedClickHandler}>Completed</button>
                </div>
            </div>

    )
}