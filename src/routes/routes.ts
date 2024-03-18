import express from "express";
import { Request, Response } from 'express';
import * as healthService from "../services/health";

export const router = express.Router();
// TODO: Change this to call healthController method. 
router.get("/health", (req, res) => {
  res.status(200).send("status: Ok");
});