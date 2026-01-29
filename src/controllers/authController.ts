import { Request, Response } from 'express';
import { asyncHandler } from '../utils/asyncHandler';
import { successResponse } from '../utils/responses';
import { AppError } from '../middleware/errorHandler';
import prisma from '../database/prisma';
import logger from '../config/logger';

export const login = asyncHandler(async (req: Request, res: Response) => {
  const { telegramId, username } = req.body;

  if (!telegramId) {
    throw new AppError('Telegram ID is required', 400);
  }

  let user = await prisma.user.findUnique({
    where: { telegramId: String(telegramId) },
  });

  if (!user) {
    user = await prisma.user.create({
      data: {
        telegramId: String(telegramId),
        username,
        userPoints: {
          create: {
            totalPoints: 0,
          },
        },
      },
      include: {
        userPoints: true,
      },
    });

    logger.info(`New user created: ${telegramId}`);
  }

  successResponse(res, { user }, 'Login successful', 200);
});
