import StormDB from "stormdb";
import { Celebrity } from "./types/celebrity";

export class CelebrityDatabase {
  private readonly database: StormDB;

  constructor(path: string) {
    const engine = new StormDB.localFileEngine(path);
    this.database = new StormDB(engine);
    this.database.default({});
    console.log("Database connected...");
  }

  async findAll(): Promise<Celebrity[]> {
    const data = await this.database.value();
    return Object.values(data);
  }

  async findOne(id: string): Promise<Celebrity> {
    return await this.database.get(id).value();
  }

  async create(celebrity: Celebrity) {
    const { id } = celebrity;
    const createObject: Celebrity = {
      ...celebrity,
      createdDate: new Date().toString(),
    };
    await this.database.set(id, createObject).save();
  }

  async delete(id: string) {
    this.database.get(id).delete(true);
    await this.database.save();
  }
}

export const celebrityDatabase = new CelebrityDatabase("database.stormdb");
