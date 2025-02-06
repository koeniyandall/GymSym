import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getUser, updateActiveUser } from '../LocalStorage';

interface ILoginModel {
    username: string
    password: string
}

const Login = () => {
    const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
    
        // Validate fields
        if (!data.username || !data.password) {
            alert("Please fill out both the username and password fields.");
            return;
        }
    
        // Retrieve the user
        const user = getUser(data.username, data.password);
        console.log("Retrieved User:", user); // Debugging
    
        if (!user) {
            alert("Invalid username or password. Please try again.");
            return;
        }
    
        // Update the active user
        try {
            console.log("Setting active user:", user); // Debugging
            updateActiveUser(user);
            navigate("/home");
        } catch (error) {
            console.error("Failed to update active user:", error);
            alert("An error occurred while logging in. Please try again.");
        }
    };
    
    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const id = event.target.id;
        const value = event.target.value;

        setData({...data, [id]: value})
    }
    const[data,setData] = useState<ILoginModel>({username: "", password: ""})
    const navigate = useNavigate();
    const handleRegisterClick = () => {
        navigate('/register')
    }
return( <>
<div className="background">
        <div className="shape"></div>
        <div className="shape"></div>
    </div>
    <form onSubmit = {handleFormSubmit}>
        <h1>GymSym</h1>
        <h3>Login Here</h3>

        <label>Username</label>
        <input type="text" placeholder="Email or Phone" id="username" value = {data.username} onChange = {handleInputChange}/>

        <label>Password</label>
        <input type="password" placeholder="Password" id="password" value = {data.password} onChange = {handleInputChange}/>

        <button>Log In</button>
        <button onClick={handleRegisterClick}>Go to Register</button>
    </form>
</>
);
};

export default Login;