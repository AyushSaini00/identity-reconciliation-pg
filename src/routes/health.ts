import { NextFunction, Request, Response, Router } from "express";
// import prisma from "../db";
import error_res from "../utils/error_res";
import success_res from "../utils/success_res";
const router = Router();

router.get("/", async (req: Request, res: Response, next: NextFunction) => {
  try {
    // await prisma.$connect();
    // await prisma.$disconnect();

    return success_res(res, {
      status: "ok",
    });
  } catch (err) {
    return error_res(res, 500, "health check error", err);
  }
});

export default router;
