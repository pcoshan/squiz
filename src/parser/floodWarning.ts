import { Downloader } from '../floods/Downloader';
import {
  FloodWarningParsed,
  FloodWarningResponse,
  product_map,
  service_map,
} from '../types';
import { parseXml, parseXmlNew } from './parser';

export class FloodWarningParser {
  constructor(private xmlString: any) {}

  async getWarning(): Promise<FloodWarningParsed> {
    const parsedData: FloodWarningResponse = await new Promise(
      (resolve, reject) => {
        parseXmlNew(this.xmlString, (data) => {
          resolve(data);
          reject(new Error('An error has occured while parsing the Xml'));
        });
      }
    );
    console.warn(parsedData);
    const productType: string | null =
      product_map.get(parsedData.amoc['product-type']) ?? null;
    const service: string | null =
      service_map.get(parsedData.amoc['service']) ?? null;
    const issueTime: string | null = parsedData.amoc['issue-time-utc'] ?? null;
    const endTime: string | null = parsedData.amoc['issue-time-utc'] ?? null;
    const result: FloodWarningParsed = {
      product: productType,
      service: service,
      start: issueTime,
      expiry: endTime,
    };
    return result;
  }

  //TODO: This is not used any where but ive refactored it anyway
  async getWarningText(): Promise<string> {
    const warning: FloodWarningResponse = await new Promise(
      (resolve, reject) => {
        parseXmlNew(this.xmlString, (data) => {
          resolve(data);
          reject(new Error('An error has occured while parsing the xml'));
        });
      }
    );
    const downloader = new Downloader();
    const warningText = await downloader.downloadText(warning.amoc.identifier);
    return warningText;
  }
}
