import { EntityRepository, Repository } from "typeorm";
import Messages from "../entities/Messages";

@EntityRepository(Messages)
export default class MessagesRepository extends Repository<Messages>{

}