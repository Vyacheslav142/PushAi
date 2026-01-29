import { Request, Response } from 'express';
import { asyncHandler } from '../utils/asyncHandler';
import { successResponse } from '../utils/responses';
import { AppError } from '../middleware/errorHandler';
import prisma from '../database/prisma';
import logger from '../config/logger';

export const recordWorkout = asyncHandler(async (req: Request, res: Response) => {
  const { telegramId, pushupsCount, duration } = req.body;

  if (!telegramId || !pushupsCount || !duration) {
    throw new AppError('Telegram ID, pushups count, and duration are required', 400);
  }

  const user = await prisma.user.findUnique({
    where: { telegramId: String(telegramId) },
  });

  if (!user) {
    throw new AppError('User not found', 404);
  }

  const pointsEarned = Math.floor(pushupsCount / 10);

  const workout = await prisma.workout.create({
    data: {
      userId: user.id,
      pushupsCount,
      duration,
    },
  });

  await prisma.userPoints.update({
    where: { userId: user.id },
    data: {
      totalPoints: {
        increment: pointsEarned,
      },
    },
  });

  logger.info(`Workout recorded for user ${telegramId}: ${pushupsCount} pushups`);

  successResponse(res, { workout, pointsEarned }, 'Workout recorded successfully', 201);
});

export const getWorkoutHistory = asyncHandler(async (req: Request, res: Response) => {
  const { telegramId } = req.params;

  if (!telegramId) {
    throw new AppError('Telegram ID is required', 400);
  }

  const user = await prisma.user.findUnique({
    where: { telegramId: String(telegramId) },
  });

  if (!user) {
    throw new AppError('User not found', 404);
  }

  const workouts = await prisma.workout.findMany({
    where: { userId: user.id },
    orderBy: { completedAt: 'desc' },
  });

  successResponse(res, { workouts }, 'Workout history retrieved successfully');
});
