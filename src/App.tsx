import React, {useState} from 'react';
import './App.css';
import {Todolist, TaskType} from './Todolist'
import {v1} from 'uuid'
export type FilterValuesType = 'all' | 'active' | 'completed'
export function App() {

    // Пишем useState
    //Вместо initialState переносим в скобки весь массив tasks
    let [tasks, setTasks] = useState(
        [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "React", isDone: true},
            {id: v1(), title: "Python", isDone: false}
        ]
    )

    //Удаляем таску функцией removeTask
    function removeTask(id: string) {
        let filteredTasks = tasks.filter(t => t.id !== id)
        setTasks(filteredTasks);
    }

// Делаем фильтр с помощью useState
    let [filter, setFilter] = useState<FilterValuesType>('all')
    let tasksForToDoList = tasks //Копируем таски в  отфильтрованный массив тасок
     if (filter === 'active') {
         tasksForToDoList = tasks.filter(task => task.isDone === false)
     } else {
         if (filter === 'completed'){
             tasksForToDoList = tasks.filter( task => task.isDone === true)
         }
     }
 function changeFilter(value: FilterValuesType) {
         setFilter(value)
 }
     //добавляем таску
    function addTask(title:string) {
         let task = {id: v1(), title: title, isDone: false};
         let newTask = [task, ...tasks];
         setTasks(newTask); // set -  это для перерисовки
     }
function changeTaskStatus(id: string, isDone: boolean) {
         let task = tasks.find(t => t.id === id)
    if (task) {
        task.isDone = isDone;
        setTasks([...tasks])
    }
}
    return (
        <div className="App">
            <Todolist
                title='What to learn'
                tasks={tasksForToDoList}
                removeTask={removeTask}
                changeFilter={changeFilter}
                addTask = {addTask}
                changeTaskStatus = {changeTaskStatus}
                filter = {filter}
            />
        </div>
    )
}