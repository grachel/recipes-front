import React from "react";
import { compose } from "recompose";
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import TextareaAutosize from "react-autosize-textarea";
import Fab from "@material-ui/core/Fab";
import PrintIcon from "@material-ui/icons/Print";
import ReactToPrint from "react-to-print";

import { withAuthorization } from "../Session";
import { withService } from "../Service";

const styles = theme => ({
  root: {
    flexGrow: 1
  },
  paper: {
    marginTop: "3%",
    marginLeft: "8%",
    width: "80%"
  },
  content: {
    padding: "3%"
  },
  title: {
    display: "block",
    fontWeight: "bold",
    fontSize: "large"
  },
  textField: {
    marginTop: "2%",
    width: "100%",
    border: "none",
    resize: "none"
  },
  fab: {
    position: "absolute",
    bottom: "5%",
    right: "5%"
  }
});

export class Recipe extends React.Component {
  state = {
    recipe: {}
  };

  componentDidMount() {
    const { id } = this.props.match.params;
    this.props.service.recipe(id).once("value", data => {
      this.setState({ recipe: data.val() });
    });
  }

  render() {
    const { classes } = this.props;
    const { recipe } = this.state;
    return (
      <div>
        <Paper className={classes.paper}>
          <div ref={el => (this.componentRef = el)} className={classes.content}>
            <span className={classes.title}>{recipe.title}</span>
            <TextareaAutosize
              className={classes.textField}
              value={recipe.desc}
            />
          </div>
        </Paper>
        <ReactToPrint
          trigger={() => (
            <Fab
              color="primary"
              aria-label="Print"
              className={classes.fab}
              onClick={this.onPrintClick}
            >
              <PrintIcon />
            </Fab>
          )}
          content={() => this.componentRef}
        />
      </div>
    );
  }
}

const condition = authUser => !!authUser;

const RecipePage = compose(
  withStyles(styles),
  withService,
  withAuthorization(condition)
)(Recipe);

export default RecipePage;
