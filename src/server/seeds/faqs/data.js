const answer = 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Iure voluptatum, magnam sunt quis officia unde. Voluptatem consequatur quam doloribus praesentium, itaque at minima illum corrupti. Maxime ea quaerat unde sunt? Lorem ipsum dolor sit amet consectetur, adipisicing elit. Iure voluptatum, magnam sunt quis officia unde. Voluptatem consequatur quam doloribus praesentium, itaque at minima illum corrupti. Maxime ea quaerat unde sunt?';

const faqs = [];

for (let i = 0; i < 20; i += 1) {
  faqs.push({
    question: `Pytanie numer ${i + 1}?`,
    answer,
  });
}

export default faqs;
