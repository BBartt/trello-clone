import React, { Component } from "react";
import styled from "styled-components";
import StyledHeader from "components/atoms/StyledHeader/StyledHeader";
import GlobalStyle from "theme/GlobalStyle";
import { ThemeProvider } from "styled-components";
import { connect } from "react-redux";
import { theme } from "theme/mainTheme";
import TrelloCard from "components/organisms/TrelloCard";
import TrelloActionButton from "components/organisms/TrelloActionButton";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import { sort } from "actions";

const StyledWrapper = styled.div`
  display: flex;
  flex-wrap: nowrap;
  overflow: auto;
  height: 100%;
`;

class App extends Component {
  onDragEnd = result => {
    const { destination, source, draggableId, type } = result;

    if (!destination) {
      return;
    }

    this.props.dispatch(
      sort(
        source.droppableId,
        destination.droppableId,
        source.index,
        destination.index,
        draggableId,
        type
      )
    );
  };

  render() {
    const { lists } = this.props;
    return (
      <DragDropContext onDragEnd={this.onDragEnd}>
        <GlobalStyle />
        <ThemeProvider theme={theme}>
          <>
            <StyledHeader>trello clone</StyledHeader>
            <Droppable
              droppableId="all-lists"
              direction="horizontal"
              type="card"
            >
              {provided => (
                <StyledWrapper
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                >
                  <TrelloActionButton list />

                  {lists.map((list, index) => (
                    <TrelloCard
                      cardID={list.id}
                      title={list.title}
                      cards={list.cards}
                      index={index}
                    />
                  ))}
                  {provided.placeholder}
                </StyledWrapper>
              )}
            </Droppable>
          </>
        </ThemeProvider>
      </DragDropContext>
    );
  }
}

const mapState = state => ({
  lists: state.lists
});

export default connect(mapState)(App);
