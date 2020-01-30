import { updateBookList } from './reducers/book-list';
import { updateShoppingCart } from './reducers/shopping-cart';





const reducer = (state , action) => {
  return {
    bookList: updateBookList(state, action),
    shoppingCart: updateShoppingCart(state, action)
  };
};
export default reducer;
