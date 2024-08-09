import React, { FC, useEffect, useState } from "react";
import './Home.css';
import axios from "axios";
import { useParams } from "react-router-dom";
import deleteIcon from '../../assets/blue-trash-box-waste-or-delete-icon-vector.jpg';

interface Task {
    id: number;
    content: string;
}

const Home: FC = () => {
    const { username } = useParams<{ username: string }>();
    const [tasks, setTasks] = useState<Task[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isManageUserOpen, setIsManageUserOpen] = useState(false);
    const [newTask, setNewTask] = useState("");

    useEffect(() => {
        fetchTasks();
    }, [username]);

    const fetchTasks = async () => {
        try {
            const response = await axios.get<Task[]>(`http://localhost:3000/tasks/${username}`);
            setTasks(response.data);
        } catch (error) {
            console.error("Error fetching tasks:", error);
        }
    }

    const handleDeleteTask = async (taskId: number) => {
        try {
            await axios.delete(`http://localhost:3000/tasks/${taskId}`);
            fetchTasks();
        } catch (error) {
            console.error("Error deleting task:", error);
        }
    }

    const handleCreateTask = async () => {
        if (newTask.trim()) {
            try {
                await axios.post(`http://localhost:3000/tasks/create`, {
                    content: newTask,
                    username: username
                });
                setNewTask("");
                fetchTasks();
                closeModal();
            } catch (error) {
                console.error("Error creating task:", error);
            }
        }
    }

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    const openManageUser = () => setIsManageUserOpen(true);
    const closeManageUser = () => setIsManageUserOpen(false);

    return (
        <div>
            <div className="todo-header">
                <div className="todo-title">To-do List</div>
                <div className="todo-header-right">
                    <button className="todo-user" onClick={openManageUser}>User</button>
                    <button className="todo-logout">Log out</button>
                </div>
            </div>
            <div className="todo-container">
                <div className="todo-card add-task" onClick={openModal}>
                    +
                </div>

                {tasks.map(task => (
                    <div key={task.id} className="todo-card task-card">
                        {task.content}
                        <img
                            src={deleteIcon}
                            alt="Delete"
                            className="task-delete-button"
                            onClick={() => handleDeleteTask(task.id)}
                        />
                    </div>
                ))}

                {isModalOpen && (
                    <div className="modal" onClick={closeModal}>
                        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                            <div className="modal-input-wrapper">
                                <input
                                    type="text"
                                    placeholder="Task"
                                    value={newTask}
                                    onChange={(e) => setNewTask(e.target.value)}
                                />
                                <button className="modal-add-task" onClick={handleCreateTask}>+</button>
                                <span className="modal-close" onClick={closeModal}>&times;</span>
                            </div>
                        </div>
                    </div>
                )}

                {isManageUserOpen && (
                    <div className="modal" onClick={closeManageUser}>
                        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                            <div className="modal-header">User Management</div>
                            <button onClick={closeManageUser}>Close</button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Home;
