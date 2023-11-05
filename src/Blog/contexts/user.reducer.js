export const init_value = {
  user_id: "",
  username: "",
  token: null,
};

export const user_reducer = (state, action) => {
  const type = action.type;
  switch (type) {
    case "AUTH": {
      return {
        ...state,
        ...action.payload,
      };
    }

    case "LOGOUT": {
      return {
        ...state,
        ...action.payload,
      };
    }
    default:
      return init_value;
  }
};
