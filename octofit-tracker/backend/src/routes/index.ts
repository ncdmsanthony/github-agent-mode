import express from 'express';
import { Activity, LeaderboardEntry, Team, User, Workout } from '../models';

const router = express.Router();

router.get(['/users', '/users/'], async (_req, res) => {
  const users = await User.find({}).lean();
  res.json(users);
});

router.get(['/teams', '/teams/'], async (_req, res) => {
  const teams = await Team.find({}).lean();
  res.json(teams);
});

router.get(['/activities', '/activities/'], async (_req, res) => {
  const activities = await Activity.find({}).populate('userId').lean();
  res.json(activities);
});

router.get(['/leaderboard', '/leaderboard/'], async (_req, res) => {
  const leaderboard = await LeaderboardEntry.find({}).populate('userId').lean();
  res.json(leaderboard);
});

router.get(['/workouts', '/workouts/'], async (_req, res) => {
  const workouts = await Workout.find({}).lean();
  res.json(workouts);
});

export default router;
