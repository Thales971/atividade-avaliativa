import express from "express";

import {
    getAllmemes,
    getMemesById,
    createMeme,
    deleteMeme,
    updateMeme,
  } from "../controllers/controllerMemes.js";

  const router = express.Router();

  router.get("/", getAllmemes);
  router.get("/:id",  getMemesById );
  router.post("/", createMeme);
  router.delete("/:id", deleteMeme);
  router.put("/:id", updateMeme);

  export default router;
  