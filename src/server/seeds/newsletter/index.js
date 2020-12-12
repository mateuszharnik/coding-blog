import config from '@server/config';
import Newsletter from '@server/api/v1/newsletter/index.model';
import schema from '@server/api/v1/newsletter/index.schema';
import data from './data';

const { EXAMPLE_DATA } = config;

const seedNewsletter = async () => {
  try {
    await Newsletter.deleteMany();

    if (EXAMPLE_DATA) {
      const emails = data.map((email) => {
        const { error, value } = schema.validate(email);

        if (error) {
          throw new Error(error);
        }

        return value;
      });

      await Newsletter.insertMany(emails);
    }
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(error);
  }
};

export default seedNewsletter;
