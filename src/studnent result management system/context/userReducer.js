const ACTION_TYPE = {
  SIGN_UP: "01",
  SIGN_IN: "02",
  SIGN_OUT: "03",
};

export default ACTION_TYPE;

export const userInit = {
  username: "",
  email: "",
  id: undefined,
};

export const userReducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case ACTION_TYPE.SIGN_UP: {
      return {
        username: payload.username,
        email: payload.email,
        id: payload._id,
      };
    }

    case ACTION_TYPE.SIGN_IN: {
      return {
        username: payload.username,
        email: payload.email,
        id: payload._id,
      };
    }
    case ACTION_TYPE.SIGN_OUT: {
      return { ...userInit };
    }
    default:
      return { ...userInit };
  }
};
