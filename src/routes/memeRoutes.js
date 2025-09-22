import express from "express";

import {
    getAllmemes,
    getMemesById,
    createMeme,
    deleteMeme,
  } from "../controllers/controllerMemes.js";

  const router = express.Router();

  router.get("/", getAllmemes);
  router.get("/:id",  getMemesById );
  router.post("/", createMeme);
  router.delete("/:id", deleteMeme);

  export default router;
  