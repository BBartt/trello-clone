export const ADD_CARD = "ADD_CARD";
export const ADD_LIST_ITEM = "ADD_LIST_ITEM";
export const DRAG_HAPPEND = "DRAG_HAPPEND";
export const REMOVE_CARD = "REMOVE_CARD";
export const REMOVE_ITEM = "REMOVE_ITEM";
export const DONE = "DONE";

export const addListItem = (cardID, text) => {
  return {
    type: ADD_LIST_ITEM,
    payload: { cardID, text }
  };
};

export const addCard = text => {
  return {
    type: ADD_CARD,
    payload: text
  };
};

export const removeCard = cardID => {
  return {
    type: REMOVE_CARD,
    payload: cardID
  };
};

export const removeItem = (listID, cardID, title) => {
  return {
    type: REMOVE_ITEM,
    payload: { listID, cardID, title }
  };
};

export const doneTask = (listID, cardID, title) => {
  return {
    type: DONE,
    payload: { listID, cardID, title }
  };
};

export const sort = (
  droppableIdStart,
  droppableIdEnd,
  droppableIndexStart,
  droppableIndexEnd,
  draggableId,
  type
) => {
  return {
    type: DRAG_HAPPEND,
    payload: {
      droppableIdStart,
      droppableIdEnd,
      droppableIndexStart,
      droppableIndexEnd,
      draggableId,
      type
    }
  };
};
