const mongoose = require("mongoose");
const { validationResult } = require("express-validator");
const TareaModel = require("../models/tarea.models");

//CREAR TAREA
exports.createTarea = async (req, res) => {
	//console.log(req.body)
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(422).json({ errors: errors.array() });
	}

	const tarea = new TareaModel(req.body);


	try {
		await tarea.save();
		res.send(tarea);
	} catch (err) {
		res.status(500).send(err);
	}
};

//ACTUALIZAR TAREA
exports.updateTarea = async (req, res) => {
	try {
		if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
			return res.status(404).json({ message: "Tarea no encontrada." });
		}

		const tarea = await TareaModel.findByIdAndUpdate(
			req.params.id,
			req.body,
			{ new: true }
		);

		if (!tarea) {
			return res.status(404).json({ message: "Tarea no encontrada." });
		}

		res.send(tarea);
	} catch (err) {
		res.status(500).send(err);
	}
};

//BORRAR TAREA
exports.deleteTarea = async (req, res) => {
   //console.log(req.params.id);
	try {
		if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
			return res.status(404).json({ message: "Tarea no encontrada." });
		}

		const tarea = await TareaModel.findByIdAndDelete(req.params.id);

		if (!tarea) {
			return res.status(404).json({ message: "Tarea no encontrada." });
		}

		return res
			.status(200)
			.send({ message: "Tarea borrada" });
	} catch (err) {
		res.status(500).send(err);
	}
};

//OBTENER TAREA PARA MODIFICAR
exports.getTarea = async (req, res) => {
	try {
		if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
			return res.status(404).json({ message: "Tarea no encontrada." });
		}

		const tarea = await TareaModel.findById(req.params.id);

		if (!tarea) {
			return res.status(404).json({ message: "area no encontrada." });
		}

		res.send(tarea);
	} catch (err) {
		res.status(500).send(err);
	}
};

//OBTENER TODAS LAS TAREAS
exports.getAllTareas = async (req, res) => {
	try {
		const tareas = await TareaModel.find({});
		res.send(tareas);
	} catch (err) {
		res.status(500).send(err);
	}
};


