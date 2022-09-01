// http://www.bom.gov.au/schema/v1.7/amoc.xsd
//TODO this is a javascript import remove this
const parseString = require('xml2js').parseString;

//change parser package to https://www.npmjs.com/package/fast-xml-parser

//TODO fix types
export function parseXml(xml: string, callback: (result: any) => void) {
  parseString(xml, function (err: any, result: any) {
    callback(result);
  });
}
