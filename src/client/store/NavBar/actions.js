export const TOGGLEMENU = 'TOGGLEMENU';
export const CLOSEMENU = 'CLOSEMENU';
export const TOGGLEDISABLED = 'TOGGLEDISABLED';
export const SETAUTHORSLENGTH = 'SETAUTHORSLENGTH';

export const closeMenu = () => ({
  type: CLOSEMENU,
});

export const setAuthorsLength = (authorsLength = 0) => ({
  type: SETAUTHORSLENGTH,
  authorsLength,
});

export const toggleMenu = () => (dispatch, getState) => {
  const { isDisabled } = getState().navbar;

  if (!isDisabled) {
    dispatch({
      type: TOGGLEMENU,
    });

    setTimeout(() => {
      dispatch({
        type: TOGGLEDISABLED,
      });
    }, 100);
  }
};
