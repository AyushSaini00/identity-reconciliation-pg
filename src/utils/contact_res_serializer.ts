interface ContactProps {
  primaryContatctId: number;
  emails: Array<string | null>;
  phoneNumbers: Array<string | null>;
  secondaryContactIds: Array<number | null>;
}

const contact_res_serializer = (contactProps: ContactProps) => {
  const { primaryContatctId, emails, phoneNumbers, secondaryContactIds } =
    contactProps;

  return {
    contact: {
      primaryContatctId,
      emails: non_null_unique_values(emails),
      phoneNumbers: non_null_unique_values(phoneNumbers),
      secondaryContactIds: non_null_unique_values(secondaryContactIds),
    },
  };
};

export default contact_res_serializer;

const non_null_unique_values = (array: Array<any> = []) => {
  return array.filter((el, ind, arr) => el !== null && arr.indexOf(el) === ind);
};
