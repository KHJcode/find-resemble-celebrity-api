export interface CelebrityId {
  readonly id: string;
}

export interface Celebrity extends CelebrityId {
  readonly name: string;
  readonly faceData: any;
  readonly createdDate?: string;
}
