import { Warning } from '../types';
import { getWarnings } from './amoc';

describe('getting data', () => {
  it('should download data', async () => {
    const warnings: Warning[] | undefined = await getWarnings();

    expect(warnings?.length).toBeGreaterThan(1);
  });

  it('should download data', async () => {
    const warnings: Warning[] | undefined = await getWarnings();
    expect(warnings).toContain('IDQ11307.amoc.xml');
  });
});
