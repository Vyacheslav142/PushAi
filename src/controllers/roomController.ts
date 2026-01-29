import { Request, Response } from 'express';
import { asyncHandler } from '../utils/asyncHandler';
import { successResponse } from '../utils/responses';
import { AppError } from '../middleware/errorHandler';
import prisma from '../database/prisma';
import logger from '../config/logger';

export const getRoomItems = asyncHandler(async (_req: Request, res: Response) => {
  const items = await prisma.roomItem.findMany({
    orderBy: { priceInPoints: 'asc' },
  });

  successResponse(res, { items }, 'Room items retrieved successfully');
});

export const buyItem = asyncHandler(async (req: Request, res: Response) => {
  const { telegramId, itemId } = req.body;

  if (!telegramId || !itemId) {
    throw new AppError('Telegram ID and item ID are required', 400);
  }

  const user = await prisma.user.findUnique({
    where: { telegramId: String(telegramId) },
    include: { userPoints: true },
  });

  if (!user) {
    throw new AppError('User not found', 404);
  }

  const item = await prisma.roomItem.findUnique({
    where: { id: parseInt(itemId) },
  });

  if (!item) {
    throw new AppError('Item not found', 404);
  }

  if (!user.userPoints || user.userPoints.totalPoints < item.priceInPoints) {
    throw new AppError('Insufficient points', 400);
  }

  const existingInventoryItem = await prisma.userRoomInventory.findFirst({
    where: {
      userId: user.id,
      itemId: item.id,
    },
  });

  if (existingInventoryItem) {
    await prisma.userRoomInventory.update({
      where: { id: existingInventoryItem.id },
      data: {
        quantity: {
          increment: 1,
        },
      },
    });
  } else {
    await prisma.userRoomInventory.create({
      data: {
        userId: user.id,
        itemId: item.id,
        quantity: 1,
      },
    });
  }

  await prisma.userPoints.update({
    where: { userId: user.id },
    data: {
      totalPoints: {
        decrement: item.priceInPoints,
      },
    },
  });

  logger.info(`User ${telegramId} purchased item ${item.name}`);

  successResponse(res, { item }, 'Item purchased successfully', 201);
});

export const getUserInventory = asyncHandler(async (req: Request, res: Response) => {
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

  const inventory = await prisma.userRoomInventory.findMany({
    where: { userId: user.id },
    include: {
      item: true,
    },
  });

  successResponse(res, { inventory }, 'User inventory retrieved successfully');
});
