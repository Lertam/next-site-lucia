import { Client } from "basic-ftp";

class Downloader {
  private client: Client | null = null;

  async connect() {
    this.client = new Client();
    await this.client.access({
      host: process.env.FTP_HOST,
      user: process.env.FTP_USER,
      password: process.env.FTP_PASSWORD,
    });
  }

  async download(source: string, destination: string) {
    if (!this.client) {
      throw new Error("FTP client does not connected");
    }

    await this.client.downloadTo(
      `public/modules/shop/${destination}`,
      `/web/ymaxiProduct/billing2/php/modules/magazine/files/${source}`
    );
  }

  async close() {
    this.client?.close();
  }
}

export default Downloader;
