import { EntityRepository, Repository } from "typeorm";
import User from "../entities/Users";

@EntityRepository(User)
export default class UsersRepository extends Repository<User> {

}