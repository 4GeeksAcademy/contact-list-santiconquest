import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";

import { Context } from "../store/appContext";

import "../../styles/demo.css";

export const Demo = () => {
	const { store, actions } = useContext(Context);

	function deleteContact(indexToDelete){
		console.log("Elimino el contacto"+indexToDelete)
	}

	return (
		<div className="container">
			<ul className="list-group">
				{/* {store.demo.map((item, index) => {
					return (
						<li
							key={index}
							className="list-group-item d-flex justify-content-between"
							style={{ background: item.background }}>
							<Link to={"/single/" + index}>
								<span>Link to: {item.title}</span>
							</Link>
							{// Conditional render example
							// Check to see if the background is orange, if so, display the message
							item.background === "orange" ? (
								<p style={{ color: item.initial }}>
									Check store/flux.js scroll to the actions to see the code
								</p>
							) : null}
							<button className="btn btn-success" onClick={() => actions.changeColor(index, "orange")}>
								Change Color
							</button>
						</li>
					);
				
				})} */}
				{store.contacts.map((item, index) => {
					return (
						<li
							key={index}
							className="list-group-item d-flex justify-content-between"
							>
							<p>
								{item.name}
								<br />
								{item.phone}
								<br />
								{item.email}
								<br />
								{item.address}
							</p>
							<div className=" justify-content-end">
								{/* <button onClick={()=>actions.editContact(item.id)}>Editar</button> */}
								<Link to={"/formulario/"+item.id} >
									<button className="btn btn-light"><i class="fas fa-pencil-alt"></i></button>
								</Link> 
								<button className="btn btn-light" onClick={()=>actions.removeContact(item.id)}><i class="fas fa-trash-alt"></i></button>
							</div>
						</li>
					);
				
				})}
			</ul>
			<br />
			<Link to="/">
				<button className="btn btn-success">Add new contact</button>
			</Link>
		</div>
	);
};
