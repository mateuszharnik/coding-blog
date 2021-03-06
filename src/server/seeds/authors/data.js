import { genders } from '@server/helpers/constants';

const { FEMALE, MALE } = genders;

const description = 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Iure voluptatum, magnam sunt quis officia unde. Voluptatem consequatur quam doloribus praesentium, itaque at minima illum corrupti. Maxime ea quaerat unde sunt? Lorem ipsum dolor sit amet consectetur, adipisicing elit. Iure voluptatum, magnam sunt quis officia unde. Voluptatem consequatur quam doloribus praesentium, itaque at minima illum corrupti. Maxime ea quaerat unde sunt?';

const authors = [];

for (let i = 0; i < 20; i += 1) {
  authors.push({
    name: `Osoba numer ${i + 1}`,
    description,
    gender: Math.round(Math.random()) ? MALE : FEMALE,
    image: '',
    social_media: {
      facebook: 'https://www.facebook.com',
      twitter: 'https://www.twitter.com',
      github: 'https://www.github.com',
      instagram: 'https://www.instagram.com',
    },
  });
}

export default authors;
