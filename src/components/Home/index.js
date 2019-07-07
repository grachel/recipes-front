import React from "react";
import { compose } from "recompose";
import { withStyles } from "@material-ui/core/styles";

import Paper from "@material-ui/core/Paper";
import SearchIcon from "@material-ui/icons/Search";
import InputBase from "@material-ui/core/InputBase";
import { withAuthorization } from "../Session";
import RecipesList from "../RecipesList";
import { withService } from "../Service";
import { snapshotToArray, anyIncludes } from "../../constants/helper.js";

const styles = theme => ({
  search: {
    border: 5,
    position: "relative",
    borderRadius: theme.shape.borderRadius,

    margin: "1%",
    width: "90%%"
  },
  searchIcon: {
    width: theme.spacing.unit * 9,
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  inputRoot: {
    color: "inherit",
    width: "100%",
    borderWidth: 1,
    borderColor: "blue"
  },
  inputInput: {
    paddingTop: theme.spacing.unit,
    paddingRight: theme.spacing.unit,
    paddingBottom: theme.spacing.unit,
    paddingLeft: theme.spacing.unit * 10,
    transition: theme.transitions.create("width"),
    width: "100%"
  }
});

export class Home extends React.Component {
  state = {
    recipes: [],
    filteredRecipes: []
  };

  componentDidMount() {
    this.props.service.recipes().once("value", data => {
      const recipes = snapshotToArray(data);
      this.setState({ recipes: recipes, filteredRecipes: recipes });
    });
  }

  onSearchChange = e => {
    const val = e.target.value;
    var filteredRecipes = [];
    const { recipes } = this.state;
    if (val.length > 0) {
      const searchText = val.split(",");
      recipes.forEach(function(recipe) {
        if (
          anyIncludes(recipe.desc, searchText) ||
          anyIncludes(recipe.title, searchText)
        ) {
          filteredRecipes.push(recipe);
        }
      });
    } else {
      filteredRecipes = recipes;
    }
    this.setState({ filteredRecipes: filteredRecipes });
  };

  render() {
    const { classes } = this.props;

    return (
      <div>
        <main className="ui main text container">
          <Paper className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Szukaj"
              onChange={this.onSearchChange}
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput
              }}
            />
          </Paper>
          <RecipesList recipes={this.state.filteredRecipes} />
        </main>
      </div>
    );
  }
}

const condition = authUser => !!authUser;

const HomePage = compose(
  withStyles(styles),
  withService,
  withAuthorization(condition)
)(Home);

export default HomePage;
