const REGISTERED_USERS = "registered_users";
const ACTIVE_USER = "active_user";

export interface IUserModel {
    name: string;
    username: string;
    password: string;
    height: number;
    weight: number;
    age: number;
    gender: string;
    goal: string;
    workouts: IWorkout[];
}
export interface IWorkout {
    id: string; // Unique identifier for the workout
    date: string; // Date of the workout in ISO format or any other format
    type: string; // Type of workout (e.g., cardio, strength, etc.)
    duration: number; // Duration in minutes
    caloriesBurned?: number; // Optional: Calories burned during the workout
    notes?: string; // Optional: Any additional notes about the workout
}

// Adds a new user to the REGISTERED_USERS list
const addNewUser = (user: IUserModel) => {
    const userStr = localStorage.getItem(REGISTERED_USERS) || "[]";
    const users = JSON.parse(userStr) as IUserModel[];

    users.push(user);
    localStorage.setItem(REGISTERED_USERS, JSON.stringify(users));
};

// Checks if a user with the given username already exists
const isUserAlreadyRegistered = (username: string): boolean => {
    const userStr = localStorage.getItem(REGISTERED_USERS) || null;
    if (userStr == null) return false;
    const users = JSON.parse(userStr) as IUserModel[];

    const foundUser = users.find(x => x.username === username);
    return foundUser != null;
};

// Retrieves a user by username and password
const getUser = (username: string, password: string) => {
    const userStr = localStorage.getItem(REGISTERED_USERS) || null;
    if (userStr == null) return null;
    const users = JSON.parse(userStr) as IUserModel[];
    const foundUser = users.find(x => x.username == username && x.password == password);
    return foundUser;
};

// Updates the active user in localStorage
const updateActiveUser = (user: IUserModel) => {
    console.log(user.username)
    console.log(user.password)
    localStorage.setItem(ACTIVE_USER, JSON.stringify(user));
};

// Retrieves the active user from localStorage
const getActiveUser = () => {
    const activeUser = localStorage.getItem(ACTIVE_USER) || null;
    if (activeUser == null) return null;
    return JSON.parse(activeUser);
};

// Removes the active user from localStorage
const deleteActiveUser = () => {
    localStorage.removeItem(ACTIVE_USER);
};

// Updates the registered user's data in the REGISTERED_USERS list
const updateRegisteredUsers = (updatedUser: IUserModel) => {
    const usersStr = localStorage.getItem(REGISTERED_USERS);

    if (usersStr) {
    const users = JSON.parse(usersStr) as IUserModel[];
  
    const userIndex = users.findIndex(user => user.username === updatedUser.username);
  
    if (userIndex !== -1) {
        // Update the user data in the list
        const user = users[userIndex]
        user.age = updatedUser.age
        user.weight = updatedUser.weight
        user.height = updatedUser.height
        user.gender = updatedUser.gender
        user.workouts = updatedUser.workouts
        localStorage.setItem(REGISTERED_USERS, JSON.stringify(users));
        
        console.log("Updated Registered Users:", users);
      } else {
        console.error("User not found in the registered users list.");
      }
    } else {
      console.error("No registered users found in localStorage.");
    }
  };
  

export { addNewUser, deleteActiveUser, getActiveUser, getUser, isUserAlreadyRegistered, updateActiveUser, updateRegisteredUsers };

