const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

const empRoutes = require("./routes/empRoute");

const MONGO_URI =`mongodb+srv://admin:admin123@cluster0.0hxjl.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`

app.use(express.json());
app.use(cors());

mongoose.connect(MONGO_URI)
.then(()=> console.log("MONGODB Connected"))
.catch(err => console.error(err));


app.use("/api/emp",empRoutes);
//app.use("/api/task",taskRoutes);

const PORT = process.env.PORT || 5500;
app.listen(PORT, () => console.log("Server running on Port",PORT));
