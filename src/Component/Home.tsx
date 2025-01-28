import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { deleteActiveUser, getActiveUser, IUserModel, updateActiveUser, updateRegisteredUsers } from "../LocalStorage"; // Import the new method

const Home = () => {
  const [activeUser, setActiveUser] = useState<IUserModel | null>(null); // Initialize with null
  const [isStats, setIsStats] = useState<boolean>(false);
  const [data, setData] = useState<IUserModel>({
    username: "",
    password: "",
    weight: 0,
    height: 0,
    gender: "",
    age: 0,
    name: "",
    goal: "",
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
      checkIfStats(user); // Check stats when the active user is set
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

  const handleStatsSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if(activeUser?.username && activeUser?.name){
        data.username = activeUser.username
        data.name = activeUser.name
    }
    updateActiveUser(data);
    setActiveUser(data); // Update the active user in the state
    // Also update the registered users list in localStorage
    updateRegisteredUsers(data);
    setIsStats(true); // Show the stats form
  };

  const handleCalculateSubmit = () => {
    navigate('/stats');
  };

  const checkIfStats = (user: IUserModel) => {
    // Check if user stats are present (age, height, weight, gender)
    if (user.age === 0 || user.height === 0 || user.weight === 0 || user.gender === "") {
      setIsStats(false); // Stats not submitted yet
    } else {
      setIsStats(true); // Stats already submitted
    }
  };

  return (
    <>
      <div className="background">
        <div className="shape"></div>
        <div className="shape"></div>
      </div>

      {/* Render only one of the forms based on isStats */}
      {isStats ? (
        <form onSubmit={handleCalculateSubmit}>
          <h3>Your Stats</h3>
          <label>Age: {activeUser?.age}</label><br />
          <label>Weight: {activeUser?.weight} lbs</label><br />
          <label>Height: {activeUser?.height} inches</label><br />
          <label>Gender: {activeUser?.gender}</label><br />
          <button type="submit">
            Calculate Macros
          </button>
          <button type="button" onClick={handleLogout}>
            Logout
          </button>
        </form>
      ) : (
        <form onSubmit={handleStatsSubmit}>
          <h3>Please enter your stats</h3>
          <label>Age: </label>
          <input
            placeholder="Age"
            id="age"
            value={data.age}
            onChange={handleInputChange}
          /><br />
          <label>Weight:</label>
          <input
            placeholder="Weight"
            id="weight"
            value={data.weight}
            onChange={handleInputChange}
          /><br />
          <label>Height:</label>
          <input
            placeholder="Height in inches"
            id="height"
            value={data.height}
            onChange={handleInputChange}
          /><br />
          <label>Gender:</label>
          <input
            placeholder="M or F"
            id="gender"
            value={data.gender}
            onChange={handleInputChange}
          /><br />
           <label>Goal:</label>
          <input
            placeholder="L or B"
            id="goal"
            value={data.goal}
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

export default Home;

