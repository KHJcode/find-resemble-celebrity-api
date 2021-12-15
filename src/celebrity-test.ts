import fs from "fs";
import csv from "csv-parser";
import download from "image-downloader";
import { CelebrityService } from "./celebrity-service";
import { v4 } from "uuid";

interface ICSVRow {
  readonly name: string;
  readonly image: string;
}

export class CelebrityTest {
  private readonly dataset: ICSVRow[] = [];

  constructor(private readonly celebrityService: CelebrityService) {
    this.loadTestCSV();
  }

  private async loadTestCSV() {
    fs.createReadStream(`${__dirname}/../assets/example/celebrity-test.csv`)
      .pipe(csv())
      .on("data", (data: ICSVRow) => {
        this.dataset.push(data);
      });
  }

  private async downloadPhotoAndGetId(url: string, path: string) {
    const photoId = v4();
    const dest = `${__dirname}/${path}/`;
    try {
      await download
        .image({
          url,
          dest,
        })
        .then(({ filename }: any) => {
          fs.rename(filename, `${dest}/${photoId}.jpg`, (err) => {
            if (err) throw err;
          });
        });
    } catch (err) {
      console.error(err);
    }
    return photoId;
  }

  async run(): Promise<void> {
    for (const { name, image } of this.dataset) {
      const id = await this.downloadPhotoAndGetId(image, "../uploads");
      console.log(`${id}.jpg saving...`);
      await this.celebrityService.createCelebrity({
        id,
        name,
      });
    }
    console.log("Test complete!");
  }
}
