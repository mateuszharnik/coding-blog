import config from '@server/config';
import About from '@server/api/v1/about/index.model';
import schema from '@server/api/v1/about/index.schema';
import data from './data';

const { EXAMPLE_DATA } = config;

const seedAbout = async () => {
  try {
    await About.deleteMany();

    const { error, value } = schema.validate(data);

    if (error) {
      throw new Error(error);
    }

    if (EXAMPLE_DATA) {
      await About.create(value);
    } else {
      await About.create({
        description: '',
      });
    }
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(error);
  }
};

export default seedAbout;
