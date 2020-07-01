import { IsWebsiteUp } from '../src/crawler/handler';

describe('Check if Website is Up to', () => {
    test('is up?', async () => {
        const check = await IsWebsiteUp({
            url: 'https://stackoverflow.com/',
        });
        expect(!!check).toBe(true);
    });
});
