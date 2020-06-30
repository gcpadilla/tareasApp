import React, { useRef, useState } from "react";
import { Container, Button, TextField,Box } from "@material-ui/core";
import SaveIcon from '@material-ui/icons/Save';
import { Link } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

const HomePage = () => {
	const ref = useRef();
	const [tarea, setTarea] = useState({
		titulo: "",
		contenido: "",
	});

	const guardar = (data) => {
		axios
			.post(`/api/v1/tareas`, data)
			.then(() => {
				Swal.fire({
					icon: "success",
					text: "Tarea guardada...",
					width: 250,
					showConfirmButton: false,
					timer: 2000,
				});
			})
			.catch((err) => {
				Swal.fire({
					icon: "info",
					text: `${err.response.data.errors[0].msg}`,
					width: 250,
					showConfirmButton: false,
					timer: 2500,
				});
			});
	};

	const handleChange = (ev) => {
		setTarea({
			...tarea,
			[ev.target.name]: ev.target.value,
		});
	};

	const handleSubmit = (ev) => {
		ev.preventDefault();
		let datos = {
			titulo: tarea.titulo,
			contenido: tarea.contenido,
		};
		guardar(datos);

		setTarea({
			titulo: "",
			contenido: "",
		});
	};

	return (
		<Container maxWidth="xl">
			<Box textAlign="center" fontSize="h3.fontSize">App de Tareas</Box>
			<form onSubmit={handleSubmit} >
				<div>
					<TextField
						ref={ref}
						onChange={handleChange}
						value={tarea.titulo}
						name="titulo"
						type="text"
						placeholder="Titulo..."
						autoComplete="off"
					/>
				</div>
				<div>
					<TextField
						onChange={handleChange}
						value={tarea.contenido}
						name="contenido"
						type="text"
						placeholder="Contenido..."
						autoComplete="off"
					/>
				</div>
        <Box mt={2}>
				<Button type="submit" variant="contained" color="primary" size="small" startIcon={<SaveIcon />}>
					Guardar
				</Button>
        </Box>
			</form>
			<Box mt={2}>
				<Button variant="contained" color="primary" size="small" component={Link} to="Tareas">
						Tareas guardadas
				</Button>
			</Box>
		</Container>
	);
};

export default HomePage;
