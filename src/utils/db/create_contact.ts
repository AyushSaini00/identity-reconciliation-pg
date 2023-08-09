import prisma from "../../db";

interface ContactProps {
  phoneNumber: string | null;
  email: string | null;
  linkedId?: number | null; // this property (or others in this interface is set optional because default values for these (i.e, null) will be picked by prisma model)
  linkPrecedence?: "primary" | "secondary";
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date | null;
}

const create_contact = async (contactProps: ContactProps) => {
  try {
    const newContact = await prisma.contact.create({
      data: contactProps,
    });

    return {
      data: newContact,
    };
  } catch (err) {
    console.log(`create_contact error : `, err);
    return {
      error: {
        code: 400,
        detail: "failed to create new contact",
      },
    };
  } finally {
    await prisma.$disconnect();
  }
};

export default create_contact;
