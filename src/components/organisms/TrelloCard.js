import React from "react";
import styled from "styled-components";
import TrelloList from "./TrelloList";
import TrelloActionButton from "components/organisms/TrelloActionButton";
import { Droppable, Draggable } from "react-beautiful-dnd";
import { Card, Button } from "react-bootstrap";
import store from "store";
import { removeCard } from "actions";

const StyledTrelloCardWrapper = styled.div`
  background: #f8d353;
  background: linear-gradient(to bottom right, #f8d353, #ff5c5a);
  border-radius: 5px;
  max-width: 350px;
  min-width: 350px;
  margin-top: 20px;
  margin-left: 20px;
  display: table;
  padding: 8px;

  .card {
    font-size: ${({ theme }) => theme.fontSize.s};
    text-transform: uppercase;
    word-break: break-all;
    text-align: center;
  }
`;

const StyledCardHeaderWrapper = styled.div`
  display: flex;
  flex-wrap: nowrap;
  justify-content: flex-start;
`;

const TrelloCard = ({ title, cards, cardID, index }) => {
  return (
    <Draggable draggableId={String(cardID)} index={index}>
      {provided => (
        <StyledTrelloCardWrapper
          {...provided.draggableProps}
          ref={provided.innerRef}
          {...provided.dragHandleProps}
        >
          <Droppable droppableId={String(cardID)}>
            {provided => (
              <div {...provided.droppableProps} ref={provided.innerRef}>
                <StyledCardHeaderWrapper>
                  <Button
                    variant="danger"
                    onClick={() => store.dispatch(removeCard(cardID))}
                  >
                    <i className="fa fa-times" />
                  </Button>
                  <Card bg="info" text="white" style={{ width: "100%" }}>
                    <Card.Header>{title}</Card.Header>
                  </Card>
                </StyledCardHeaderWrapper>

                {cards.map((card, index) => (
                  <TrelloList
                    index={index}
                    text={card.text}
                    listID={card.id}
                    cardID={cardID}
                    title={title}
                    done={card.done}
                  />
                ))}

                {provided.placeholder}
                <TrelloActionButton cardID={cardID} />
              </div>
            )}
          </Droppable>
        </StyledTrelloCardWrapper>
      )}
    </Draggable>
  );
};

export default TrelloCard;
