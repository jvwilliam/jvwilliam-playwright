import path from 'path';

const PROJECT_ROOT = path.resolve(__dirname, '../..');

/**
 * Get the absolute path to a fixture file.
 * @param fileName - e.g. 'users.json'
 * @returns absolute path to the fixture file
 */
export function getPath(fileName: string): string {
    return path.resolve(PROJECT_ROOT, 'src/data', fileName);
};