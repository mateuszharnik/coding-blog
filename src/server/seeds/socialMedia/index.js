import config from '@server/config';
import SocialMedia from '@server/api/v1/socialMedia/index.model';
import schema from '@server/api/v1/socialMedia/index.schema';
import data from './data';

const { EXAMPLE_DATA } = config;

const seedSocialMedia = async () => {
  try {
    await SocialMedia.deleteMany();

    if (EXAMPLE_DATA) {
      const { error, value } = schema.validate(data);

      if (error) {
        throw new Error(error);
      }

      await SocialMedia.create(value);
    } else {
      await SocialMedia.create({
        facebook: '',
        twitter: '',
        instagram: '',
      });
    }
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(error);
  }
};

export default seedSocialMedia;
