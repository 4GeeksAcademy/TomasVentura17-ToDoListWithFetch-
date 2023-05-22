
import React, { useEffect, useState } from "react";

const Home = () => {
	const [arrTodo, setArrTodo] = useState([]);
	const [input, setInput] = useState("");
	

	const obtenerTareas = () => {
		fetch('https://assets.breatheco.de/apis/fake/todos/user/tomasventura')
		  .then((response) => response.json())
		  .then((data) => setArrTodo(data));
	  };
	
	  const actualizarTareas = (e) => {
		e.preventDefault();
	
		const generarId = () => {
		  const random = Math.random().toString(36);
		  const fecha = Date.now().toString(36);
		  return random + fecha;
		};
	
		const newTasks = [...arrTodo, { id: generarId(), label: input, done: false }];
	
		fetch('https://assets.breatheco.de/apis/fake/todos/user/tomasventura', {
		  method: "PUT",
		  headers: {
			"Content-Type": "application/json"
		  },
		  body: JSON.stringify(newTasks)
		})
		  .then((response) => response.json())
		  .then(() => {
			obtenerTareas(); // Actualizar las tareas después de la actualización
		  });
	
		  setInput('')
	  };
	
	  const borrarTarea = (id) => {
		const updatedTasks = arrTodo.filter((tarea) => tarea.id !== id);
	
		fetch('https://assets.breatheco.de/apis/fake/todos/user/tomasventura', {
		  method: "PUT",
		  headers: {
			"Content-Type": "application/json"
		  },
		  body: JSON.stringify(updatedTasks)
		})
		  .then((response) => response.json())
		  .then(() => {
			setArrTodo(updatedTasks); // Actualizar las tareas en el estado local
		  });
	  };
	  const eliminarTodo = () => {
		const emptyTasks = [];
		fetch('https://assets.breatheco.de/apis/fake/todos/user/tomasventura', {
		  method: "PUT",
		  headers: {
			"Content-Type": "application/json"
		  },
		  body: JSON.stringify(emptyTasks)
		})
		  .then((response) => response.json())
		  .then(() => {
			setArrTodo(emptyTasks); 
		  });
	  };
	


	  useEffect(() => {
		obtenerTareas();
	  }, []);
	  const contadorTareas = arrTodo.length;
	 

	  return (
		<div>
	  <div className = "container">
		<h2>Todos</h2>
		<form  onSubmit={actualizarTareas}>
		  <div>
			<input
			  type="text"
			  className="form-control"
			  placeholder="What needs to be done?"
			  value={input}
			  onChange={(e) => setInput(e.target.value)}
			/>
		  </div>
		</form>
		{arrTodo.map((tarea) => (
		  <div className="input-group mb-3">
			<input
			  type="text"
			  className="form-control"
			  defaultValue={tarea.label}
			/>
			
			<button
			  className="btn-close btn-close-danger"
			  type="button"
			  onClick={() => borrarTarea(tarea.id)}
			>
				
			</button>
		  </div>
		))}
	  </div>
	  <div className="borrartodo">
		<span> {contadorTareas} items left </span>
		<button  type="button" className="btn btn-danger eliminartodo" onClick={eliminarTodo}
		 >Eliminar Todo</button>
    </div>
		</div>
	  );
	};
	
	export default Home;