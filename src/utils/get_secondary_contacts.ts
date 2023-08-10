import find_contacts from "./db/find_contacts";

const get_secondary_contacts = async (linkedId: number): Promise<any> => {
  const { data: secondaryContactsData, error: secondaryContactsError } =
    await find_contacts({
      linkedId,
    });

  if (secondaryContactsError) {
    return { error: secondaryContactsError };
  }

  if (!secondaryContactsData) {
    return {
      data: [],
    };
  }

  if (secondaryContactsData) {
    return {
      data: secondaryContactsData,
    };
  }
};

export default get_secondary_contacts;
