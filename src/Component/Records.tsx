import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { deleteActiveUser, getActiveUser, IUserModel, updateActiveUser, updateRegisteredUsers } from "../LocalStorage"; // Import the new method

const Records = () => {
  const [activeUser, setActiveUser] = useState<IUserModel | null>(null); // Initialize with null
  const [isPR, setIsPR] = useState<boolean>(false);
  const [data, setData] = useState<IUserModel>({
    username: "",
    password: "",
    weight: 0,
    height: 0,
    gender: "",
    age: 0,
    name: "",
    goal: "",
    benchPR: 0,
    squatPR: 0,
    deadliftPR: 0,
    workouts : []
  });

  const navigate = useNavigate();

useEffect(() => {
    const user = getActiveUser();
    console.log(user.username)
    if (user === null) {
    navigate('/login');
    } else {
    setActiveUser(user);
      checkIfPR(user); // Check stats when the active user is set
    }
}, [navigate]);

const handleLogout = () => {
    deleteActiveUser();
    navigate('/login');
};

const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const id = event.target.id;
    const value = event.target.value;

    setData({ ...data, [id]: value });
};

const handlePRSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if(activeUser?.username && activeUser?.name){
        data.username = activeUser.username
        data.name = activeUser.name
    }
    updateActiveUser(data);
    setActiveUser(data); // Update the active user in the state
    // Also update the registered users list in localStorage
    updateRegisteredUsers(data);
    setIsPR(true); // Show the stats form
};


const checkIfPR = (user: IUserModel) => {
    // Check if user stats are present (age, height, weight, gender)
    if (user.benchPR === 0|| user.squatPR ===  0 || user.deadliftPR ===  0) {
      setIsPR(false); // Stats not submitted yet
    } else {
      setIsPR(true); // Stats already submitted
    }
};

return (
    <>
    <div className="background">
        <div className="shape"></div>
        <div className="shape"></div>
    </div>

      {/* Render only one of the forms based on isStats */}
    {isPR ? (
        <form>
        <h3>Your Stats</h3>
        <label>Bench PR: {activeUser?. benchPR} lbs</label><br />
        <label>Weight: {activeUser?.squatPR} lbs</label><br />
        <label>Height: {activeUser?.deadliftPR} lbs</label><br />
        <button type="button" onClick={handleLogout}>
            Logout
        </button>
        </form>
    ) : (
        <form onSubmit={handlePRSubmit}>
        <h3>Please enter your stats</h3>
        <label>Squat PR </label>
        <input
            placeholder="Squat PR"
            id="squatPR"
            value={data.squatPR}
            onChange={handleInputChange}
        /><br />
        <label>Bench PR</label>
        <input
            placeholder="Bench PR"
            id="benchPR"
            value={data.benchPR}
            onChange={handleInputChange}
        /><br />
        <label>Deadlift PR</label>
        <input
            placeholder="Deadlift PR"
            id="deadliftPR"
            value={data.deadliftPR}
            onChange={handleInputChange}
        /><br />
        <button type="submit">
            Submit Stats
        </button>
        <button type="button" onClick={handleLogout}>
            Logout
        </button>
        </form>
    )}
    </>
);
};

export default Records;

