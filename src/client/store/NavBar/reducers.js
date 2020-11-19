import { CLOSEMENU, TOGGLEMENU, TOGGLEDISABLED } from './actions';

const initialState = {
  isOpen: false,
  isDisabled: false,
  isExpanded: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
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
