import express, { Router } from "express";
import { getProperties } from "../controllers";


const propertyController = Router();
propertyController.use(express.json());

propertyController.get("/my-properties", getProperties);

export default propertyController;
