import React from "react";
import { compose } from "recompose";
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Truncate from "react-truncate";

import { withAuthorization } from "../Session";
import { withService } from "../Service";

const styles = theme => ({
  root: {
    flexGrow: 1
  },
  paper: {
    margin: "1%",
    height: 250,
    width: 250,
    padding: 10,
    overflow: "hidden",
    cursor: "pointer"
  },
  title: {
    display: "block",
    fontWeight: "bold"
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
        <Paper className={classes.paper} onClick={this.onClick}>
        <span className={classes.title}>{recipe.title}</span>
        <br />
        <Truncate lines={7} ellipsis={<span>...</span>}>
          {recipe.desc}
        </Truncate>
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
