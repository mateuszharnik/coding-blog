const content = 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Iure voluptatum, magnam sunt quis officia unde. Voluptatem consequatur quam doloribus praesentium, itaque at minima illum corrupti. Maxime ea quaerat unde sunt? Lorem ipsum dolor sit amet consectetur, adipisicing elit. Iure voluptatum, magnam sunt quis officia unde. Voluptatem consequatur quam doloribus praesentium, itaque at minima illum corrupti. Maxime ea quaerat unde sunt?';

const messages = [];

for (let i = 0; i < 10; i += 1) {
  const id = i + 1;

  messages.push({
    name: `Osoba ${id}`,
    email: `example${id}@domain.com`,
    subject: `Temat wiadomości numer ${id}`,
    content,
  });
}

export default messages;
