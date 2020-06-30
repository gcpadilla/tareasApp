import React, { useRef, useState, useEffect } from "react";
import { Container, Button, Input, Box } from "@material-ui/core";
import { useHistory, useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

const EditTarea = () => {
	const ref = useRef();
	const [tarea, setTarea] = useState({
		titulo: "",
		contenido: "",
	});
	const history = useHistory();
	const params = useParams();

	useEffect(() => {
		const traer = () => {
			axios
				.get(`/api/v1/tareas/${params.id}`)
				.then((res) => {
					const data = res.data;
					setTarea({
						titulo: data.titulo,
						contenido: data.contenido,
					});
				})
				.catch((err) => {
					console.log("entro al err de traer todo");
				});
		};
		traer();
		ref.current.focus();
	}, [params.id]);

	const guardar = (data) => {
		axios
			.put(`/api/v1/tareas/${params.id}`, data)
			.then(() => {
				Swal.fire({
					icon: "success",
					text: "Tarea modificada...",
					width: 250,
					showConfirmButton: false,
					timer: 2000,
				});
			})
			.catch((err) => {
				Swal.fire({
					icon: "info",
					text: "Hubo algun error",
					width: 250,
					showConfirmButton: false,
					timer: 2500,
				});
			});
		history.push("/Tareas");
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
		<Container>
			<Box mt={2}>
				<form onSubmit={handleSubmit}>
					<div>
						<Input
							ref={ref}
							onChange={handleChange}
							value={tarea.titulo || ""}
							name="titulo"
							type="text"
							autoComplete="off"
						/>
					</div>
					<div>
						<Input
							onChange={handleChange}
							value={tarea.contenido || ""}
							name="contenido"
							type="text"
							autoComplete="off"
						/>
					</div>
					<Box mt={2}>
						<Button type="submit" variant="contained" color="primary">
							Guardar
						</Button>
					</Box>
				</form>
			</Box>
			<Box mt={2}>
				<Button variant="contained" color="secondary" component={Link} to="/Tareas">
					Cancelar
				</Button>
			</Box>
		</Container>
	);
};

export default EditTarea;
