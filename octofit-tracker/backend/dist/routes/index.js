"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const models_1 = require("../models");
const router = express_1.default.Router();
router.get(['/users', '/users/'], async (_req, res) => {
    const users = await models_1.User.find({}).lean();
    res.json(users);
});
router.get(['/teams', '/teams/'], async (_req, res) => {
    const teams = await models_1.Team.find({}).lean();
    res.json(teams);
});
router.get(['/activities', '/activities/'], async (_req, res) => {
    const activities = await models_1.Activity.find({}).populate('userId').lean();
    res.json(activities);
});
router.get(['/leaderboard', '/leaderboard/'], async (_req, res) => {
    const leaderboard = await models_1.LeaderboardEntry.find({}).populate('userId').lean();
    res.json(leaderboard);
});
router.get(['/workouts', '/workouts/'], async (_req, res) => {
    const workouts = await models_1.Workout.find({}).lean();
    res.json(workouts);
});
exports.default = router;
