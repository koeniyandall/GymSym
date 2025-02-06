import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { deleteActiveUser, getActiveUser } from "../LocalStorage";
const Stats = () => {
    const currUser = getActiveUser();
    const [proteinGoal,setProteinGoal] = useState("")
    const [carbGoal,setCarbGoal] = useState("")
    const [fatGoal,setFatGoal] = useState("")
    const [caloriesGoal,setCaloriesGoal] = useState("")
    const handleCalcStats =() => {
        calcMacros();
    }
    const navigate = useNavigate()
    const handleLogout = () => {
        deleteActiveUser();
        navigate('/login');
    };
    const calcMacros = () => {
        let BMR = 0;
    
        // Calculate BMR based on gender
        if (currUser.gender === "M") {
            BMR = 10 * currUser.weight + 6.25 * currUser.height - 5 * currUser.age + 5;
        } else if (currUser.gender === "F") {
            BMR = 10 * currUser.weight + 6.25 * currUser.height - 5 * currUser.age - 161;
        } else {
            throw new Error("Invalid gender specified");
        }
    
        // Calculate TDEE
        const TDEE = BMR * 1.35;
    
        // Adjust TDEE based on goal
        const calories = currUser.goal === "L" ? TDEE - 500 : TDEE + 500;
    
        // Macro calculations
        const proteinCalories = 0.25 * calories; // 25% of total calories
        const fatCalories = 0.25 * calories;     // 25% of total calories
        const carbsCalories = calories - (proteinCalories + fatCalories); // Remaining calories for carbs
    
        const protein = Math.round(proteinCalories / 4); // 4 calories per gram of protein
        const fat = Math.round(fatCalories / 9);         // 9 calories per gram of fat
        const carbs = Math.round(carbsCalories / 4);     // 4 calories per gram of carbs
    
        // Ensure values are realistic
        const adjustedCalories = protein * 4 + fat * 9 + carbs * 4;
    
        // Update state
        setProteinGoal(`${protein}g`);
        setFatGoal(`${fat}g`);
        setCarbGoal(`${carbs}g`);
        setCaloriesGoal(`${Math.round(adjustedCalories)} kcal`);
    };
    
    return (
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
				<a href="/logworkout" >
					Log a Workout
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
		<div className="app-body-main-content">
			<section className="service-section">
				<h2>Recommended Macros</h2>
                <h2>Cals: {caloriesGoal}</h2>
				<div className="service-section-header">
				</div>
                <button onClick = {handleCalcStats}className = "sleek-button">Calculate Stats</button>
				<div className="mobile-only">
				</div>
				<div className="tiles">
					<article className="tile">
						<div className="tile-header">
							<i className="ph-lightning-light"></i>
							<h3>
								<span>Protein</span>
								<span>{proteinGoal}</span>
							</h3>
						</div>
					</article>
					<article className="tile">
						<div className="tile-header">
							<i className="ph-fire-simple-light"></i>
							<h3>
								<span>Carbs</span>
								<span>{carbGoal}</span>
							</h3>
						</div>
					</article>
					<article className="tile">
						<div className="tile-header">
							<i className="ph-file-light"></i>
							<h3>
								<span>Fat</span>
								<span>{fatGoal}</span>
							</h3>
						</div>
					</article>
				</div>
			</section>
</div>
</div>
</div>
)}
export default Stats