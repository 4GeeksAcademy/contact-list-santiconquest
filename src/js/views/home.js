import React,{useState, useContext} from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router";
import rigoImage from "../../img/rigo-baby.jpg";
import "../../styles/home.css";

export const Home = () => {
	const {actions}=useContext(Context)
	const navigate=useNavigate()
	const [name, setName]=useState("")
	const [email, setEmail]=useState("")
	const [phone, setPhone]=useState("")
	const [address, setAddress]=useState("")
	
	const handleSubmit=() =>{
		const newContact={
			name:name,
			email:email,
			phone:phone,
			address:address
		}
		const result = actions.addContact(newContact)
		console.log(result)
		
			navigate("/demo")
		
		
	}

	return(
	<div className="text-center mt-5">
		<h1>Add a new contact</h1>
		<div class="container text-start mb-3">
			<label for="fullName" class="form-label">Full Name</label>
			<input type="text" class="form-control" id="fullName" placeholder="Enter Full Name" value={name} onChange={(e)=>setName(e.target.value)} />
		</div>
		<div class="container text-start mb-3">
			<label for="mail" class="form-label">Email</label>
			<input type="email" class="form-control" id="mail" placeholder="Enter email"  value={email} onChange={(e)=>setEmail(e.target.value)}  />
		</div>
		<div class="container text-start mb-3">
			<label for="phone" class="form-label">Phone</label>
			<input type="number" class="form-control" id="phone" placeholder="Enter phone"  value={phone} onChange={(e)=>setPhone(e.target.value)}  />
		</div>
		<div class="container text-start mb-3">
			<label for="address" class="form-label">Address</label>
			<input type="text" class="form-control" id="address" placeholder="Enter address"  value={address} onChange={(e)=>setAddress(e.target.value)}  />
		</div>
		<button type="button" class="btn btn-primary" onClick={()=>handleSubmit()}>save</button>
	</div>
)};
