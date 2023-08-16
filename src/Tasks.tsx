type TasksType = {
    taskId: number
    title: string
    isDone: boolean
}

type DataType = {
    title: string
    tasks: TasksType[]
    students: string[]
}

type PropsType = {
    data: DataType
}
export const Tasks = (props: PropsType) => {
    return (
        <div>
            <h3>{props.data.title}</h3>
            <div>
                <input type="text"/>
                <button>+</button>
            </div>
            <ul>
                {props.data.tasks.map(task => {
                    return (
                        <li key={task.taskId}>
                            <input type="checkbox" checked={task.isDone}/>
                            <span>{task.title}</span>
                        </li>
                    )
                })}
            </ul>
            <ol>
                {props.data.students.map((student, index) => {
                    return (
                        <li key={index+1}>{student}</li>
                    )
                })}
            </ol>

        </div>
    );
};