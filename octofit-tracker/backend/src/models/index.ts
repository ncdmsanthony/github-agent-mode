import mongoose, { Schema, Model } from 'mongoose';

export interface IUser {
  name: string;
  email: string;
  role: string;
  fitnessLevel: string;
}

export interface ITeam {
  name: string;
  sport: string;
  members: number;
  captain: string;
}

export interface IActivity {
  userId: mongoose.Types.ObjectId;
  type: string;
  durationMinutes: number;
  date: Date;
  notes?: string;
}

export interface ILeaderboardEntry {
  userId: mongoose.Types.ObjectId;
  score: number;
  streak: number;
}

export interface IWorkout {
  name: string;
  focus: string;
  durationMinutes: number;
  difficulty: string;
}

const userSchema = new Schema<IUser>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  role: { type: String, required: true },
  fitnessLevel: { type: String, required: true },
});

const teamSchema = new Schema<ITeam>({
  name: { type: String, required: true, unique: true },
  sport: { type: String, required: true },
  members: { type: Number, required: true },
  captain: { type: String, required: true },
});

const activitySchema = new Schema<IActivity>({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  type: { type: String, required: true },
  durationMinutes: { type: Number, required: true },
  date: { type: Date, required: true },
  notes: { type: String },
});

const leaderboardSchema = new Schema<ILeaderboardEntry>({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  score: { type: Number, required: true },
  streak: { type: Number, required: true },
});

const workoutSchema = new Schema<IWorkout>({
  name: { type: String, required: true, unique: true },
  focus: { type: String, required: true },
  durationMinutes: { type: Number, required: true },
  difficulty: { type: String, required: true },
});

export const User = mongoose.model<IUser>('User', userSchema);
export const Team = mongoose.model<ITeam>('Team', teamSchema);
export const Activity = mongoose.model<IActivity>('Activity', activitySchema);
export const LeaderboardEntry = mongoose.model<ILeaderboardEntry>('LeaderboardEntry', leaderboardSchema);
export const Workout = mongoose.model<IWorkout>('Workout', workoutSchema);
