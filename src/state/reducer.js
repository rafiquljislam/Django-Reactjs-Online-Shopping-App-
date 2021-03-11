export const initialState = {
  reload: null,
  profile: null,
  totalcart: 0,
  message: {}
};

const reducer = (state, action) => {
  console.log(action.type);
  switch (action.type) {
    case "RE":
      return {
        ...state,
        reload: action.value,
      };
    case "PRO":
      return {
        ...state,
        profile: action.value,
      };
    case "CARTPROD":
      return {
        ...state,
        totalcart: action.value,
      };
    case "MESSAGE":
      return {
        ...state,
        message: action.value,
      };

    default:
      return state;
  }
};

export default reducer;