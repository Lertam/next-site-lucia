import { RowDataPacket } from "mysql2/promise";

export interface CategoryRow extends RowDataPacket {
  // id
  0: number;
  // name
  1: string;
  // weight
  2: number;
}

export type Category = {
  id: number;
  name: string;
  weight: number;
};

export interface ImageRow extends RowDataPacket {
  0: number;
  1: string;
  2: number;
  3: number;
  4: number;
  5: string;
  6: string;
  7: string;
  8: string;
  9: Date;
}

export type Image = {
  id: number;
  name: string;
  price: number;
  hide: number;
  weight: number;
  file: string;
  preview: string;
  mini: string;
  data: ImageData;
  createdAt: Date | null;
};

type ImageData = {
  width: number;
  height: number;
  dpi: number;
  widthSM: number;
  heightSM: number;
  dpiSM: number;
  widthD: number;
  heightD: number;
};
