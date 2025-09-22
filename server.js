import express from "express";
import memesRoutes from "./src/routes/memeRoutes.js";
import dotenv from "dotenv";

const app = express();
app.use(express.json());

dotenv.config();
const serverPort = process.env.PORT || 4005;

app.get("/", (req,res)=> {
    res.send("servidor funcionando");
});

app.use("/memes", memesRoutes);

app.listen(serverPort, () => {
    console.log(`servidor rodando em http://localhost:${serverPort}`);
});