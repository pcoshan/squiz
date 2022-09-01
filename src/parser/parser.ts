// http://www.bom.gov.au/schema/v1.7/amoc.xsd

//change parser package to https://www.npmjs.com/package/fast-xml-parser
import { XMLParser, XMLValidator } from 'fast-xml-parser';
//TODO fix types
const parser = new XMLParser();
export function parseXmlNew(xml: string, callback: (result: any) => void) {
  const parsedResult = parser.parse(xml);
  callback(parsedResult);
  //Could look to validate the xml here
  // if (XMLValidator.validate(parsedResult)) {}
}

//Previous method leave here for reference for now
const parseString = require('xml2js').parseString;
export function parseXml(xml: string, callback: (result: any) => void) {
  parseString(xml, function (err: any, result: any) {
    callback(result);
  });
}
