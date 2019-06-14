import React from "react";
import Icon from "@material-ui/core/Icon";
import Card from "@material-ui/core/Card";
import TextArea from "react-textarea-autosize";
import { connect } from "react-redux";
import { addListItem, addCard } from "actions";
import Button from "@material-ui/core/Button";

class TrelloActionButton extends React.Component {
  state = {
    formOpen: false,
    text: ""
  };

  openForm = () => {
    this.setState({
      formOpen: true
    });
  };
  closeForm = e => {
    this.setState({
      formOpen: false
    });
  };

  handleInputChange = e => {
    this.setState({
      text: e.target.value
    });
  };

  handleAddListItem = () => {
    const { dispatch, cardID } = this.props;
    const { text } = this.state;
    if (text) {
      this.setState({
        text: ""
      });
      dispatch(addListItem(cardID, text));
    }
    return;
  };
  handleAddCard = () => {
    const { dispatch } = this.props;
    const { text } = this.state;

    if (text) {
      this.setState({
        text: ""
      });
      dispatch(addCard(text));
    }
    return;
  };

  renderAddButton = () => {
    const { list } = this.props;
    const bWidth = list ? "200px" : "100%";
    return (
      <Button
        variant="contained"
        style={{ height: "50px", marginTop: "20px", minWidth: bWidth }}
        onClick={this.openForm}
        boxShadow={3}
      >
        <Icon>add</Icon>
        {list ? "Add another card" : "Add another item"}
        <Icon>add</Icon>
      </Button>
    );
  };

  renderForm = () => {
    const { list } = this.props;
    return (
      <div>
        <Card style={{ marginTop: "20px", minHeight: 80 }}>
          <TextArea
            autoFocus
            onBlur={this.closeForm}
            value={this.state.text}
            placeholder={
              list ? "Enter list title..." : "Enter a content for this card..."
            }
            onChange={this.handleInputChange}
            style={{
              resize: "none",
              outline: "none",
              border: "none",
              height: "700px",
              fontSize: "14px",
              minWidth: `${!list ? "100%" : "200px"}`
            }}
          />
        </Card>
        <div style={{ display: "flex", alignItems: "center" }}>
          <Button
            onMouseDown={list ? this.handleAddCard : this.handleAddListItem}
            variant="contained"
            style={{ color: "white", backgroundColor: "#5aac44" }}
          >
            {list ? "Add Card" : "Add List Item"}
          </Button>
          <Icon style={{ marginLeft: 8, cursor: "pointer" }}>close</Icon>
        </div>
      </div>
    );
  };
  render() {
    return this.state.formOpen ? this.renderForm() : this.renderAddButton();
  }
}

const mapState = state => ({});

export default connect(mapState)(TrelloActionButton);
