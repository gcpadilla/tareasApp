import React, { useState, useEffect } from "react";
import { Container, Button, Box } from "@material-ui/core";
import TareasCards from "../components/TareasCards";
import { Link } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

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

	const borrar = (id) => {

		Swal.fire({
			title: 'Esta seguro?',
			text: "No podra recuperar!",
			icon: 'warning',
			showCancelButton: true,
			confirmButtonColor: '#3085d6',
			cancelButtonColor: '#d33',
			confirmButtonText: 'Si, borrar!'
		}).then(async (result) => {
			if (result.value) {
				await axios.delete(`/api/v1/tareas/${id}`);
				Swal.fire({
					icon: "success",
					text: "Tarea eliminada...",
					width: 250,
					showConfirmButton: false,
					timer: 2000,
				})
				setActualizar(true);
			}
		})
	
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
