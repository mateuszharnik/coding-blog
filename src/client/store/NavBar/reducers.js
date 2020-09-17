import {
  CLOSEMENU, TOGGLEMENU, TOGGLEDISABLED, SETAUTHORSLENGTH,
} from './actions';

const initialState = {
  isOpen: false,
  isDisabled: false,
  isExpanded: false,
  authorsLength: 0,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SETAUTHORSLENGTH:
      return {
        ...state,
        authorsLength: action.authorsLength,
      };
    case CLOSEMENU:
      return {
        ...state,
        isOpen: false,
        isExpanded: false,
      };
    case TOGGLEMENU:
      return {
        ...state,
        isDisabled: true,
        isOpen: !state.isOpen,
        isExpanded: !state.isExpanded,
      };
    case TOGGLEDISABLED:
      return {
        ...state,
        isDisabled: !state.isDisabled,
      };
    default:
      return state;
  }
};

export default reducer;
