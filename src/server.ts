import express, { Application, NextFunction, Request, Response } from "express";
import morgan from "morgan";
import helmet from "helmet";
import cors from "cors";
import error_res from "./utils/error_res";
import healthRouter from "../src/routes/health";
import identityRouter from "../src/routes/identity";

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

app.use("/health", healthRouter);
app.use("/identify", identityRouter);

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
