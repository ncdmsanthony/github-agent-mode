import mongoose from 'mongoose';
import { Activity, LeaderboardEntry, Team, User, Workout } from '../models';

const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';

/**
 * Seed the octofit_db database with test data
 */
async function seedDatabase() {
  try {
    await mongoose.connect(connectionString);

    console.log('Connected to octofit_db');

    await Promise.all([
      User.deleteMany({}),
      Team.deleteMany({}),
      Activity.deleteMany({}),
      LeaderboardEntry.deleteMany({}),
      Workout.deleteMany({}),
    ]);

    const users = await User.create([
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

    await Team.create([
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

    await Activity.create([
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

    await LeaderboardEntry.create([
      { userId: users[0]._id, score: 128, streak: 5 },
      { userId: users[1]._id, score: 114, streak: 3 },
      { userId: users[2]._id, score: 92, streak: 2 },
    ]);

    await Workout.create([
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
    await mongoose.disconnect();
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();
