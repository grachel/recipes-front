import React from "react";
import { compose } from "recompose";
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import TextareaAutosize from "react-autosize-textarea";

import { withAuthorization } from "../Session";
import { withService } from "../Service";

const styles = theme => ({
  root: {
    flexGrow: 1
  },
  paper: {
    marginTop: "3%",
    marginLeft: "8%",
    width: "80%",
    padding: "2%"
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

  onClick = () => {};

  render() {
    const { classes } = this.props;
    const { recipe } = this.state;
    return (
      <Paper className={classes.paper}>
        <span className={classes.title}>{recipe.title}</span>
        <TextareaAutosize className={classes.textField} value={recipe.desc} />
      </Paper>
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
