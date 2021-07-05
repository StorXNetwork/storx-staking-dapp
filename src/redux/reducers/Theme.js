import * as types from "../../actions/types";
import { GET_DEFAULT_THEME, SetTheme, VALID_THEME } from "../../helpers/theme";

const defaultTheme = GET_DEFAULT_THEME();

const initialState = defaultTheme

SetTheme(defaultTheme);

const ThemeReducer = (state = initialState, payload) => {
  switch (payload.type) {
    case types.SET_THEME: {
      if (VALID_THEME.includes(payload.payload))
        return payload.payload
      return state;
    }
    default:
      return state;
  }
};

export default ThemeReducer;
