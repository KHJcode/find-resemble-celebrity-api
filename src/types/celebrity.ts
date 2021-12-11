export interface CelebrityId {
  id: string;
}

export interface CelebrityItem extends CelebrityId {
  name: string;
}

export interface Celebrity extends CelebrityItem{
  faceData: any;
  createdDate?: string;
}
