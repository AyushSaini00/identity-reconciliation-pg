import { Router, NextFunction, Request, Response } from "express";
import error_res from "../utils/error_res";
import success_res from "../utils/success_res";
import create_contact from "../utils/db/create_contact";
import find_contacts from "../utils/db/find_contacts";
import contact_res_serializer from "../utils/contact_res_serializer";

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

      // finds contacts using either email or phoneNumber
      const { data: findContactsData, error: findContactsError } =
        await find_contacts({ email, phoneNumber });

      if (findContactsError) {
        return error_res(res, findContactsError.code, findContactsError.detail);
      }

      // contact doesn't exist -> create new primary contact
      if (!findContactsData) {
        const { data: createContactData, error: createContactError } =
          await create_contact({
            email,
            phoneNumber,
          });

        if (createContactError) {
          return error_res(
            res,
            createContactError.code,
            createContactError.detail
          );
        }

        if (createContactData) {
          return success_res(
            res,
            contact_res_serializer({
              primaryContatctId: createContactData.id,
              emails: [createContactData.email],
              phoneNumbers: [createContactData.phoneNumber],
              secondaryContactIds: [],
            })
          );
        }
      }
    } catch (err) {
      return error_res(res, 500, "failed", err);
    }
  }
);

export default router;
