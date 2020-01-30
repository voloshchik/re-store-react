const updateCartItems = (cartItems, item, idx) => {
  if (item.count === 0) {
    return [...cartItems.slice(0, idx), ...cartItems.slice(idx + 1)];
  }

  if (idx === -1) {
    return [...cartItems, item];
  }

  return [...cartItems.slice(0, idx), item, ...cartItems.slice(idx + 1)];
};
const updateCartItem = (item = {}, book, quantity) => {
  const { id = book.id, title = book.title, count = 0, total = 0 } = item;
  return {
    id,
    title,
    count: count + quantity,
    total: total + quantity * book.price
  };
};
const updateOrder = (state, bookId, quantity) => {
  const {
    bookList: { books },
    shoppingCart: { cartItems }
  } = state;
  const book = books.find(book => book.id === bookId);
  const itemIndex = cartItems.findIndex(item => item.id === bookId);
  const item = cartItems[itemIndex];
  let newItem = updateCartItem(item, book, quantity);
  return {
    orderTotal: 0,
    cartItems: updateCartItems(cartItems, newItem, itemIndex)
  };
};
export const updateShoppingCart = (state, action) => {
  if (state === undefined) {
    return {
      orderTotal: 0,
      cartItems: []
    };
  }

  switch (action.type) {
    case "BOOK_ADDED_TO_CART":
      return updateOrder(state, action.payload, +1);
    case "BOOK_REMOVED_FROM_CART":
      return updateOrder(state, action.payload, -1);
    case "ALL_BOOKS_REMOVED_FROM_CART":
      const bookId = action.payload;
      const itemIndex = state.shoppingCart.cartItems.findIndex(
        book => book.id === bookId
      );
      const item = state.shoppingCart.cartItems[itemIndex];
      return updateOrder(state, action.payload, -item.count);
    default:
      return state.shoppingCart;
  }
};
