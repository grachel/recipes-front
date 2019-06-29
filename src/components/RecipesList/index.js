import React from "react";
import { compose } from "recompose";
import { withStyles } from "@material-ui/core/styles";
import { withRouter } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Truncate from "react-truncate";

import * as ROUTES from "../../constants/routes";

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
    cursor: 'pointer'
  },
  title: {
    display: "block",
    fontWeight: "bold"
  }
});

export class RecipesListBase extends React.Component {

  findPaper = t => {
    if(t.tagName === "DIV"){
      return t;
    } else {
      return this.findPaper(t.parentElement)
    }
  }

  onClick = e => {

    const paper = this.findPaper(e.target);
    if (paper) {
      this.props.history.push(ROUTES.RECIPE + "/" + paper.id);
    }
  };

  render() {
    const { classes } = this.props;

    return (
      <Grid container justify="center" className={classes.root} spacing={8}>
        {this.props.recipes &&
          this.props.recipes.map((item, index) => (
            <Paper
              id={item.key}
              key={index}
              className={classes.paper}
              onClick={this.onClick}
            >
              <span className={classes.title}>{item.title}</span>
              <br />
              <Truncate lines={7} ellipsis={<span>...</span>}>
                {item.desc}
              </Truncate>
            </Paper>
          ))}
      </Grid>
    );
  }
}

const RecipesList = compose(
  withStyles(styles),
  withRouter
)(RecipesListBase);

export default RecipesList;
