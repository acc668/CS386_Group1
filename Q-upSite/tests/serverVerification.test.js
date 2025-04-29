const { registerUser, getUserByUsername } = require('../server');
const bcrypt = require('bcrypt');

describe('Verification: Register User', () => {
    const testUsername = 'testUser';
    const testPassword = 'testUserPass';

    afterAll(async () => {
        // TODO: Clean up after tests
    });

    test('registerUser stores a hashed password, not the plain password', async () => {
        await registerUser(testUsername, testPassword);

        const userRecord = await getUserByUsername(testUsername);
        expect(userRecord).toBeDefined();
        expect(userRecord.password).not.toBe(testPassword); // should NOT be plain text

        const passwordMatches = await bcrypt.compare(testPassword, userRecord.password);
        expect(passwordMatches).toBe(true); // bcrypt verifies the hash matches the plain password
    });
});
