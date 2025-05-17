const request = require('supertest');
const app = require('../app'); // Adjust the path if necessary

describe('Performance Tests', () => {
    it('should respond within 200ms for the home route', async () => {
        const start = Date.now();
        await request(app).get('/');
        const duration = Date.now() - start;
        expect(duration).toBeLessThan(200);
    });

    it('should respond within 300ms for the login route', async () => {
        const start = Date.now();
        await request(app).post('/api/auth/login').send({
            username: 'testuser',
            password: 'testpassword'
        });
        const duration = Date.now() - start;
        expect(duration).toBeLessThan(300);
    });

    it('should respond within 300ms for the registration route', async () => {
        const start = Date.now();
        await request(app).post('/api/auth/register').send({
            username: 'newuser',
            password: 'newpassword'
        });
        const duration = Date.now() - start;
        expect(duration).toBeLessThan(300);
    });
});