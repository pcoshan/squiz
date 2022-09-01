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
    //Is there a way to optimise this????
    const files = await client.list();

    const warnings: Warning[] = [];
    files.forEach((file) => {
      if (file.name.endsWith('.amoc.xml')) {
        const newWarning: Warning = {
          id: file.name,
          value: true,
        };
        warnings.push(newWarning);
      }
    });
    client.close();
    return warnings;
  } catch (err) {
    console.log(err);
  }
}

//Commented this out as ive decided its a potentially a duplicate function dec.
// export function getWarning(id: string) {
//
// }
