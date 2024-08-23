import axios from "axios";
import {ChangeEvent, useState} from "react";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

interface Task {
    id: number;
    content: string;
    isEditing?: boolean;
}

export const useTasks = () => {

    const [tasks, setTasks] = useState<Task[]>([]);

    const createTask = async (content: string, username: string | undefined) => {
        if (content.trim()) {
            try {
                await axios.post(`${BACKEND_URL}/tasks/create`, {
                    content: content,
                    username: username
                });
                fetchTasks(username);
            } catch (error) {
                console.error("Error creating task:", error);
            }
        }
    }

    const fetchTasks = async (username: string | undefined) => {
        try {
            const response = await axios.get<Task[]>(`${BACKEND_URL}/tasks/${username}`);
            setTasks(response.data);
            return tasks;
        } catch (error) {
            console.error("Error fetching tasks:", error);
        }
    }

    const deleteTask = async (taskId: number, username: string | undefined) => {
        try {
            await axios.delete(`http://localhost:3000/tasks/${taskId}`);
            fetchTasks(username);
        } catch (error) {
            console.error("Error deleting task:", error);
        }
    }

    const modifyTask = async (taskId: number, content: string, username: string | undefined) => {
        try {
            await axios.put(`${process.env.REACT_APP_BACKEND_URL}/tasks/${taskId}`, { content });
            fetchTasks(username);
        } catch (error) {
            console.error("Error updating task:", error);
        }
    }


    const toggleTaskEditing = (taskId: number) => {
        const updatedTasks = tasks.map(task =>
            task.id === taskId ? { ...task, isEditing: !task.isEditing } : task
        );
        setTasks(updatedTasks);
    };

    const handleTaskContentChange = (e: ChangeEvent<HTMLInputElement>, taskId: number) => {
        const updatedTasks = tasks.map(task =>
            task.id === taskId ? { ...task, content: e.target.value } : task
        );
        setTasks(updatedTasks);
    };


    return {createTask, fetchTasks, deleteTask, tasks, modifyTask, toggleTaskEditing, handleTaskContentChange};

};