const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			/* demo: [
				{
					title: "FIRST",
					background: "white",
					initial: "white"
				},
				{
					title: "SECOND",
					background: "white",
					initial: "white"
				},
				{
					title: "THIRD",
					background: "white",
					initial: "white"
				}
			], */
			contacts: []
		},
		actions: {
			// Use getActions to call a function within a fuction
			exampleFunction: () => {
				getActions().changeColor(0, "green");
			},
			loadSomeData: () => {
				/**
					fetch().then().then(data => setStore({ "foo": data.bar }))
				*/
				console.log("Se cargo la pagina")
				fetch('https://playground.4geeks.com/contact/agendas/homero/contacts')
				.then((response)=>response.json())
				//.then((data)=>console.log(data.contacts))
				.then((data)=>setStore({ contacts: data.contacts }))
			},
			addContact:(newContact)=>{
				//Me devuelve el objeto store/actions con las variables actualizadas
				const store = getStore()
				const actions = getActions()
				const requestOptions = {
					method: "POST",
					headers: {"Content-Type": "application/json"},
					body: JSON.stringify(newContact),
				  };
				  
				  fetch("https://playground.4geeks.com/contact/agendas/homero/contacts", requestOptions)
					.then((response) => {
						console.log(response)
						if(response.ok){
							actions.loadSomeData()
							return response.json()
						}
					})
					.then((result) => {
						if(result){
							setStore(store.contacts.concat(result))
							return true
						}
					})
					
			},
			editContact:(contactToEdit, idToEdit)=>{
				console.log("Edito contacto id: "+idToEdit)
				const store = getStore();
				const actions = getActions()

				const requestOptions = {
					method: "PUT",
					headers: {"Content-Type": "application/json"},
					body: JSON.stringify(contactToEdit),
				  };
				  
				  fetch("https://playground.4geeks.com/contact/agendas/homero/contacts/"+idToEdit, requestOptions)
				  .then((response) => {
					console.log(response)
					if(response.ok){
						actions.loadSomeData()
						return response.json()
					}
				})
				.then((result) => {
					if(result){
						setStore(store.contacts.concat(result))
						return true
					}
				})

			},
			removeContact: (idToDelete) => {
				console.log("remove from flux"+idToDelete)
				const store = getStore();

				const requestOptions = {
					method: "DELETE",
					redirect: "follow"
				  };
				  
				  fetch("https://playground.4geeks.com/contact/agendas/homero/contacts/"+idToDelete, requestOptions)
					.then((response) => response.text())
					.then((result) => {console.log(result)
						fetch('https://playground.4geeks.com/contact/agendas/homero/contacts')
						.then((response)=>response.json())
						//.then((data)=>console.log(data.contacts))
						.then((data)=>setStore({ contacts: data.contacts }))
							})

				//setStore({ contacts: store.contacts.filter((contacto,index)=>contacto.id!=idToDelete) })
			},
			changeColor: (index, color) => {
				//get the store
				const store = getStore();

				//we have to loop the entire demo array to look for the respective index
				//and change its color
				const demo = store.demo.map((elm, i) => {
					if (i === index) elm.background = color;
					return elm;
				});

				//reset the global store
				setStore({ demo: demo });
			}
		}
	};
};

export default getState;
