import { useState } from "react";
import { getActiveUser, IUserModel, IWorkout, updateActiveUser } from "../LocalStorage";

const LogWorkout: React.FC = () => {
    const [data, setData] = useState<IUserModel>(getActiveUser());
    const [currentWorkout, setCurrentWorkout] = useState<IWorkout>({
        id: Date.now().toString(), // Generate a unique ID
        date: new Date().toISOString().split("T")[0], // Default to today
        type: "",
        duration: 0,
        caloriesBurned: 0,
        notes: "",
    });

    // Handle input change for workout form
    const handleWorkoutChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { id, value } = event.target;
        setCurrentWorkout(prev => ({
            ...prev,
            [id]: id === "duration" || id === "caloriesBurned" ? parseInt(value, 10) || 0 : value,
        }));
    };

    // Add a new workout
    const handleAddWorkout = () => {
        setData(prevState => {
            const updatedUser = {
                ...prevState,
                workouts: [...prevState.workouts, currentWorkout],
            };
            updateActiveUser(updatedUser); // Update localStorage
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
            <h1>Log Workout</h1>

            {/* Display Past Workouts */}
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

            {/* Add New Workout Form */}
            <h2>Add Workout</h2>
            <input
                id="type"
                type="text"
                placeholder="Workout Type (e.g., Cardio)"
                value={currentWorkout.type}
                onChange={handleWorkoutChange}
            />
            <input
                id="date"
                type="date"
                value={currentWorkout.date}
                onChange={handleWorkoutChange}
            />
            <input
                id="duration"
                type="number"
                placeholder="Duration (mins)"
                value={currentWorkout.duration}
                onChange={handleWorkoutChange}
            />
            <input
                id="caloriesBurned"
                type="number"
                placeholder="Calories Burned"
                value={currentWorkout.caloriesBurned}
                onChange={handleWorkoutChange}
            />
            <textarea
                id="notes"
                placeholder="Notes"
                value={currentWorkout.notes}
                onChange={handleWorkoutChange}
            ></textarea>
            <button onClick={handleAddWorkout}>Add Workout</button>
        </>
    );
};

export default LogWorkout;
