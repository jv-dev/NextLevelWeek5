import { Request, Response,  } from "express";
import SettingsService from '../services/SettingsService';

export default class SettingsController {

  async create(request: Request, response: Response) {
    const { chat, username } = request.body;

    const settingsService = new SettingsService();
    
    try {
      const settings = settingsService.create({chat, username});
      response.json(settings);
    } catch (error){
      return response.status(400).json({message: error.message})
    }
  }

  async findByUsername(request: Request, response: Response) {
    const { username } = request.params;

    const settingsService = new SettingsService();

    const settings = await settingsService.findByUserName(username);
    
    return response.json(settings);
  }

  async update(request: Request, response: Response) {
    const { username } = request.params;
    const { chat } = request.body;

    const settingsService = new SettingsService();

    const settings = await settingsService.update(chat, username);
    
    return response.json(settings);
  }
}