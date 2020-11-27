import config from '@server/config';
import Contact from '@server/api/v1/contact/index.model';
import schema from '@server/api/v1/contact/index.schema';
import data from './data';

const { EXAMPLE_DATA } = config;

const seedContact = async () => {
  try {
    await Contact.deleteMany();

    if (EXAMPLE_DATA) {
      const { error, value } = schema.validate(data);

      if (error) {
        throw new Error(error);
      }

      await Contact.create(value);
    } else {
      await Contact.create({
        email: '',
        show_email: false,
      });
    }
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(error);
  }
};

export default seedContact;
