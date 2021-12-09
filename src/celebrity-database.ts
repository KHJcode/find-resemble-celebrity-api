import { readFileSync } from "fs";
import { readFile, writeFile } from "fs/promises";
import { Celebrity } from "./types/celebrity";

function handleException(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
  const originalMethod = descriptor.value;
  descriptor.value = async (...args: any[]) => {
    try {
      return await originalMethod(...args);
    } catch (error: any) {
      console.error(`[DATABASE ERROR]: ${error?.message}`);
    }
  };
}

export class CelebrityDatabase {
  constructor(uri: string) {
    this.fileUri = uri;
    this.initialize();
  }

  private readonly fileUri: string;
  private celebrities: Celebrity[] = [];

  @handleException
  private initialize(): void {
    this.celebrities = JSON.parse(readFileSync(this.fileUri).toString());
  }

  @handleException
  async findAll(): Promise<Celebrity[]> {
    if (!this.celebrities) {
      const celebrities = JSON.parse((await readFile(this.fileUri)).toString());
      this.celebrities = celebrities;
      return celebrities;
    }
    return this.celebrities;
  }

  @handleException
  async create(celebrity: Celebrity): Promise<void> {
    const newCelebrities = [...this.celebrities, celebrity];
    await writeFile(this.fileUri, newCelebrities.toString(), (error: any) => {
      if (error) throw error;
    });
    this.celebrities = newCelebrities;
  }

  @handleException
  async update(): Promise<void> {

  }

  @handleException
  async delete(): Promise<void> {

  }
}
