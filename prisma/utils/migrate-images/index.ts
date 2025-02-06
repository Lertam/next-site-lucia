import { config } from "dotenv";
import * as mysql from "mysql2/promise";
import Migrator from "./Migrator.class";
import { promises as fs } from "fs";
import Downloader from "./Downloader.class";
import { Prisma, PrismaClient } from "@prisma/client";
import { randomUUID } from "crypto";

config({ path: [".env.migrate"] });

const clearDirectories = async () => {
  console.log("clearing directories...");

  await fs.rm("public/modules/shop", { recursive: true, force: true });

  await fs.mkdir("public/modules/shop");
  await fs.mkdir("public/modules/shop/sources");
  await fs.mkdir("public/modules/shop/preview");
  await fs.mkdir("public/modules/shop/mini");

  console.log("Done");
};

function makeid(length: number = 15): string {
  let result = "";
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const charactersLength = characters.length;
  let counter = 0;
  while (counter < length) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
    counter += 1;
  }
  return result;
}

const migrateImages = async () => {
  console.log("migrating images...");

  const prisma = new PrismaClient();

  await prisma.shopCategory.deleteMany();
  await prisma.shopItem.deleteMany();

  await clearDirectories();
  const downloader = new Downloader();
  await downloader.connect();

  const client = await mysql.createConnection({
    host: process.env.OLD_DB_HOST,
    user: process.env.OLD_DB_USER,
    password: process.env.OLD_DB_PASSWORD,
    database: process.env.OLD_DB_NAME,
    port: Number(process.env.OLD_DB_PORT),
    rowsAsArray: true,
  });
  const migrator = new Migrator(client);
  const categories = await migrator.getCategories();

  for (const category of categories) {
    const categoryItem = await prisma.shopCategory.create({
      data: {
        name: category.name,
        weight: category.weight,
        id: makeid(),
      },
    });

    console.log(`Created category ${categoryItem.id}`);

    const images = await migrator.getCategoryImages(category.id);

    const ids: number[] = [];

    for (const image of images) {
      const source = image.file;
      const preview = image.preview;
      const mini = image.mini;

      await downloader.download(`filetovar/${source}`, `/sources/${source}`);
      await downloader.download(`imgtovar/${preview}`, `/preview/${preview}`);
      await downloader.download(`imgtovar/${mini}`, `/mini/${mini}`);

      try {
        const img = await prisma.shopItem.create({
          data: {
            name: image.name,
            price: image.price,
            created: image.createdAt ? image.createdAt : new Date(),
            data: image.data,
            preview,
            mini,
            source,
          },
        });
        ids.push(img.id);
      } catch (ex: unknown) {
        console.log("got error", ex, image.createdAt);
      }
    }
    await prisma.shopItem.updateMany({
      where: {
        id: {
          in: ids,
        },
      },
      data: {
        categoryId: categoryItem.id,
      },
    });
  }

  // const images = await migrator.getCategoryImages(categories[0].id);
  // console.log(images);

  // const res = await client.query("DESCRIBE yzakaz_price");
  // console.log(res);

  await client.end();
  await downloader.close();
};

// [ 'id', 'int(11)', 'NO', 'PRI', null, 'auto_increment' ],
//     [ 'name', 'varchar(255)', 'YES', 'MUL', null, '' ],
//     [ 'name_eng', 'varchar(255)', 'YES', 'MUL', null, '' ],
//     [ 'price', 'int(11)', 'YES', 'MUL', null, '' ],
//     [ 'vnakichii', 'int(11)', 'YES', '', '1', '' ],
//     [ 'url_img_full', 'varchar(255)', 'YES', '', null, '' ],
//     [ 'img_url', 'varchar(255)', 'YES', '', null, '' ],
//     [ 'opisanie', 'text', 'YES', '', null, '' ],
//     [ 'opisanie_eng', 'text', 'YES', 'MUL', null, '' ],
//     [ 'category', 'int(11)', 'YES', '', '1', '' ],
//     [ 'v_hide', 'int(1)', 'YES', '', '0', '' ],
//     [ 'weight', 'int(11)', 'NO', 'MUL', '0', '' ],
//     [ 'url_opisanie', 'text', 'YES', '', null, '' ],
//     [ 'file_tovar', 'varchar(255)', 'YES', '', null, '' ],
//     [ 'file_tovar_orig', 'varchar(255)', 'YES', '', null, '' ],
//     [ 'count_buy', 'int(11)', 'YES', 'MUL', '0', '' ],
//     [ 'rabocheePole', 'varchar(255)', 'YES', '', null, '' ],
//     [ 'qtip', 'varchar(500)', 'YES', '', null, '' ],
//     [ 'array_data_file', 'text', 'YES', '', null, '' ],
//     [ 'file_for_editor', 'varchar(255)', 'YES', '', null, '' ],
//     [ 'date_add', 'date', 'YES', '', null, '' ],
//     [ 'searchKey', 'text', 'YES', 'MUL', null, '' ],
//     [ 'searchKey_eng', 'text', 'YES', 'MUL', null, '' ],
//     [ 'url_form_buy_custom', 'varchar(255)', 'YES', '', null, '' ],
//     [ 'export_flag', 'int(11)', 'YES', '', '0', '' ],
//     [ 'md5', 'varchar(255)', 'YES', 'MUL', null, '' ],
//     [ 'unique_', 'varchar(255)', 'YES', '', null, '' ],
//     [ 'random', 'int(11)', 'YES', 'MUL', '0', '' ],
//     [ 'manufact', 'int(11)', 'YES', '', '0', '' ]

// [ 'ybilling_config' ]
// [ 'ybilling_price' ]
// [ 'ybilling_zakaz' ]
// [ 'yzakaz_category' ]
// [ 'yzakaz_pokupka' ]
// [ 'yzakaz_price' ]
// [ 'yzakaz_price_tmp' ]
// [ 'yzakaz_proizvoditeli' ]
// [ 'yzakaz_tovar' ]
// [ 'yzakaz_zakaz' ]

migrateImages().then(() => process.exit(0));

module.exports = { migrateImages };
