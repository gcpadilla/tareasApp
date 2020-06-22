import React from "react";
import { Link } from "react-router-dom";

const TareasCards = (props) => {

    return (
        <div className="card text-white bg-info m-3" style={{ "width": "18rem" }}>
            <button
                type="button"
                className="close text-right"
                aria-label="Close"
                onClick={() => props.borrar(props.tarea._id)}
            >
                <span aria-hidden="true">&times;</span>
            </button>
            <div className="card-header">Titulo: {props.tarea.titulo}</div>
            <div className="card-body">
                <div className="card-text">Tarea:
                <p>{props.tarea.contenido}
                    </p>
                </div>
            </div>
            <Link className="btn btn-success" to={`/editar/${props.tarea._id}`} >Editar</Link>
        </div>
    );
};

export default TareasCards;
