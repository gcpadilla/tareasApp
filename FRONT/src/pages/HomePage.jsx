import React, { useRef, useState } from "react";
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
    <div className="container">
      <h1 className="display-4 text-center border-bottom border-dark">
        App de Tareas
        </h1>
      <form className="mt-3" onSubmit={handleSubmit}>
        <label htmlFor="formGroupExampleInput">Titulo</label>
        <input
          ref={ref}
          onChange={handleChange}
          value={tarea.titulo}
          name="titulo"
          className="form-control"
          type="text"
          placeholder="Titulo..."
          autoComplete="off"
        />
        <label className="mt-3" htmlFor="formGroupExampleInput">
          Contenido
            </label>
        <input
          className="form-control"
          onChange={handleChange}
          value={tarea.contenido}
          name="contenido"
          type="text"
          placeholder="Contenido..."
          autoComplete="off"
        />
        <button
          className="btn btn-primary mt-3"
          type="submit"
        >Guardar</button>
      </form>
      <div className="row mt-3">
        <Link className="btn btn-outline-primary ml-3" to="Tareas">Tareas guardadas</Link>
      </div>
    </div>
  );
};

export default HomePage;
