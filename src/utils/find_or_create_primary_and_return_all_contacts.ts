/*
- this function finds primary contact using either id, email or phoneNumber
- it also finds all of the existing secondary contacts linked to primary account
- returns all contacts with primary being the first element
*/

import create_new_contact from "./create_new_contact";
import create_contact from "./db/create_contact";
import find_contacts from "./db/find_contacts";
import update_contact from "./db/update_contact";
import get_secondary_contacts from "./get_secondary_contacts";

const find_or_create_primary_and_return_all_contacts = async ({
  id,
  email,
  phoneNumber,
}: {
  id?: number | null;
  email: string | null;
  phoneNumber: string | null;
}): Promise<any> => {
  try {
    // find all contacts related to given param - id, email or phoneNumber

    const { data: allRelatedContacts, error: allRelatedContactsError } =
      await find_contacts({
        id,
        email,
        phoneNumber,
      });

    if (allRelatedContactsError) {
      return { error: allRelatedContactsError };
    }

    // related contacts doesn't exist -> create new primary contact
    if (!allRelatedContacts) {
      return await create_new_contact({ email, phoneNumber });
    }

    if (allRelatedContacts) {
      const primaryContacts = allRelatedContacts.filter(
        (el) => el.linkPrecedence === "primary"
      );

      if (!primaryContacts.length) {
        // all these are secondary contacts -> primary contact isn't present
        // get primary contact using linkedId of one of the relatedContacts
        const idOfPrimary = allRelatedContacts[0].linkedId;

        const { data: primaryContactData, error: primaryContactError } =
          await find_contacts({
            id: idOfPrimary,
          });

        if (primaryContactError) {
          return { error: primaryContactError };
        }

        if (!primaryContactData) {
          return {
            code: 400,
            detail: "primary contact not found",
          };
        }

        if (primaryContactData) {
          const primaryContact = primaryContactData[0];

          // create a secondary contact
          const {
            data: newSecondaryContactData,
            error: newSecondaryContactError,
          } = await create_contact({
            email,
            phoneNumber,
            linkedId: primaryContact.id,
            linkPrecedence: "secondary",
          });

          if (newSecondaryContactError) {
            return { error: newSecondaryContactError };
          }

          if (newSecondaryContactData) {
            const { data, error } = await get_secondary_contacts(
              primaryContact.id
            );

            if (error) {
              return error;
            }

            if (data) {
              return { data: [primaryContact, ...data] };
            }
          }
        }
      }

      // multiple primaries are there, the next create will made the newest primary as secondary
      if (primaryContacts.length > 1) {
        // update the latest primary to secondary
        const primaryContact = primaryContacts[0];
        const [latestPrimary] = primaryContacts.slice(-1);

        const { data: updatedLatestPrimary, error: updatedLatestPrimaryError } =
          await update_contact(latestPrimary.id, {
            linkedId: primaryContact.id,
            linkPrecedence: "secondary",
          });

        if (updatedLatestPrimaryError) {
          return { error: updatedLatestPrimaryError };
        }

        if (updatedLatestPrimary) {
          // create a secondary contact
          const {
            data: newSecondaryContactData,
            error: newSecondaryContactError,
          } = await create_contact({
            email,
            phoneNumber,
            linkedId: primaryContact.id,
            linkPrecedence: "secondary",
          });

          if (newSecondaryContactError) {
            return { error: newSecondaryContactError };
          }

          if (newSecondaryContactData) {
            // fetch all secondaries using id of primary as linkedId for secondaries
            const { data, error } = await get_secondary_contacts(
              primaryContact.id
            );

            if (error) {
              return error;
            }

            if (data) {
              return { data: [primaryContact, ...data] };
            }
          }
        }
      }

      const primaryContact = primaryContacts[0];
      // if fetched contacts contains primary
      if (primaryContact) {
        // create a secondary contact
        const {
          data: newSecondaryContactData,
          error: newSecondaryContactError,
        } = await create_contact({
          email,
          phoneNumber,
          linkedId: primaryContact.id,
          linkPrecedence: "secondary",
        });

        if (newSecondaryContactError) {
          return { error: newSecondaryContactError };
        }

        if (newSecondaryContactData) {
          // fetch all secondaries using id of primary as linkedId for secondaries
          const { data, error } = await get_secondary_contacts(
            primaryContact.id
          );

          if (error) {
            return error;
          }

          if (data) {
            return { data: [primaryContact, ...data] };
          }
        }
      }
    }
  } catch (err) {
    console.log(`find_primary_and_return_all_contacts error : ${err}`);
    return {
      error: {
        code: 400,
        detail: "failed to find primary and secondaries",
        err,
      },
    };
  }
};

export default find_or_create_primary_and_return_all_contacts;
