import React,{useState} from 'react';
import axios from 'axios';
export default function Login() {
	const [formData, setFormData] = useState({
		usernameOrEmail: '',
		password: '',
	});

	const handleChange = (e) => {
		// console.log({...formData},e.target.name);
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const requestData = {
				"username":formData.usernameOrEmail,
				"password":formData.password
			}
			const response = await axios.post('http://localhost:4000/api/auth/login',requestData);
			console.log(response.data); // Handle success
		} catch (error) {
			console.error(error); // Handle error
		}
	};

	return (
		<form onSubmit={handleSubmit}>
			<label>
				Username or Email:
				<input type="text" name="usernameOrEmail" value={formData.usernameOrEmail} onChange={handleChange} />
			</label>
			<label>
				Password:
				<input type="password" name="password" value={formData.password} onChange={handleChange} />
			</label>
			<button type="submit">Login</button>
		</form>
	);
}
