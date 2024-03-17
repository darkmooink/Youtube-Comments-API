import express from "express";
import { Request, Response } from 'express';
import * as healthService from "../services/health";

export const router = express.Router();
// router.get("/health", healthService.getHealth);
router.get("/health", (req, res) => {
  res.status(200).send("Ok");
});