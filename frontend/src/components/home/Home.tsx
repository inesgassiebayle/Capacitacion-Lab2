import React, { FC, useEffect, useState } from "react";
import './Home.css';
import { useNavigate, useParams } from "react-router-dom";
import deleteIcon from '../../assets/blue-trash-box-waste-or-delete-icon-vector.jpg';
import modifyIcon from "../../assets/modification.png";
import withAuth from "../hoc/Authentication";
import { useTasks } from "../../hooks/useTasks";
import { useAuth } from "../../hooks/useAuth";

const Home: FC = () => {
    const { username } = useParams<{ username: string }>();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isManageUserOpen, setIsManageUserOpen] = useState(false);
    const [newTask, setNewTask] = useState("");
    const [updateMessage, setUpdateMessage] = useState<string | null>(null);
    const navigate = useNavigate();
    const { createTask, fetchTasks, deleteTask, tasks, modifyTask, toggleTaskEditing, handleTaskContentChange } = useTasks();
    const { deleteUser, modifyUser, userDetails, fetchUserDetails, updateUserDetails } = useAuth();

    useEffect(() => {
        if (username) {
            fetchTasks(username);
        }
    }, [username]);

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    const handleDeleteTask = async (taskId: number) => {
        await deleteTask(taskId, username);
    };

    const handleCreateTask = async () => {
        await createTask(newTask, username);
        setNewTask("");
        closeModal();
    };

    const handleUpdateUser = async () => {
        modifyUser(username, userDetails);
        closeManageUser();
    };


    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        updateUserDetails(e.target.name, e.target.value);
    };

    const toggleEditing = (taskId: number) => {
        toggleTaskEditing(taskId);
    };

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    const openManageUser = () => {
        setIsManageUserOpen(true);
        fetchUserDetails(username);
    }
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
                        {task.isEditing ? (
                            <input
                                type="text"
                                value={task.content}
                                onChange={(e) => handleTaskContentChange(e, task.id)}
                                onBlur={() => {
                                    toggleEditing(task.id);
                                    modifyTask(task.id, task.content, username);
                                }}
                                onKeyPress={(e) => {
                                    if (e.key === 'Enter') {
                                        toggleEditing(task.id);
                                        modifyTask(task.id, task.content, username);
                                    }
                                }}
                                autoFocus
                            />
                        ) : (
                            <>
                                <div className="task-content">
                                    {task.content}
                                </div>
                                <div className="task-icons">
                                    <img
                                        src={modifyIcon}
                                        alt="Modify"
                                        className="task-delete-button"
                                        onClick={() => toggleEditing(task.id)}
                                    />
                                    <img
                                        src={deleteIcon}
                                        alt="Delete"
                                        className="task-delete-button"
                                        onClick={() => handleDeleteTask(task.id)}
                                    />
                                </div>
                            </>
                        )}
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
                                <button className="modal-delete-account" onClick={() => deleteUser(username)}>Delete Account</button>
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
