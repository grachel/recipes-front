import React from "react";
import { compose } from "recompose";
import { withStyles } from "@material-ui/core/styles";
import { withRouter } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Truncate from "react-truncate";

import * as ROUTES from "../../constants/routes";
import { styles } from "./styles";

function RecipesListBase(props) {
  const { classes } = props;

  function findPaper(t) {
    if (t.tagName === "DIV") {
      return t;
    } else {
      return findPaper(t.parentElement);
    }
  };

  function onClick(e) {
    const paper = findPaper(e.target);
    if (paper) {
      props.history.push(ROUTES.RECIPE + "/" + paper.id);
    }
  };

  return (
    <div>
      <Grid container justify="center" className={classes.root} spacing={8}>
        {props.recipes &&
          props.recipes.map((item, index) => (
            <Paper
              id={item.key}
              key={index}
              className={classes.paper}
              onClick={onClick}
            >
              <span className={classes.title}>{item.title}</span>
              <br />
              <Truncate lines={7} ellipsis={<span>...</span>}>
                {item.desc}
              </Truncate>
            </Paper>
          ))}
      </Grid>
    </div>
  );
}

const RecipesList = compose(
  withStyles(styles),
  withRouter
)(RecipesListBase);

export default RecipesList;
