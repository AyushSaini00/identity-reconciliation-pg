import prisma from "../../db";

interface FindContactProps {
  id?: number | null;
  email?: string | null;
  phoneNumber?: string | null;
  linkedId?: number | null;
  whereProps?: {};
}

const find_contacts = async (findContactProps: FindContactProps) => {
  try {
    const { id, email, phoneNumber, linkedId, whereProps } = findContactProps;

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
          {
            linkedId: linkedId || undefined,
          },
        ],
        ...whereProps,
      },
      orderBy: {
        createdAt: "asc", // oldest to newest
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
