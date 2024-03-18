import express from "express";
import * as commentController from "../controllers/youtube_comment.controller";
import { Request, Response } from 'express';
import * as healthService from "../services/health";

export const router = express.Router();
// TODO: Change this to call healthController method. 
router.get("/health", (req, res) => {
  res.status(200).send("status: Ok");
});

router.get("/comments", commentController.getAllYoutubeComments);
