import config from '@server/config';
import FAQ from '@server/api/v1/faqs/index.model';
import schema from '@server/api/v1/faqs/index.schema';
import data from './data';

const { EXAMPLE_DATA } = config;

const seedFAQs = async () => {
  try {
    await FAQ.deleteMany();

    if (EXAMPLE_DATA) {
      const faqs = data.map((faq) => {
        const { error, value } = schema.validate(faq);

        if (error) {
          throw new Error(error);
        }

        return value;
      });

      await FAQ.insertMany(faqs);
    }
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(error);
  }
};

export default seedFAQs;
