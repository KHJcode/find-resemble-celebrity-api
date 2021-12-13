import { CelebrityDatabase } from "./celebrity-database";
import { CelebrityService } from "./celebrity-service";
import { CelebrityTest } from "./celebrity-test";

const DATABASE_PATH = "database.stormdb";

const celebrityDatabase = new CelebrityDatabase(DATABASE_PATH);

export const celebrityService = new CelebrityService(celebrityDatabase);
export const celebrityTest = new CelebrityTest(celebrityService);
