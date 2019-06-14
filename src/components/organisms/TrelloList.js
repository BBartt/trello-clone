import React from "react";
import TextArea from "react-textarea-autosize";
import { Draggable } from "react-beautiful-dnd";
import { InputGroup, Button } from "react-bootstrap";
import { removeItem, doneTask } from "actions";
import store from "store";

const TrelloList = ({ text, index, listID, cardID, title, done }) => {
  return (
    <Draggable draggableId={String(listID)} index={index}>
      {provided => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <InputGroup className="d-flex justify-content-between mt-3">
            <InputGroup.Prepend>
              <Button
                onClick={() => store.dispatch(doneTask(listID, cardID, title))}
                className="m-0"
                variant={done ? "success" : "secondary"}
              >
                <i className={done ? "fa fa-check" : "fa fa-square"} />
              </Button>
            </InputGroup.Prepend>

            <TextArea
              autoFocus
              value={`text: ${text} ||| index: ${index} ||| listID: ${listID} ||| cardID: ${cardID} ||| title: ${title}`}
              disabled
              style={{
                resize: "none",
                outline: "none",
                border: "none",
                fontSize: "14px",
                marginTop: "2px",
                width: "235px",
                height: "auto",
                textDecoration: `${done ? "line-through" : "none"}`
              }}
            />

            <InputGroup.Append>
              <Button
                className="m-0"
                variant="danger"
                onClick={() =>
                  store.dispatch(removeItem(listID, cardID, title))
                }
              >
                <i className="fa fa-times" />
              </Button>
            </InputGroup.Append>
          </InputGroup>
        </div>
      )}
    </Draggable>
  );
};

export default TrelloList;
