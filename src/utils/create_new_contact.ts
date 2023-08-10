import create_contact from "./db/create_contact";

const create_new_contact = async ({
  email,
  phoneNumber,
}: {
  email: string | null;
  phoneNumber: string | null;
}) => {
  const { data: createContactData, error: createContactError } =
    await create_contact({
      email,
      phoneNumber,
    });

  if (createContactError) {
    return { error: createContactError };
  }

  if (createContactData) {
    return { data: [createContactData] };
  }
};

export default create_new_contact;
