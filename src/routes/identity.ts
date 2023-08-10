import { Router, NextFunction, Request, Response } from "express";
import error_res from "../utils/error_res";
import success_res from "../utils/success_res";
import contact_res_serializer from "../utils/contact_res_serializer";
import find_or_create_primary_and_return_all_contacts from "../utils/find_or_create_primary_and_return_all_contacts";

interface RequestBody {
  email: string | null;
  phoneNumber: string | null;
}

const router = Router();

router.post(
  "/",
  async (
    req: Request<{}, {}, RequestBody>,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const payload: RequestBody = req.body;
      const { email, phoneNumber } = payload;

      // every order will either have an email or phoneNumber associated with it.
      if (!email && !phoneNumber) {
        return error_res(
          res,
          404,
          "atleast one out of email or phoneNumber is required"
        );
      }

      const { data, error } =
        await find_or_create_primary_and_return_all_contacts({
          email,
          phoneNumber,
        });

      if (error) {
        return error_res(res, error.code, error.detail);
      }

      if (data) {
        const [primary, ...secondaries] = data;

        return success_res(
          res,
          contact_res_serializer({
            primaryContatctId: primary.id,
            emails: data.map((d: { email: "string" | null }) => d.email),
            phoneNumbers: data.map(
              (d: { phoneNumber: "string" | null }) => d.phoneNumber
            ),
            secondaryContactIds: secondaries.map(
              (d: { id: "number" | null }) => d.id
            ),
          })
        );
      }
    } catch (err) {
      return error_res(res, 500, "failed", err);
    }
  }
);

export default router;
