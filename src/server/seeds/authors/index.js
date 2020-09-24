import config from '@server/config';
import Author from '@server/api/v1/authors/index.model';
import schema from '@server/api/v1/authors/index.schema';
import data from './data';

const { EXAMPLE_DATA } = config;

const seedAuthors = async () => {
  try {
    await Author.deleteMany();

    const authorsArr = data.map((author) => {
      const { error, value } = schema.validate(author);

      if (error) {
        throw new Error(error);
      }

      return value;
    });

    if (EXAMPLE_DATA) {
      await Author.insertMany(authorsArr);
    }
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(error);
  }
};

export default seedAuthors;