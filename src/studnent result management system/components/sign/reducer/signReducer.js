const SIGN_ACTION = {
  SET_NAME: "01",
  SET_EMAIL: "02",
  SET_PASSWORD: "03",
  SET_CONFIRM_PASSWORD: "04",
  SET_NAME_ERROR: "05",
  SET_EMAIL_ERROR: "06",
  SET_PASSWORD_ERROR: "07",
  SET_CONFIRM_PASSWORD_ERROR: "08",
  SET_FETCH_ERROR: "09",
};

export default SIGN_ACTION;

export const signInit = {
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
  error: {
    status: false,
    type: undefined,
  },
};

export const signReducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case SIGN_ACTION.SET_NAME: {
      return {
        ...state,
        name: payload,
        error: {
          status: false,
          type: undefined,
        },
      };
    }
    case SIGN_ACTION.SET_EMAIL: {
      return {
        ...state,
        email: payload,
        error: {
          status: false,
          type: undefined,
        },
      };
    }

    case SIGN_ACTION.SET_PASSWORD: {
      return {
        ...state,
        password: payload,
        error: {
          status: false,
          type: undefined,
        },
      };
    }
    case SIGN_ACTION.SET_CONFIRM_PASSWORD: {
      return {
        ...state,
        confirmPassword: payload,
        error: {
          status: false,
          type: undefined,
        },
      };
    }

    case SIGN_ACTION.SET_NAME_ERROR: {
      return {
        ...state,
        error: {
          state: true,
          type: SIGN_ACTION.SET_NAME_ERROR,
        },
      };
    }

    case SIGN_ACTION.SET_EMAIL_ERROR: {
      return {
        ...state,
        error: {
          state: true,
          type: SIGN_ACTION.SET_EMAIL_ERROR,
        },
      };
    }

    case SIGN_ACTION.SET_PASSWORD_ERROR: {
      return {
        ...state,
        error: {
          state: true,
          type: SIGN_ACTION.SET_PASSWORD_ERROR,
        },
      };
    }

    case SIGN_ACTION.SET_CONFIRM_PASSWORD_ERROR: {
      return {
        ...state,
        error: {
          state: true,
          type: SIGN_ACTION.SET_CONFIRM_PASSWORD_ERROR,
        },
      };
    }

    case SIGN_ACTION.SET_FETCH_ERROR: {
      return {
        ...state,
        error: {
          state: true,
          type: SIGN_ACTION.SET_FETCH_ERROR,
        },
      };
    }

    default:
      return { ...signInit };
  }
};
