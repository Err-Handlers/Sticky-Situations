const {
  client,
  // declare your model imports here
  // for example, User
} = require("./");
const { createUser } = require("./models/user");
const { createPastries } = require("./models/pastries")

async function buildTables() {
  try {
    client.connect();

    // drop tables in correct order
    await client.query(`
      DROP TABLE IF EXISTS order_pastries;
      DROP TABLE IF EXISTS orders;
      DROP TABLE IF EXISTS cart_pastries;
      DROP TABLE IF EXISTS carts;
      DROP TABLE IF EXISTS reviews;
      DROP TABLE IF EXISTS pastries;
      DROP TABLE IF EXISTS users;
    `);

    // build tables in correct order
    await client.query(`
      CREATE TABLE users(
        id SERIAL PRIMARY KEY,
        email VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL
      );

      CREATE TABLE pastries(
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) UNIQUE NOT NULL,
        description TEXT NOT NULL,
        "isGlutenFree" BOOLEAN DEFAULT false,
        "isSweet" BOOLEAN DEFAULT false,
        "imageURL" VARCHAR(255),
        inventory INTEGER NOT NULL,
        "priceInCents" INTEGER NOT NULL
      );

      CREATE TABLE reviews(
        id SERIAL PRIMARY KEY,
        "userId" INTEGER REFERENCES users(id),
        "pastryId" INTEGER REFERENCES pastries(id),
        "reviewDescription" TEXT NOT NULL,
        UNIQUE ("userId", "pastryId")
      );

      CREATE TABLE carts(
        id SERIAL PRIMARY KEY,
        "userId" INTEGER REFERENCES users(id)
      );

      CREATE TABLE cart_pastries(
        id SERIAL PRIMARY KEY,
        quantity INTEGER NOT NULL,
        "pastryId" INTEGER REFERENCES pastries(id),
        "cartId" INTEGER REFERENCES carts(id),
        UNIQUE ("cartId", "pastryId")
      );

      CREATE TABLE orders(
        id SERIAL PRIMARY KEY,
        "userId" INTEGER REFERENCES users(id)
      );

      CREATE TABLE order_pastries(
        id SERIAL PRIMARY KEY,
        quantity INTEGER NOT NULL,
        "priceInCents" INTEGER NOT NULL,
        "pastryId" INTEGER REFERENCES pastries(id),
        "orderId" INTEGER REFERENCES orders(id),
        UNIQUE ("orderId", "pastryId")
      );

    `);
  } catch (error) {
    throw error;
  }
}

async function populateInitialData() {
  try {
    // create useful starting data by leveraging your
    // Model.method() adapters to seed your db, for example:
    // const user1 = await User.createUser({ ...user info goes here... })
    const users = [
      {
        password: "kimspassword",
        email: "kimsemail@email.com"
      },
      {
        password: "erinspassword",
        email: "erinsemail@email.com"
      },
      {
        password: "thuanspassword",
        email: "thuansemail@email.com"
      },
    ];

    const createdUsers = await Promise.all(users.map(createUser));
    console.log("Users being created");
    console.log(createdUsers);

    //initial pastries data
    const pastries = [
      {
      name: "Croissant",
      description: "Buttery and Flakey",
      isGlutenFree: false,
      isSweet: false,
      imageURL: "https://www.theflavorbender.com/wp-content/uploads/2020/05/French-Croissants-SM-2363.jpg",
      inventory: 23,
      priceInCents: 100
    },
  ];

  const createdPastries = await Promise.all(pastries.map(createPastries));
    console.log("Pastries being created");
    console.log(createdPastries);

  } catch (error) {
    throw error;
  }
}

buildTables()
  .then(populateInitialData)
  .catch(console.error)
  .finally(() => client.end());
