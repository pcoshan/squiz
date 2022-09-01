import { Client } from 'basic-ftp';

import fs from 'fs';
export class Downloader {
  async download(key: string) {
    const client = new Client();
    client.ftp.verbose = true;
    try {
      await client.access({
        host: 'ftp.bom.gov.au',
        secure: false,
      });

      await client.cd('/anon/gen/fwo/');

      const files = await client.list();

      for (let file in files) {
        if (files[file].name.endsWith('.amoc.xml')) {
          if (`${key}.amoc.xml` == files[file].name) {
            //change Download to Download to
            await client.downloadTo(`./${key}.xml`, files[file].name);
          }
        }
      }
      client.close();

      const data = this.readData(key);

      client.close();
      return data;
    } catch (err) {
      console.log(key + ' file not found');
      return '';
    }
  }

  readData(key: string): string {
    return fs.readFileSync(`./${key}.xml`, { encoding: 'utf-8' });
  }

  async downloadText(key: string) {
    const client = new Client();
    client.ftp.verbose = true;
    let warningText = '';
    try {
      await client.access({
        host: 'ftp.bom.gov.au',
        secure: false,
      });

      await client.cd('/anon/gen/fwo/');
      //change Download to Download to
      await client.downloadTo(`./${key}.txt`, key + '.txt');

      warningText = fs.readFileSync(`./${key}.txt`, {
        encoding: 'utf-8',
      });
    } catch (err) {
      console.log(key + ' file not found');
      return '';
    }

    client.close();

    return warningText;
  }
}
