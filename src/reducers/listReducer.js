import {
  ADD_CARD,
  ADD_LIST_ITEM,
  DRAG_HAPPEND,
  REMOVE_CARD,
  REMOVE_ITEM,
  DONE
} from "actions";

let cardID = 1;
let listID = 3;

const listReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_CARD: {
      const newCard = {
        title: action.payload,
        id: `card-${cardID}`,
        cards: []
      };
      cardID += 1;
      return [...state, newCard];
    }

    case ADD_LIST_ITEM: {
      const newList = {
        text: action.payload.text,
        done: false,
        id: `list-${listID}`
      };
      listID += 1;
      const newState = state.map(list => {
        if (list.id === action.payload.cardID) {
          return {
            ...list,
            cards: [...list.cards, newList]
          };
        } else {
          return list;
        }
      });
      return newState;
    }

    case DRAG_HAPPEND:
      const {
        droppableIdStart,
        droppableIdEnd,
        droppableIndexStart,
        droppableIndexEnd,
        type
      } = action.payload;

      const newState = [...state];

      if (type === "card") {
        const list = newState.splice(droppableIndexStart, 1);
        newState.splice(droppableIndexEnd, 0, ...list);
        return newState;
      }

      if (droppableIdStart === droppableIdEnd) {
        const list = state.find(list => droppableIdStart === list.id);
        const card = list.cards.splice(droppableIndexStart, 1);
        list.cards.splice(droppableIndexEnd, 0, ...card);
      }

      if (droppableIdStart !== droppableIdEnd) {
        const listStart = state.find(list => droppableIdStart === list.id);
        const card = listStart.cards.splice(droppableIndexStart, 1);
        const listEnd = state.find(list => droppableIdEnd === list.id);
        listEnd.cards.splice(droppableIndexEnd, 0, ...card);
      }

      return newState;

    case REMOVE_CARD:
      return state.filter(item => {
        return item.id !== action.payload;
      });

    case REMOVE_ITEM: {
      const findCard = state.find(item => {
        return item.title === action.payload.title;
      });
      const goodArray = findCard.cards.filter(item => {
        return item.id !== action.payload.listID;
      });
      return state.map(item => {
        if (item.id === action.payload.cardID) {
          return {
            ...item,
            cards: goodArray
          };
        }
        return item;
      });
    }

    case DONE: {
      const cardToChange = state.find(item => {
        return item.title === action.payload.title;
      });

      const toggledArray = cardToChange.cards.filter(item => {
        if (item.id === action.payload.listID) {
          return (item.done = !item.done);
        }
        return item;
      });
      console.log("toggledArray", toggledArray);
      return state.map(item => {
        if (item.id === action.payload.cardID) {
          return {
            ...item,
            cards: toggledArray
          };
        }
        return item;
      });
    }

    default:
      return state;
  }
};

const initialState = [
  {
    title: "EXAMPLE TITLE",
    id: `card-${0}`,
    cards: [
      {
        id: `list-${0}`,
        text: "lorem ipsum #1",
        done: false
      },
      {
        id: `list-${1}`,
        text: "LOREM IPSUM #2",
        done: false
      },
      {
        id: `list-${2}`,
        text: "LOREM IPSUM #3",
        done: false
      }
    ]
  }
];

export default listReducer;
