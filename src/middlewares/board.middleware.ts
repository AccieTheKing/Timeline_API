import { Request, Response, NextFunction } from 'express';

// create board
export async function createBoardMiddleware(
	req: Request,
	res: Response,
	next: NextFunction
) {}

// update board
export async function updateBoardMiddleware(
	req: Request,
	res: Response,
	next: NextFunction
) {}

// delete board
export async function deleteBoardMiddleware(
	req: Request,
	res: Response,
	next: NextFunction
) {}

// fetch all boards
export async function fetchBoardMiddleware(
	req: Request,
	res: Response,
	next: NextFunction
) {}
