import { unserialize } from "php-serialize";
import {
  type ImageRow,
  type Image,
  type Category,
  type CategoryRow,
} from "./types";
import { RowDataPacket, Connection } from "mysql2/promise";

class Migrator {
  constructor(private connection: Connection) {}

  async getCategories(): Promise<Category[]> {
    const [result] = await this.connection.query<CategoryRow[]>(
      "SELECT id, name, weight FROM yzakaz_category WHERE active = 1 AND parent = 4 ORDER BY weight asc;"
    );
    return result.map(Migrator.mapCategory);
  }

  static mapCategory(row: CategoryRow): Category {
    return {
      id: row[0],
      name: row[1],
      weight: row[2],
    };
  }
  async getImageCategoryCount(categoryId: number): Promise<number> {
    const [result] = await this.connection.query<RowDataPacket[]>(
      "SELECT COUNT(*) FROM yzakaz_price WHERE category = ?;",
      [categoryId]
    );
    return result[0][0];
  }

  async getCategoryImages(categoryId: number): Promise<Image[]> {
    const [result] = await this.connection.query<ImageRow[]>(
      `SELECT id, name, price, v_hide, weight, file_tovar, url_img_full, img_url, array_data_file, date_add  FROM yzakaz_price WHERE category = ${categoryId} LIMIT 3`
    );
    return result.map(Migrator.mapImage);
  }

  static mapImage(image: ImageRow): Image {
    return {
      id: image[0],
      name: image[1],
      price: image[2],
      hide: image[3],
      weight: image[4],
      file: image[5],
      preview: image[6],
      mini: image[7],
      data: unserialize(image[8]),
      createdAt: image[9],
    };
  }
}

export default Migrator;
