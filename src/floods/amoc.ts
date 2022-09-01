import { Client } from 'basic-ftp';
import { Warning } from '../types';

export async function getWarnings(): Promise<Warning[] | undefined> {
  const client = new Client();
  client.ftp.verbose = true;
  try {
    await client.access({
      host: 'ftp.bom.gov.au',
      secure: false,
    });

    await client.cd('/anon/gen/fwo/');

    const files = await client.list();

    const warns: Warning[] = [];
    for (let file in files) {
      if (files[file].name.endsWith('.amoc.xml')) {
        const newWarning: Warning = {
          id: files[file].name,
          value: true,
        };
        warns.push(newWarning);
      }
    }
    console.log('WARNS', warns);
    client.close();
    return warns;
  } catch (err) {
    console.log(err);
  }
}

//Commented this out as ive decided its a potentially a duplicate function definition.
// export function getWarning(id: string) {
//
// }
