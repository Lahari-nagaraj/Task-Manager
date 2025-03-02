const express = require("express");
const mongoose = require("mongoose");

const app = express();

const empRoutes = require("./routes/empRoute");

const MONGO_URI =`mongodb+srv://Lahari:LAhari@2005@cluster0.tho1n.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`

mongoose.connect(MONGO_URI)
.then(()=> console.log("MONGODB Connected"))
.catch(err => console.error(err));

app.use(express.json());
app.use("/api/emp",empRoutes);

const PORT = process.env.PORT || 5500;
app.listen(PORT, () => console.log("Server running on Port",PORT));
