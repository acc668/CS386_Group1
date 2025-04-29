const request = require('supertest');
const app = require('../server'); // Express app

describe('Acceptance: User Registration and Login', () => {
    const testUser = { username: 'testUser', password: 'testUserPass' };

    afterAll(async () => {
        // TODO: Clean UP after tests
    });

    test('Successful Registration and Log-in of User', async () => {
        // Register
        const registerResponse = await request(app)
            .post('/New_Account')
            .send(testUser);

        expect(registerResponse.statusCode).toBe(201); // Created
        expect(registerResponse.body.message).toBe('User registered successfully.');

        // Login
        const loginResponse = await request(app)
            .post('/login')
            .send(testUser);

        expect(loginResponse.statusCode).toBe(200); // OK
        expect(loginResponse.body.message).toBe('Login successful.');
        expect(loginResponse.body.token).toBeDefined(); // Maybe you send back a token?
    });
});
