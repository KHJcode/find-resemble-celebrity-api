import { Celebrity } from "./types/celebrity";
import { celebrityDatabase } from "./celebrity-database";
import { nets, detectSingleFace, euclideanDistance } from "face-api.js";
import { canvas, faceDetectionOptions } from "./commons";

interface ICreateCelebrity {
  readonly id: string;
  readonly name: string;
}

export class CelebrityService {
  constructor() {
    this.loadFaceAPIModels();
  }

  loadFaceAPIModels() {
    const MODELS_DIRECTORY = __dirname + "/../assets/models";
    Promise.all([
      nets.faceRecognitionNet.loadFromDisk(MODELS_DIRECTORY),
      nets.faceLandmark68Net.loadFromDisk(MODELS_DIRECTORY),
      nets.ssdMobilenetv1.loadFromDisk(MODELS_DIRECTORY),
    ]);
  }

  async getAllCelebrities(): Promise<Celebrity[]> {
    const celebrities = await celebrityDatabase.findAll();
    return Object.values(celebrities);
  }

  async createCelebrity(celebrity: ICreateCelebrity): Promise<void> {
    const { id, name } = celebrity;
    const faceData = await this.getFaceDataByPhotoId(id);
    if (!faceData) throw new Error("face data of the image is not found.");
    await celebrityDatabase.create({ id, name, faceData });
  }

  async getMostResembleCelebrityByPhotoId(
    photoId: string
  ): Promise<Celebrity | undefined> {
    const celebrities = await this.getAllCelebrities();
    const faceData = await this.getFaceDataByPhotoId(photoId);
    let maxSimilarity = -1;
    let currentCelebrity;
    for (const celebrity of celebrities) {
      const similarity = euclideanDistance(faceData, celebrity.faceData);
      if (maxSimilarity < similarity) {
        currentCelebrity = celebrity;
        maxSimilarity = similarity;
      }
    }
    return currentCelebrity;
  }

  private async getFaceDataByPhotoId(photoId: string): Promise<any> {
    const image = (await canvas.loadImage(
      `${__dirname}/../uploads/${photoId}.jpg`
    )) as any;
    return await detectSingleFace(image, faceDetectionOptions)
      .withFaceLandmarks()
      .withFaceDescriptor();
  }
}

export const celebrityService = new CelebrityService();
