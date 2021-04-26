import { Router } from "express";
import MessagesController from "./controllers/MessageController";
import SettingsController from "./controllers/SettingsController";
import UsersController from "./controllers/usersController";

export const routes = Router();

const settings = new SettingsController();
const users = new UsersController();
const messages = new MessagesController();

routes.post("/settings", settings.create);
routes.get("/settings/:username", settings.findByUsername);
routes.put("/settings/:username", settings.update);

routes.post("/users", users.create);

routes.post("/messages", messages.create);
routes.get("/messages/:id", messages.showByUser);