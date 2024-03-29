const { client } = require("./");
const { createUser } = require("./models/user");
const { createProduct } = require("./models/products");
const { createOrder } = require("./models/cart");

async function buildTables() {
  try {
    client.connect();
    await client.query(`
    DROP TABLE IF EXISTS users cascade;
      DROP TABLE IF EXISTS shipping_details;
      DROP TABLE IF EXISTS payment_details;
      DROP TABLE IF EXISTS order_products;
      DROP TYPE IF EXISTS status cascade;
      DROP TABLE IF EXISTS reviews;
      DROP TABLE IF EXISTS products;
      DROP TABLE IF EXISTS orders;
    `);
    await client.query(`
      CREATE TABLE users(
        id SERIAL PRIMARY KEY,
        email VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255),
        "isAdmin" BOOLEAN DEFAULT false
      );

      CREATE TABLE products(
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) UNIQUE NOT NULL,
        description TEXT NOT NULL,
        "imageURL" VARCHAR(255),
        inventory INTEGER NOT NULL,
        "priceInCents" INTEGER NOT NULL
      );

      CREATE TABLE reviews(
        id SERIAL PRIMARY KEY,
        "userId" INTEGER REFERENCES users(id),
        "productId" INTEGER REFERENCES products(id),
        "reviewDescription" TEXT NOT NULL,
        UNIQUE ("userId", "productId")
      );
      
      CREATE TYPE status AS ENUM (
        'cart', 'completed'
      );

      CREATE TABLE orders(
        id SERIAL PRIMARY KEY,
        "userId" INTEGER REFERENCES users(id),
        "orderDate" text,
        "totalPriceInCents" INTEGER,
        status STATUS
      );

      CREATE TABLE order_products(
        id SERIAL PRIMARY KEY,
        quantity INTEGER NOT NULL,
        "priceInCents" INTEGER NOT NULL,
        "productId" INTEGER REFERENCES products(id),
        "orderId" INTEGER REFERENCES orders(id),
        UNIQUE ("orderId", "productId")
      );

      CREATE TABLE shipping_details(
        id SERIAL PRIMARY KEY,
        "orderId" INTEGER REFERENCES orders(id),
        "shippingFirstName" VARCHAR(255) NOT NULL,
        "shippingLastName" VARCHAR(255) NOT NULL,
        "shippingCity" VARCHAR(255) NOT NULL,
        "shippingState" VARCHAR(255) NOT NULL,
        "shippingStreet" text NOT NULL,
        "shippingZipcode" text NOT NULL
      );

      CREATE TABLE payment_details(
        id SERIAL PRIMARY KEY,
        "orderId" INTEGER REFERENCES orders(id),
        "paymentName" VARCHAR(255) NOT NULL,
        "paymentCity" VARCHAR(255) NOT NULL,
        "paymentState" VARCHAR(255) NOT NULL,
        "paymentStreet" text NOT NULL,
        "paymentZipcode" text NOT NULL,
        "cardNumber" text NOT NULL,
        "cardCvc" text NOT NULL
      );
    `);
  } catch (error) {
    throw error;
  }
}

async function populateInitialData() {
  try {
    const users = [
      {
        password: "kimspassword",
        email: "kimsemail@email.com",
        isAdmin: true,
      },
      {
        password: "erinspassword",
        email: "erinsemail@email.com",
        isAdmin: false,
      },
      {
        password: "thuanspassword",
        email: "thuansemail@email.com",
        isAdmin: false,
      },
      {
        password: "testpassword",
        email: "test@gmail.com",
        isAdmin: false
      }
    ];

    const createdUsers = await Promise.all(users.map(createUser));
    console.log("Users being created");
    console.log(createdUsers);

    const products = [
      {
        name: "Plant Trees",
        description: "Arms wrapped around a tree",
        imageURL: "https://i.postimg.cc/65PHYcpV/plant-Trees.png",
        inventory: 10,
        priceInCents: 500,
      },
      {
        name: "Koi Fish",
        description: "Minimal Koi Art",
        imageURL: "https://i.postimg.cc/B6d6mRR9/koi-Yellow.jpg",
        inventory: 10,
        priceInCents: 500,
      },
      {
        name: "Ghost Photographer",
        description: "Ghost taking photo",
        imageURL: "https://i.postimg.cc/yYxQmtsY/ghost-Photo1.png",
        inventory: 10,
        priceInCents: 500,
      },
      {
        name: "Ghost with Balloon",
        description: "Ghost playing with balloon",
        imageURL: "https://i.postimg.cc/25Q2jfFT/ghost-With-Balloon.png",
        inventory: 10,
        priceInCents: 500,
      },
      {
        name: "Ghost Underwater",
        description: "Ghost playing underwater",
        imageURL: "https://i.postimg.cc/3R91pCqv/ghost-Underwater.jpg",
        inventory: 10,
        priceInCents: 500,
      },
      {
        name: "Cat",
        description: "Black cat chilling",
        imageURL: "https://i.postimg.cc/Y9t8hyd7/sitting-Black-Cat.png",
        inventory: 10,
        priceInCents: 500,
      },
      {
        name: "Popsicle",
        description: "Eaten popsicle",
        imageURL: "https://i.postimg.cc/XvSs0vFp/popsicle.png",
        inventory: 10,
        priceInCents: 500,
      },
      {
        name: "Meerkat",
        description: "Meerkat standing guard",
        imageURL: "https://i.postimg.cc/HnZSG44g/meerakat.png",
        inventory: 10,
        priceInCents: 500,
      },
      {
        name: "Sunny Side Up",
        description: "Yummy egg",
        imageURL: "https://i.postimg.cc/NFfNPPXD/sunny-Side-Up.png",
        inventory: 10,
        priceInCents: 500,
      },
      {
        name: "Penguin",
        description: "Fluffy penguin",
        imageURL: "https://i.postimg.cc/RCXpn4rD/penguin.png",
        inventory: 10,
        priceInCents: 500,
      },
      {
        name: "Cow",
        description: "Moo",
        imageURL: "https://i.postimg.cc/XYysh5rR/cow.png",
        inventory: 10,
        priceInCents: 500,
      },
      {
        name: "Strawberry Cat",
        description: "Pretty pink cat",
        imageURL: "https://i.postimg.cc/GpwcMJ68/2022-12-03-12-15-18.png",
        inventory: 10,
        priceInCents: 500,
      },
      {
        name: "Strawberry Frog",
        description: "Frog Holding Strawberry",
        imageURL: "https://i.postimg.cc/QCHGNHRZ/2022-12-03-12-15-46.png",
        inventory: 10,
        priceInCents: 500,
      },
      {
        name: "Turtle",
        description: "Awkward turtle",
        imageURL: "https://i.postimg.cc/rmh2LSZ9/2022-12-03-12-16-10.png",
        inventory: 10,
        priceInCents: 500,
      },
      {
        name: "Stacking Turtle",
        description: "Turtles on top of each other",
        imageURL: "https://i.postimg.cc/3wTTjrD2/2022-12-03-12-16-19.png",
        inventory: 10,
        priceInCents: 500,
      },
      {
        name: "Sleeping Bee",
        description: "Tired bee",
        imageURL: "https://i.postimg.cc/xTBYC3fx/2022-12-03-12-16-33.png",
        inventory: 10,
        priceInCents: 500,
      },
      {
        name: "Dinosaur Mushroom Hat",
        description: "White dinosaur hat on top of head",
        imageURL: "https://i.postimg.cc/26jNJHG6/2022-12-03-12-16-56.png",
        inventory: 10,
        priceInCents: 500,
      },
      {
        name: "Dinosaur Watermelon Hat",
        description: "Green dinosaur hat on top of head",
        imageURL: "https://i.postimg.cc/xj4Vx3zf/2022-12-03-12-17-09.png",
        inventory: 10,
        priceInCents: 500,
      },
      {
        name: "Axolotl",
        description: "Pink Axolotl",
        imageURL: "https://i.postimg.cc/MGm89kyN/2022-12-03-12-17-27.png",
        inventory: 10,
        priceInCents: 500,
      },
      {
        name: "Panda",
        description: "Panda with bamboo",
        imageURL: "https://i.postimg.cc/gkxmmTWL/2022-12-03-12-17-39.png",
        inventory: 10,
        priceInCents: 500,
      },
      {
        name: "Otter",
        description: "Otter with clam",
        imageURL: "https://i.postimg.cc/Pf3dGkBk/2022-12-03-12-17-49.png",
        inventory: 10,
        priceInCents: 500,
      },
    ];

    const initialOrders = [
      {
        userId: 1,
        status: "cart",
        orderDate: "12/6/2022",
      },
      {
        userId: 2,
        status: "completed",
        orderDate: "12/6/2022",
      },
      {
        userId: 3,
        status: "cart",
        orderDate: "12/6/2022",
      },
    ];

    const createdProducts = await Promise.all(products.map(createProduct));
    console.log("Products being created");
    console.log(createdProducts);

    const createdOrders = await Promise.all(initialOrders.map(createOrder));
    console.log("createdOrders :>> ", createdOrders);
  } catch (error) {
    console.log(error);
  }
}

buildTables()
  .then(populateInitialData)
  .catch(console.error)
  .finally(() => client.end());
