import React, { useState, useEffect, useContext } from "react";
import { compose } from "recompose";
import { withStyles } from "@material-ui/core/styles";

import Paper from "@material-ui/core/Paper";
import SearchIcon from "@material-ui/icons/Search";
import InputBase from "@material-ui/core/InputBase";
import { withAuthorization } from "../Session";
import RecipesList from "../RecipesList";
import { ServiceContext } from "../Service";
import { snapshotToArray, anyIncludes } from "../../constants/helper.js";
import { styles } from './styles';

function Home(props) {
  const [recipes, setRecipes] = useState([]);
  const [filteredRecipes, setFilteredRecipes] = useState([]);
  const service = useContext(ServiceContext);
  const { classes } = props;
  
  useEffect(() => {
    const recs = JSON.parse(sessionStorage.getItem("recipes"));
    if(recs){
      setRecipes(recs);
      setFilteredRecipes(recs);
    } else {
      service.recipes().once("value", data => {
        const recipes = snapshotToArray(data);
        setRecipes(recipes);
        setFilteredRecipes(recipes);
        sessionStorage.setItem("recipes", JSON.stringify(recipes))
      });
    }
  }, []);

  function onSearchChange(e){
    const val = e.target.value;
    var filteredRecipesLocal = [];
    if (val.length > 0) {
      const searchText = val.split(",");
      recipes.forEach(function(recipe) {
        if (
          anyIncludes(recipe.desc, searchText) ||
          anyIncludes(recipe.title, searchText)
        ) {
          filteredRecipesLocal.push(recipe);
        }
      });
    } else {
      filteredRecipesLocal = recipes;
    }
    setFilteredRecipes(filteredRecipesLocal);
  };

  return (
    <div>
      <main className="ui main text container">
        <Paper className={classes.search}>
          <div className={classes.searchIcon}>
            <SearchIcon />
          </div>
          <InputBase
            placeholder="Szukaj"
            onChange={onSearchChange}
            classes={{
              root: classes.inputRoot,
              input: classes.inputInput
            }}
          />
        </Paper>
        <RecipesList recipes={filteredRecipes} />
      </main>
    </div>
  );
}

const condition = authUser => !!authUser;

const HomePage = compose(
  withStyles(styles),
  withAuthorization(condition)
)(Home);

export default HomePage;
