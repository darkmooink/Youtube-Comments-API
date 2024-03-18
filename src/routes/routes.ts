import express from "express";
import * as commentController from "../controllers/youtube_comment.controller";

export const router = express.Router();

router.get("/comments", commentController.getAllYoutubeComments);
