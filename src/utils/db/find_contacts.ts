import prisma from "../../db";

interface FindContactProps {
  id?: number | null;
  email?: string | null;
  phoneNumber?: string | null;
}

const find_contacts = async (findContactProps: FindContactProps) => {
  try {
    const { id, email, phoneNumber } = findContactProps;

    const contacts = await prisma.contact.findMany({
      where: {
        OR: [
          {
            id: id || undefined,
          },
          {
            email: email || undefined,
          },
          {
            phoneNumber: phoneNumber || undefined,
          },
        ],
      },
    });

    // no such contact exists
    if (!contacts.length) {
      return {
        data: null,
      };
    }

    return {
      data: contacts,
    };
  } catch (err) {
    console.log(`find_contact error : `, err);
    return {
      error: {
        code: 400,
        detail: "failed to find contact",
      },
    };
  } finally {
    await prisma.$disconnect();
  }
};

export default find_contacts;
