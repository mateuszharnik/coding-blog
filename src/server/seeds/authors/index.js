import config from '@server/config';
import Author from '@server/api/v1/authors/index.model';
import schema from '@server/api/v1/authors/index.schema';
import data from './data';

const { EXAMPLE_DATA } = config;

const seedAuthors = async () => {
  try {
    await Author.deleteMany();

    if (EXAMPLE_DATA) {
      const authors = data.map((author) => {
        const { error, value } = schema.validate(author);

        if (error) {
          throw new Error(error);
        }

        return value;
      });

      await Author.insertMany(authors);
    }
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(error);
  }
};

export default seedAuthors;
