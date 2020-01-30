const initialState = {
  bookList: { books: [], loading: true, error: null },
  shoppingCart: { orderTotal: 0, cartItems: [] }
};
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

const updateBookList = (state, action) => {
  // eslint-disable-next-line default-case
  switch (action.type) {
    case "FETCH_BOOKS_SUCCESS":
      return {
        books: action.payload,
        loading: false,
        error: null
      };
    case "FETCH_BOOKS_REQUEST":
      return {
        books: [],
        loading: true,
        error: null
      };
    case "FETCH_BOOKS_FAILURE":
      return {
        books: [],
        loading: false,
        error: action.payload
      };
  }
};

const updateShoppingCart = (state, action) => {
  // eslint-disable-next-line default-case
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
  }
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "FETCH_BOOKS_SUCCESS":
    case "FETCH_BOOKS_REQUEST":
    case "FETCH_BOOKS_FAILURE":
      return {
        ...state,
        bookList: updateBookList(state, action)
      };
    case "BOOK_ADDED_TO_CART":
    case "BOOK_REMOVED_FROM_CART":
    case "ALL_BOOKS_REMOVED_FROM_CART":
      return {
        ...state,
        shoppingCart: updateShoppingCart(state, action)
      };

    default:
      return state;
  }
};
export default reducer;
