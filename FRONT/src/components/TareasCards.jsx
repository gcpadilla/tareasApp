import React from "react";
import { Button, Box } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import IconButton from "@material-ui/core/IconButton";
import { Card, Grid } from "@material-ui/core";
import { Link } from "react-router-dom";

const TareasCards = (props) => {
	return (
		<Grid item lg={4} md={6} sm={6} xs={12}>
			<Box m={2} boxShadow={3}>
				<Card>
					<Box textAlign="right">
						<IconButton
							aria-label="delete"
							onClick={() => props.borrar(props.tarea._id)}
							color="secondary"
						>
							<DeleteIcon />
						</IconButton>
					</Box>
					<Box m={1} fontWeight="fontWeightBold" fontSize="h6.fontSize">
						Titulo
					</Box>
					<Box ml={2}>
						<p>{props.tarea.titulo}</p>
					</Box>
						<Box m={1} fontWeight="fontWeightLight">
							Tarea
						</Box>
						<Box ml={2} fontWeight="fontWeightLight">
							<p>{props.tarea.contenido}</p>
						</Box>
					<Box m={1}>
						<Button
							variant="outlined"
							size="small"
							color="primary"
							component={Link}
							to={`/editar/${props.tarea._id}`}
						>
							Editar
						</Button>
					</Box>
				</Card>
			</Box>
		</Grid>
	);
};

export default TareasCards;
