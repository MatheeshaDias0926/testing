const mongoose = require('mongoose');
const User = require('../models/User');

describe('Database Tests', () => {
    beforeAll(async () => {
        await mongoose.connect('mongodb://localhost:27017/testdb', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
    });

    afterAll(async () => {
        await mongoose.connection.close();
    });

    it('should create and save a user successfully', async () => {
        const userData = {
            username: 'testuser',
            password: 'testpassword',
            email: 'testuser@example.com',
        };

        const user = new User(userData);
        const savedUser = await user.save();

        expect(savedUser._id).toBeDefined();
        expect(savedUser.username).toBe(userData.username);
        expect(savedUser.email).toBe(userData.email);
    });

    it('should retrieve a user by email', async () => {
        const user = await User.findOne({ email: 'testuser@example.com' });
        expect(user).toBeDefined();
        expect(user.username).toBe('testuser');
    });

    it('should not save a user without an email', async () => {
        const userData = {
            username: 'invaliduser',
            password: 'testpassword',
        };

        const user = new User(userData);
        let error;
        try {
            await user.save();
        } catch (err) {
            error = err;
        }

        expect(error).toBeDefined();
        expect(error.errors.email).toBeDefined();
    });
});