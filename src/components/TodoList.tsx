import {useDispatch, useSelector} from "react-redux";
import type { AppDispatch } from "../app/store";
import type { RootState } from "../app/store";
import { addTodo } from "../feactures/todos/todoActions";
import { removeTodo } from "../feactures/todos/todoActions";
import { useState } from "react";


const TodoList: React.FC = () =>{
    const [todoText, setTodoText] = useState("");
    const dispatch: AppDispatch = useDispatch();
    const todos = useSelector((state: RootState) => state.todos)

    const emojiMap: {[key: string]: string} ={
        eat: "amburguesa",
        sleep: "mimido",
        boom: "Guayakill"
    };

    const handleAddTodo = () =>{
        const mappedText = emojiMap[todoText.toLowerCase()] || todoText;
        if(mappedText.trim()){
            dispatch(addTodo(mappedText));
            setTodoText("");
        }
        
    }

    const handleRemoveTodo = (id: number) =>{
        dispatch(removeTodo(id));
    }

    return(
        <div>
            <em>Hecho con Redux Toolkit</em>
            <h1>Emoji Todo List</h1>
            <input type="text"
            value={todoText}
            onChange={(e) => setTodoText(e.target.value)}
            onKeyDown={(e) => {
                if(e.key === "Enter"){
                    handleAddTodo();
                }
            }}
            placeholder="Agrega un nuevo todo"
            />
            <ul>
                {
                todos.map((todo) => (
                    <li key={todo.id} onClick={() => handleRemoveTodo(todo.id)}>
                        {todo.text}</li>
                ))
                }
            </ul>
        </div>
    )
}
export default TodoList;