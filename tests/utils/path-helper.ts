import path from 'path';

/**
 * Get the absolute path to a fixture file.
 * @param fileName - e.g. 'users.json'
 * @returns absolute path to the fixture file
 */
export function getPath(fileName: string): string {
    //return path.resolve(__dirname, '..', 'fixtures', fileName);
    return path.resolve(process.cwd(), 'tests', 'fixtures', fileName);
};