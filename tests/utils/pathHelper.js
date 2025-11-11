import path from 'path';

/**
 * Gets the Path for Fixtures
 * @param { Object } File name Example - users.json
 * @returns { Promise<void> } 
 */
export function getPath(fileName) {
    return path.resolve(__dirname, '..', 'fixtures', fileName);
};