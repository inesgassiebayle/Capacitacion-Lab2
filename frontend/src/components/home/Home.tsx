import React, { FC, useEffect, useState } from "react";
import './Home.css';
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import deleteIcon from '../../assets/blue-trash-box-waste-or-delete-icon-vector.jpg';
import withAuth from "../hoc/Authentication";

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
    const [userDetails, setUserDetails] = useState({
        name: "",
        surname: "",
        password: ""
    });
    const [updateMessage, setUpdateMessage] = useState<string | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        fetchTasks();
        fetchUserDetails();
    }, [username]);

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    const handleDelete = async () => {
        try {
            await axios.delete(`http://localhost:3000/user/${username}`);
            localStorage.removeItem('token');
            navigate('/login');
        } catch (error) {
            console.error("Error deleting user:", error);
        }
    };

    const fetchTasks = async () => {
        try {
            const response = await axios.get<Task[]>(`http://localhost:3000/tasks/${username}`);
            setTasks(response.data);
        } catch (error) {
            console.error("Error fetching tasks:", error);
        }
    };

    const fetchUserDetails = async () => {
        try {
            const response = await axios.get(`http://localhost:3000/user/${username}`);
            setUserDetails({
                name: response.data.name,
                surname: response.data.surname,
                password: ""
            });
        } catch (error) {
            console.error("Error fetching user details:", error);
        }
    };

    const handleDeleteTask = async (taskId: number) => {
        try {
            await axios.delete(`http://localhost:3000/tasks/${taskId}`);
            fetchTasks();
        } catch (error) {
            console.error("Error deleting task:", error);
        }
    };

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
    };

    const handleUpdateUser = async () => {
        try {
            await axios.put(`http://localhost:3000/user/${username}`, userDetails);
            setUpdateMessage("User details updated successfully!");
            closeManageUser();
        } catch (error) {
            console.error("Error updating user details:", error);
            setUpdateMessage("Failed to update user details.");
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUserDetails({
            ...userDetails,
            [e.target.name]: e.target.value
        });
    };

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    const openManageUser = () => setIsManageUserOpen(true);
    const closeManageUser = () => {
        setIsManageUserOpen(false);
        setUpdateMessage(null);
    };

    return (
        <div>
            <div className="todo-header">
                <div className="todo-title">To-do List</div>
                <div className="todo-header-right">
                    <button className="todo-user" onClick={openManageUser}>User</button>
                    <button className="todo-logout" onClick={handleLogout}>Log out</button>
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
                    <div className="modal" id="add-task-modal" onClick={closeModal}>
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
                    <div className="modal" id="user-management-modal" onClick={closeManageUser}>
                        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                            <span className="modal-close" onClick={closeManageUser}>&times;</span>
                            <div className="modal-header">User Management</div>
                            <div className="modal-input-wrapper">
                                <input
                                    type="text"
                                    name="name"
                                    placeholder="Name"
                                    value={userDetails.name}
                                    onChange={handleChange}
                                />
                                <input
                                    type="text"
                                    name="surname"
                                    placeholder="Surname"
                                    value={userDetails.surname}
                                    onChange={handleChange}
                                />
                                <input
                                    type="password"
                                    name="password"
                                    placeholder="Password"
                                    value={userDetails.password}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="modal-buttons">
                                <button className="modal-add-task" onClick={handleUpdateUser}>Update</button>
                                <button className="modal-delete-account" onClick={handleDelete}>Delete Account</button>
                            </div>
                            {updateMessage && <div className="update-message">{updateMessage}</div>}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default withAuth(Home);
