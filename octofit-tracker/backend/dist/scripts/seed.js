"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const models_1 = require("../models");
const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';
/**
 * Seed the octofit_db database with test data
 */
async function seedDatabase() {
    try {
        await mongoose_1.default.connect(connectionString);
        console.log('Connected to octofit_db');
        await Promise.all([
            models_1.User.deleteMany({}),
            models_1.Team.deleteMany({}),
            models_1.Activity.deleteMany({}),
            models_1.LeaderboardEntry.deleteMany({}),
            models_1.Workout.deleteMany({}),
        ]);
        const users = await models_1.User.create([
            {
                name: 'Ada Chen',
                email: 'ada@example.com',
                role: 'Coach',
                fitnessLevel: 'Intermediate',
            },
            {
                name: 'Lina Ortiz',
                email: 'lina@example.com',
                role: 'Athlete',
                fitnessLevel: 'Advanced',
            },
            {
                name: 'Noah Brooks',
                email: 'noah@example.com',
                role: 'Athlete',
                fitnessLevel: 'Beginner',
            },
        ]);
        await models_1.Team.create([
            {
                name: 'North Stars',
                sport: 'Running',
                members: 8,
                captain: users[0].name,
            },
            {
                name: 'River Runners',
                sport: 'Cycling',
                members: 5,
                captain: users[1].name,
            },
        ]);
        await models_1.Activity.create([
            {
                userId: users[0]._id,
                type: 'Run',
                durationMinutes: 35,
                date: new Date('2026-07-01'),
                notes: 'Morning tempo run',
            },
            {
                userId: users[1]._id,
                type: 'Strength',
                durationMinutes: 45,
                date: new Date('2026-07-02'),
                notes: 'Upper body circuit',
            },
            {
                userId: users[2]._id,
                type: 'Yoga',
                durationMinutes: 25,
                date: new Date('2026-07-03'),
                notes: 'Recovery flow',
            },
        ]);
        await models_1.LeaderboardEntry.create([
            { userId: users[0]._id, score: 128, streak: 5 },
            { userId: users[1]._id, score: 114, streak: 3 },
            { userId: users[2]._id, score: 92, streak: 2 },
        ]);
        await models_1.Workout.create([
            {
                name: 'Tempo Run',
                focus: 'Cardio',
                durationMinutes: 40,
                difficulty: 'Intermediate',
            },
            {
                name: 'Core Circuit',
                focus: 'Strength',
                durationMinutes: 30,
                difficulty: 'Beginner',
            },
            {
                name: 'Recovery Flow',
                focus: 'Mobility',
                durationMinutes: 20,
                difficulty: 'Easy',
            },
        ]);
        console.log('Database seeding complete');
        await mongoose_1.default.disconnect();
    }
    catch (error) {
        console.error('Error seeding database:', error);
        process.exit(1);
    }
}
seedDatabase();
