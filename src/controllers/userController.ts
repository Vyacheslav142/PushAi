import { Request, Response } from 'express';
import { asyncHandler } from '../utils/asyncHandler';
import { successResponse } from '../utils/responses';
import { AppError } from '../middleware/errorHandler';
import prisma from '../database/prisma';

export const getProfile = asyncHandler(async (req: Request, res: Response) => {
  const { telegramId } = req.params;

  if (!telegramId) {
    throw new AppError('Telegram ID is required', 400);
  }

  const user = await prisma.user.findUnique({
    where: { telegramId: String(telegramId) },
    include: {
      userPoints: true,
      workouts: {
        orderBy: { completedAt: 'desc' },
        take: 10,
      },
      userRoomInventory: {
        include: {
          item: true,
        },
      },
    },
  });

  if (!user) {
    throw new AppError('User not found', 404);
  }

  successResponse(res, { user }, 'Profile retrieved successfully');
});

export const getPoints = asyncHandler(async (req: Request, res: Response) => {
  const { telegramId } = req.params;

  if (!telegramId) {
    throw new AppError('Telegram ID is required', 400);
  }

  const userPoints = await prisma.userPoints.findFirst({
    where: {
      user: {
        telegramId: String(telegramId),
      },
    },
  });

  if (!userPoints) {
    throw new AppError('User points not found', 404);
  }

  successResponse(res, { points: userPoints.totalPoints }, 'Points retrieved successfully');
});
