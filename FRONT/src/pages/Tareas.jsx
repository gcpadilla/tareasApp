import React, { useState, useEffect } from "react";
import { Container, Button, Box } from "@material-ui/core";
import TareasCards from "../components/TareasCards";
import { Link } from "react-router-dom";
import axios from "axios";

const Tareas = () => {
	const [tareas, setTareas] = useState({
		tareas: [],
	});
	const [actualizar, setActualizar] = useState(true);

	const traer = () => {
		axios
			.get(`/api/v1/tareas`)
			.then((res) => {
				const data = res.data;
				setTareas({
					tareas: data,
				});
			})
			.catch((err) => {
				console.log("entro al err de traer todo");
			});
	};

	useEffect(() => {
		traer();
		setActualizar(false);
	}, [actualizar]);

	const borrar = async (id) => {
		await axios.delete(`/api/v1/tareas/${id}`);
		setActualizar(true);
	};

	const mostrar = () => {
		let Tareas = tareas.tareas;
		if (Tareas.length !== 0) {
			return Tareas.map((tarea, i) => (
				<TareasCards tarea={tarea} borrar={borrar} key={i} />
			));
		}
		return (
			<Box>
				<h1>No hay Tareas...</h1>
			</Box>
		);
	};

	return (
			<Container>
				<Box mt={2} display="flex" flexWrap="wrap">
					{mostrar()}
				</Box>
				<Button variant="contained" color="primary" component={Link} to="HomePage">
					Volver
				</Button>
			</Container>
	);
};

export default Tareas;
