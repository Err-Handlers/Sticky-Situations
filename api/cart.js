const express = require("express");
const cartRouter = express.Router();
const {
  addProductToOrderProducts,
  findOrCreateCart,
  getProductById,
  updateOrderQuantity,
  getOrderProductsByUserId,
  deleteProductFromCart,
  getProductAndOrderProductById,
  updateOrderStatus,
} = require("../db/models");

cartRouter.get("/products", async (req, res, next) => {
  try {
    const allProductsInCart = await getOrderProductsByUserId(req.user.id);
    res.send(allProductsInCart);
  } catch ({ name, message }) {
    next({ name, message });
  }
});

cartRouter.get("/", async (req, res, next) => {
  try {
    const allProductsInCart = await getOrderProductsByUserId(req.user.id);
    const products = await Promise.all(
      allProductsInCart.map((product) =>
        getProductAndOrderProductById(product.orderId, product.productId)
      )
    );
    res.send(products);
  } catch ({ name, message }) {
    next({ name, message });
  }
});



cartRouter.patch("/", async (req, res, next) => {
  try {
    const { quantity, productId, orderId } = req.body;
    const newQuantity = await updateOrderQuantity(quantity, productId, orderId);
    console.log("newQuantity :>> ", newQuantity);
    res.send(newQuantity);
  } catch ({ name, message }) {
    next({ name, message });
  }
});

cartRouter.post("/", async (req, res, next) => {
  try {
    const { quantity, productId } = req.body;
    const cart = await findOrCreateCart(req.user.id);
    const product = await getProductById(productId);
    const result = await addProductToOrderProducts({
      quantity,
      orderId: cart.id,
      productId,
      priceInCents: product.priceInCents,
    });
    res.send(result);
  } catch ({ name, message }) {
    next({ name, message });
  }
});


cartRouter.delete("/", async (req, res, next) => {
  try {
    const { productId, orderId } = req.body;
    await deleteProductFromCart(productId, orderId);
    res.send({ message: "deleted product" });
  } catch ({ name, message }) {
    next({ name, message });
  }
});

cartRouter.patch("/checkout", async (req, res, next) => {
  try {
    const { cartTotal, orderId } = req.body;
    console.log('cartTotal :>> ', cartTotal);
    const updateStatus = await updateOrderStatus(orderId, cartTotal);
    res.send(updateStatus);
  } catch ({ name, message }) {
    next({ name, message });
  }
});

cartRouter.patch("/checkout", async (req, res, next) => {
  try {
    const updateStatus = await updateOrderStatus(req.body.orderId)
    console.log('updateStatus :>> ', updateStatus);
    res.send(updateStatus)
  } catch ({name, message}) {
    next({name, message})
  }
})

cartRouter.get("/test", async (req, res, next) => {
  try {
    const data = await getOrdersByUserId(req.user.id)
    res.send(data)
  } catch ({name, message}) {
    next({name, message})
  }
})

module.exports = cartRouter;