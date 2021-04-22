import { Router } from "express";
import SettingsController from "./controllers/SettingsController";

export const routes = Router();

const settings = new SettingsController();

routes.post("/settings", settings.create);