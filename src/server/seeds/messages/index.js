import config from '@server/config';
import Message from '@server/api/v1/messages/index.model';
import schema from '@server/api/v1/messages/index.schema';
import data from './data';

const { EXAMPLE_DATA } = config;

const seedMessages = async () => {
  try {
    await Message.deleteMany();

    if (EXAMPLE_DATA) {
      const messagesArr = data.map((message) => {
        const { error, value } = schema.validate(message);

        if (error) {
          throw new Error(error);
        }

        return value;
      });

      await Message.insertMany(messagesArr);
    }
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(error);
  }
};

export default seedMessages;
