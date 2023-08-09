import { Router, NextFunction, Request, Response } from "express";
import error_res from "../utils/error_res";
import success_res from "../utils/success_res";

const router = Router();

router.post("/", async (req: Request, res: Response, next: NextFunction) => {
  try {
    return success_res(res, {}, "hello world");
  } catch (err) {
    return error_res(res, 500, "failed", err);
  }
});

export default router;
