import prisma from "../../db";

interface ContactProps {
  phoneNumber?: string | null;
  email?: string | null;
  linkedId?: number | null; // this property (or others in this interface is set optional because default values for these (i.e, null) will be picked by prisma model)
  linkPrecedence?: "primary" | "secondary";
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date | null;
}

const update_contact = async (id: number, contactProps: ContactProps) => {
  try {
    const updatedContact = await prisma.contact.update({
      where: {
        id,
      },
      data: contactProps,
    });

    return {
      data: updatedContact,
    };
  } catch (err) {
    console.log(`update_contact error : `, err);
    return {
      error: {
        code: 400,
        detail: "failed to update new contact",
      },
    };
  } finally {
    await prisma.$disconnect();
  }
};

export default update_contact;
