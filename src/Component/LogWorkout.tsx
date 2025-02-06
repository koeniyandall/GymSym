import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { deleteActiveUser, getActiveUser, IUserModel, IWorkout, updateActiveUser, updateRegisteredUsers } from "../LocalStorage";

const LogWorkout: React.FC = () => {
    const currUser = getActiveUser();
    const [data, setData] = useState<IUserModel>(getActiveUser());
    const [currentWorkout, setCurrentWorkout] = useState<IWorkout>({
        id: Date.now().toString(), // Generate a unique ID
        date: new Date().toISOString().split("T")[0], // Default to today
        type: "",
        duration: 0,
        caloriesBurned: 0,
        notes: "",
    });

    const navigate = useNavigate()
    const handleLogout = () => {
        deleteActiveUser();
        navigate('/login');
    };

    // Handle input change for workout form
    const handleWorkoutChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { id, value } = event.target;
        setCurrentWorkout(prev => ({
            ...prev,
            [id]: id === "duration" || id === "caloriesBurned" ? parseInt(value, 10) || 0 : value,
        }));
        updateRegisteredUsers(data);
    };

    // Add a new workout
    const handleAddWorkout = () => {
        setData(prevState => {
            const updatedUser = {
                ...prevState,
                workouts: [...prevState.workouts, currentWorkout],
            };
            updateActiveUser(updatedUser); // Update localStorage
            console.log("Updated User:", updatedUser); // Debugging
            return updatedUser;
        });

        // Reset current workout form
        setCurrentWorkout({
            id: Date.now().toString(),
            date: new Date().toISOString().split("T")[0],
            type: "",
            duration: 0,
            caloriesBurned: 0,
            notes: "",
        });
    };

    return (
        <>
        <div className="app">
        <header className="app-header">
            <div className="app-header-logo">
                <div className="logo">
                    <span className="logo-icon">
                        <img src="https://assets.codepen.io/285131/almeria-logo.svg" />
                    </span>
                    <h1 className="logo-title">
                        <span>{currUser.name}</span>
                        <span>{currUser.username}</span>
                    </h1>
                </div>
            </div>
            <button className="sleek-button" onClick={handleLogout}>
                Logout
            </button>
            <div className="dropdown">
                <button className = "dropbtn">Menu</button>
                <div className = "dropdown-content">
                    <a href="/stats" >
                        Stats
                    </a>
                    <a href="#" className="active">
                        Payments
                    </a>
                    <a href="#">
                        Cards
                    </a>
                    <a href="#">
                        Account
                    </a>
                    <a href="#">
                        System
                    </a>
                    <a href="#">
                        Business
                    </a>
                    </div>
            </div>
        </header>
        <div className="app-body">
            <div className="app-body-navigation">
            </div>
            <div className = "app-body">

            {/* Display Past Workouts */}
            {/* Add New Workout Form */}
            <div className = "app">
            <div className="app-body-main-content">
            <h2>Add Workout</h2>
            <i className="ph-lightning-light"></i>
            <input
                id="type"
                type="text"
                placeholder="Workout Type (e.g., Cardio)"
                value={currentWorkout.type}
                onChange={handleWorkoutChange}
                className="input-white-text"
            />
            <h2>Date</h2>
            <input
                id="date"
                type="date"
                value={currentWorkout.date}
                onChange={handleWorkoutChange}
                className="input-white-text"
            />
            <h2>Duration</h2>
            <input
                id="duration"
                type="number"
                placeholder="Duration (mins)"
                value={currentWorkout.duration}
                onChange={handleWorkoutChange}
                className="input-white-text"
            />
            <h2>Calories Burned</h2>
            <input
                id="caloriesBurned"
                type="number"
                placeholder="Calories Burned"
                value={currentWorkout.caloriesBurned}
                onChange={handleWorkoutChange}
                className="input-white-text"
            />
            <h1>    </h1>
            <textarea
                id="notes"
                className = "cool-textarea"
                placeholder="Notes"
                value={currentWorkout.notes}
                onChange={handleWorkoutChange}
            ></textarea>
            <button onClick={handleAddWorkout} className = "sleek-button">Add Workout</button>
            </div>
            <h2>Past Workouts</h2>
            {Array.isArray(data.workouts) && data.workouts.length > 0? (
                <ul>
                    {data.workouts.map(workout => (
                        <li key={workout.id}>
                            <strong>{workout.type}</strong> - {workout.date} ({workout.duration} mins)
                            {workout.caloriesBurned ? `, Calories: ${workout.caloriesBurned}` : ""}
                            {workout.notes && `, Notes: ${workout.notes}`}
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No workouts logged yet.</p>
            )}
            </div>
            </div>
            <div className="app-body-main-content">
    </div>
    </div>
    </div>
        </>
    );
};

export default LogWorkout;
