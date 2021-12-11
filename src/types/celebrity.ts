export interface CelebrityId {
  readonly id: string;
}

export interface CelebrityItem extends CelebrityId {
  readonly name: string;
}

export interface Celebrity extends CelebrityItem{
  readonly faceData: any;
  readonly createdDate?: string;
}
