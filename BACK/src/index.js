const express = require("express");
require("dotenv").config();
const cors = require("cors");

const app = express();
const port = 3001; 

app.use(express.json());

require("./database");

const tareasRoutes = require("./routes/tareas.routes");

app.use("/api/v1/tareas", tareasRoutes);

app.use(function (req, res, next) {
	res.status(404).json({ message: "Sorry can't find that!" });
});

app.listen(port, () =>
	console.log(`app listening at http://localhost:${port}`)
);
