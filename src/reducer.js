const reducer = (state, action) => {
  if (action.type === 'CLEAR_CART') {
    return { ...state, cart: [] };
  }

  if (action.type === 'REMOVE') {
    const updatedCart = state.cart.filter((item) => item.id !== action.payload);
    return { ...state, cart: updatedCart };
  }

  if (action.type === 'INCREASE') {
    const updatedCart = state.cart.map((item) => {
      if (item.id === action.payload) {
        return { ...item, amount: item.amount + 1 };
      } else {
        return item;
      }
    });
    return { ...state, cart: updatedCart };
  }

  if (action.type === 'DECREASE') {
    const updatedCart = state.cart
      .map((item) => {
        if (item.id === action.payload) {
          return { ...item, amount: item.amount - 1 };
        } else {
          return item;
        }
      })
      .filter((item) => item.amount !== 0);
    return { ...state, cart: updatedCart };
  }

  if (action.type === 'GET_TOTALS') {
    let { amount, total } = state.cart.reduce(
      //destructure amount and total
      (cartTotal, cartItem) => {
        //cartTotal is what we always have to return, cartItem is the current item in the array
        const { amount, price } = cartItem; //destructure cartItem
        cartTotal.amount += amount; //cartTotal is the object we returning so we add values to it each itteration
        cartTotal.total += price * amount;
        return cartTotal;
      },
      {
        //this is second argument and it always represents initial value of what we returning from the reduce function
        amount: 0,
        total: 0,
      }
    );
    total = parseFloat(total.toFixed(2));
    return { ...state, amount, total };
  }

  return state;
};

export default reducer;
