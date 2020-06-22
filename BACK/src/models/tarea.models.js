const mongoose = require("mongoose");

const TareaSchema = new mongoose.Schema(
	{
        titulo: {
			type: String,
			required: true,
		  },
        contenido: {
			type: String,
			required: true,
		  },
	},
	{ versionKey: false }
);

const TareaModel = mongoose.model("tareas", TareaSchema);

module.exports = TareaModel;
