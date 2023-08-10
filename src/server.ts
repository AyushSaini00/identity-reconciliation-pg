import express, { Application, NextFunction, Request, Response } from "express";
import morgan from "morgan";
import helmet from "helmet";
import cors from "cors";
import error_res from "./utils/error_res";
import identityRouter from "../src/routes/identity";
import find_or_create_primary_and_return_all_contacts from "./utils/find_or_create_primary_and_return_all_contacts";
import success_res from "./utils/success_res";

interface Error {
  status?: number;
  message?: string;
}

const app: Application = express();

app.use(cors());
app.disable("x-powered-by");
app.use(helmet());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/identify", identityRouter);
app.use("/test", async (req, res, next) => {
  const { email, phoneNumber } = req.body;

  const { data, error } = await find_or_create_primary_and_return_all_contacts({
    email,
    phoneNumber,
  });

  if (error) {
    return error_res(res, error.code, error.detail);
  }

  // if (data) {
  return success_res(res, data);
  // }
});

app.use((req: Request, res: Response, next: NextFunction) => {
  const error: Error = new Error("Not found");
  error.status = 404;
  next(error);
});

app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
  const errCode = error.status || 500;
  const errMsg = error.message || "Internal Server Error";

  return error_res(res, errCode, errMsg);
});

export default app;
