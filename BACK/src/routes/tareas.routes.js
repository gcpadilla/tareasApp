const express = require("express");
const { check } = require("express-validator");
const router = express.Router();

const tareaController = require("../contollers/tarea.controller");

router.post(
	"/",
	[
		check("titulo", "no puede haber campos vacios").notEmpty(),
		check("contenido", "no puede haber campos vacios").notEmpty(),
	],
	tareaController.createTarea
);
router.get("/", tareaController.getAllTareas);
router.get("/:id", tareaController.getTarea);
router.put("/:id", tareaController.updateTarea);
router.delete("/:id", tareaController.deleteTarea);

module.exports = router;
