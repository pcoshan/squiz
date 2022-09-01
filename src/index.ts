import express, { Request, Response } from 'express';
import { getWarnings } from './floods/amoc';
import { Downloader } from './floods/Downloader';
import { getAmocToStateId } from './getAmocToStateId';
import { FloodWarningParser } from './parser/floodWarning';
import { Warning } from './types';

require('./logger.ts');

const app = express();
const port = 3000;
const ERRORMESSAGE = 'Something went wrong';

app.get('/', async (req: Request, res: Response) => {
  try {
    const data = await getWarnings();
    const state = getAmocToStateId(req?.query?.state?.toString() || '');
    const results: string[] = [];
    if (!!data) {
      data.forEach((warning: Warning) => {
        if (warning.id.startsWith(state)) {
          results.push(warning.id.replace(/\.amoc\.xml/, ''));
        }
      });
    }
    res.send(results);
  } catch (error) {
    console.log(error);
    res.send(ERRORMESSAGE); //send back error response code
  }
});

app.get('/warning/:id', async (req: Request, res: Response) => {
  try {
    const downloader = new Downloader();
    const xmlid = req.params.id;

    const warning = await downloader.download(xmlid);
    const warningParser = new FloodWarningParser(warning);
    const text = await downloader.downloadText(xmlid);
    res.send({ ...(await warningParser.getWarning()), text: text || '' });
  } catch (error) {
    console.log(error);
    res.send(ERRORMESSAGE); //send back error response code
  }
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
