const getTotalCost = productsInCart => {
  let totalCost = 0;
  productsInCart.forEach(productInCart => {
    totalCost += parseInt(productInCart.product.price) * productInCart.count;
  });
  return totalCost;
};


export {
  getTotalCost
};