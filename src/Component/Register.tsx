import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { addNewUser, isUserAlreadyRegistered, IUserModel } from "../LocalStorage";

const Register = () => {
    const[data,setData] = useState<IUserModel>({name: "", username: "", password: "", height: 0, weight: 0, age: 0,gender: "", goal: "",benchPR: 0, squatPR: 0, deadliftPR: 0, workouts: []});
    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const id = event.target.id;
        const value = event.target.value;

        setData({...data, [id]: value})
    }

    const navigate = useNavigate();
    const handleLoginClick = () => {
        navigate('/login');
    }

    const[message,setMessage] = useState<string>("")

    const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if(data.name == "" || data.username == "" || data.password == ""){
            setMessage("Please fill the form")
            return;
        }
        
        if(isUserAlreadyRegistered(data.username)){
            setMessage("User already exists");
            return;
        }

        addNewUser(data);
        setMessage('User created. Click on login')
    }
    return( <>
        <div className="background">
                <div className="shape"></div>
                <div className="shape"></div>
            </div>
            <form onSubmit = {handleFormSubmit}>
                <h3>Register Here</h3>

                <label>Name</label>
                <input type="text" placeholder="Name" id="name" value = {data.name} onChange = {handleInputChange} />

                <label>Username</label>
                <input type="text" placeholder="Username" id="username" value = {data.username} onChange = {handleInputChange} />
        
                <label>Password</label>
                <input type="password" placeholder="Password" id="password" value = {data.password} onChange = {handleInputChange}/>
        
                <button>Register</button>
                <button onClick = {handleLoginClick}>Go to Login</button>
                <div className = 'social'>
                    {message && <p>{message}</p>}
                </div>
            </form>
        </>
        );
}

export default Register