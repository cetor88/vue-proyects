export const loadState = (attrKey) => {
  try {
    const serializedState = localStorage.getItem(attrKey);
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
    //return serializedState;
  } catch (err) {
    return undefined;
  }
};

export const saveState = (state, attrKey) => {
  try {
    const serializedState = JSON.stringify(attrKey);
    localStorage.setItem(state, serializedState);
  } catch (err) {
    console.error(`Something went wrong: ${err}`);
  }
}

export const removeState = (attrKey) => {
  try {
    const serializedState = localStorage.getItem(attrKey);
    if (serializedState === null) {
      return undefined;
    } else
      localStorage.removeItem(attrKey);
  } catch (err) {
    console.error(`Something went wrong: ${err}`);
  }
}