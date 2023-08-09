import { Response } from "express";

const success_res = (
  response: Response,
  data = {},
  message = "",
  status_code = 200
) => {
  return response.status(status_code).json({
    status: "success",
    message,
    data,
  });
};

export default success_res;
