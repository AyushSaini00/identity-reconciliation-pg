import { Response } from "express";
const error_res = (
  response: Response,
  status_code = 400,
  message = "",
  data: any = {}
) => {
  return response.status(status_code).json({
    status: "error",
    message,
    data,
  });
};

export default error_res;
