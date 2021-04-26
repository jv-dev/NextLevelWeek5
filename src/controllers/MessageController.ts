import { Request, Response } from "express";
import MessagesService from "../services/MessageService";

export default class MessagesController {

  async create(request: Request, response: Response) {
    const { admin_id, text, user_id } = request.body;

    const messagesSevice = new MessagesService();

    const message = await messagesSevice.create({admin_id, text, user_id});

    return response.json(message);
  }

  async showByUser(request: Request, response: Response) {
    const { id } = request.params;

    const messagesSevice = new MessagesService();

    const list = await messagesSevice.listByUser(id);

    return response.json(list);
  }
}