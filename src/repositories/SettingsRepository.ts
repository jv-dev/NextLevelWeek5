import { EntityRepository, Repository } from "typeorm";
import Setting from "../entities/Settings";

@EntityRepository(Setting)
export default class SettingsRepository extends Repository<Setting> {

}