import { Router, NextFunction, Request, Response } from "express";
import error_res from "../utils/error_res";
import success_res from "../utils/success_res";
import create_contact from "../utils/db/create_contact";
import find_contacts from "../utils/db/find_contacts";
import contact_res_serializer from "../utils/contact_res_serializer";
import find_or_create_primary_and_return_all_contacts from "../utils/find_or_create_primary_and_return_all_contacts";

interface RequestBody {
  email: string | null;
  phoneNumber: string | null;
}

interface PrimaryContactInterface {
  phoneNumber: string | null;
  email: string | null;
  linkedId?: number | null;
  linkPrecedence?: "primary" | "secondary";
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date | null;
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
        return success_res(res, data);
      }

      // const { data: findContactsData, error: findContactsError } =
      //   await find_contacts({ email, phoneNumber });

      // if (findContactsError) {
      //   return error_res(res, findContactsError.code, findContactsError.detail);
      // }

      // // contact doesn't exist -> create new primary contact
      // if (!findContactsData) {
      //   const { data: createContactData, error: createContactError } =
      //     await create_contact({
      //       email,
      //       phoneNumber,
      //     });

      //   if (createContactError) {
      //     return error_res(
      //       res,
      //       createContactError.code,
      //       createContactError.detail
      //     );
      //   }

      //   if (createContactData) {
      //     return success_res(
      //       res,
      //       contact_res_serializer({
      //         primaryContatctId: createContactData.id,
      //         emails: [createContactData.email],
      //         phoneNumbers: [createContactData.phoneNumber],
      //         secondaryContactIds: [],
      //       })
      //     );
      //   }
      // }

      // if (findContactsData) {
      //   // found multiple contacts
      //   if (findContactsData.length > 1) {
      //     /*
      //     - findContactsData is sorted via oldest to newest createdAt date
      //     - so first item is primary
      //     - rest all are secondary
      //     */
      //     const primaryContact = findContactsData[0];

      //     const { data, error } = await create_contact({
      //       email,
      //       phoneNumber,
      //       linkedId: primaryContact.id,
      //       linkPrecedence: "secondary",
      //     });

      //     if (error) {
      //       return error_res(res, error.code, error.detail);
      //     }

      //     if (data) {
      //       return success_res(
      //         res,
      //         contact_res_serializer({
      //           primaryContatctId: primaryContact.id,
      //           emails: [...findContactsData.map((d) => d.email), data.email],
      //           phoneNumbers: [
      //             ...findContactsData.map((d) => d.phoneNumber),
      //             data.phoneNumber,
      //           ],
      //           secondaryContactIds: [
      //             ...findContactsData.slice(1).map((d) => d.id),
      //             data.id,
      //           ],
      //         })
      //       );
      //     }
      //     return success_res(res, findContactsData);
      //   }
      //   // found 1 contact
      //   else {
      //     let primaryContact: any;
      //     if (findContactsData[0].linkPrecedence === "primary") {
      //       primaryContact = findContactsData[0];

      //       // check for existing linked items for this contact
      //       const { data, error } = await find_contacts({
      //         linkedId: primaryContact.id,
      //       });

      //       if (error) {
      //         return error_res(res, error.code, error.detail);
      //       }

      //       if (data) {
      //         // create a new secondary contact with linkedId as the primary key of primary contact and linkPrecedence as `secondary`
      //         const {
      //           data: createContactSecondaryData,
      //           error: createContactSecondaryError,
      //         } = await create_contact({
      //           email,
      //           phoneNumber,
      //           linkedId: primaryContact.id,
      //           linkPrecedence: "secondary",
      //         });

      //         if (createContactSecondaryError) {
      //           return error_res(
      //             res,
      //             createContactSecondaryError.code,
      //             createContactSecondaryError.detail
      //           );
      //         }

      //         if (createContactSecondaryData) {
      //           return success_res(
      //             res,
      //             contact_res_serializer({
      //               primaryContatctId: primaryContact.id,
      //               emails: [
      //                 primaryContact.email,
      //                 ...data.map((d) => d.email),
      //                 createContactSecondaryData.email,
      //               ],
      //               phoneNumbers: [
      //                 primaryContact.phoneNumber,
      //                 ...data.map((d) => d.phoneNumber),
      //                 createContactSecondaryData.phoneNumber,
      //               ],
      //               secondaryContactIds: [
      //                 ...data.map((d) => d.id),
      //                 createContactSecondaryData.id,
      //               ],
      //             })
      //           );
      //         }
      //       }
      //     } else {
      //       // if it's a secondary contact, then get the primary contact using the linkedId
      //       const { data, error } = await find_contacts({
      //         id: findContactsData[0].linkedId,
      //       });

      //       if (error) {
      //         return error_res(res, error.code, error.detail);
      //       }

      //       if (data) {
      //         primaryContact = data[0];
      //       }
      //     }
      //   }
      // }
    } catch (err) {
      return error_res(res, 500, "failed", err);
    }
  }
);

export default router;
