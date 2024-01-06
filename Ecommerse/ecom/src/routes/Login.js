import Navbar from "../components/Navbar";
import React, { useState } from 'react';
import 'boxicons/css/boxicons.min.css';
import "../routes/Login.css"
import Footer from "../components/Footer/Footer";
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom';
import axios from "axios";
function Login() {
	const [email, setemail] = useState('');
	const [password, setPassword] = useState('');
	const activeItem = "Login";
	const setActiveItem = (itemName) => {
		console.log(`Setting active item to ${itemName}`);
	};
	const navigate = useNavigate()
	const SignIn = () => {
		const body = {
			email,
			password,
		};
		if (email === 'admin@gmail.com' && password === 'admin') {
			toast.success('Logged in as Admin');
			const adminToken = `${email}jadhyghsjhjhasjdhasduhjcsnj`;
			localStorage.setItem('authToken', adminToken);
			navigate('/admin');
		}
		else {
			const url = `http://localhost:3001/user`;
		  
			axios.get(url)
			  .then((response) => {
				const users = response.data;
				const emailToMatch = body.email;
				const matchedUser = users.find((user) => user.email === emailToMatch);
		  
				if (matchedUser) {
				 const userToken = `${matchedUser.email}jadhyghsjhjhasjdhasduhjcsnj`;
				  const userId =matchedUser.id;
				  const userName =`Welcome:${matchedUser.firstname}`;
				  localStorage.setItem('authToken', userToken);
				  localStorage.setItem('UserId', userId);
				  localStorage.setItem('UserName', userName);
				  navigate('/products');
				  toast.success("Logged in successfully");
				} else {
				  toast.error("User not found");
				}
			  })
			  .catch((error) => {
				console.error(error);
			  });
		  }
		  
	};
	const Signup = () => {
		navigate("/signup");
	}
	return (
		<div className="App">
			<Navbar activeItem={activeItem} setActiveItem={setActiveItem} />
			<div className="containerr ">
				<div className="screen ">
					<div className="screen__content">
						{/* eslint-disable-next-line no-script-url*/}
						<form className="login" action="javascript:void(0)" method="post">
							<div className="login__field">
								<i className="login__icon fas fa-user"></i>
								<input type="text" className="login__input" onChange={e => (
									setemail(e.target.value)
								)} placeholder="Email" />
							</div>
							<div className="login__field">
								<i className="login__icon fas fa-lock"></i>
								<input type="password" className="login__input" onChange={e => (
									setPassword(e.target.value)
								)} placeholder="Password" />
							</div>
							<button className="button login__submit" onClick={SignIn}>
								<span className="button__text"  >Log In Now</span>

								<i className="button__icon fas fa-chevron-right"></i>
							</button>
							<button className="button login__submit" type="submit" onClick={Signup}>
								<span className="button__text"  >Signup Now</span>

								<i className="button__icon fas fa-chevron-right"></i>
							</button>
						</form>

					</div>
					<div className="screen__background">
						<span className="screen__background__shape screen__background__shape4"></span>
						<span className="screen__background__shape screen__background__shape3"></span>
						<span className="screen__background__shape screen__background__shape2"></span>
						<span className="screen__background__shape screen__background__shape1"></span>
					</div>
				</div>
			</div>
			<Footer></Footer>
		</div>
	);

}
export default Login;
