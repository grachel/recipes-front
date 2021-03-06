import React, { useState, useEffect, useRef, useContext } from "react";
import { compose } from "recompose";
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import TextareaAutosize from "react-autosize-textarea";
import Fab from "@material-ui/core/Fab";
import PrintIcon from "@material-ui/icons/Print";
import ReactToPrint from "react-to-print";

import { withAuthorization } from "../Session";
import { styles } from "./styles";
import { ServiceContext } from "../Service";

function Recipe(props) {
  const printRef = useRef();
  const [recipe, setRecipe] = useState({});
  const service = useContext(ServiceContext)
  const { classes } = props;

  function getRecipeFromStorage(id){
    const recipes = JSON.parse(sessionStorage.getItem("recipes"));
    if(recipes && recipes.length > 0){
      const rec = recipes.find(o => { return o.key === id});
      if(rec){
        return rec;
      }
    }
    return null; 
  }

  useEffect(() => {
    const { id } = props.match.params;  
    const rec = getRecipeFromStorage(id);
    if(rec){
      setRecipe(rec);
    } else {
      service.recipe(id).once("value", data => {
        setRecipe(data.val());
      });
    }
  }, []);

  return (
    <div>
      <Paper className={classes.paper}>
        <div ref={printRef} className={classes.content}>
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
          >
            <PrintIcon />
          </Fab>
        )}
        content={() => printRef.current}
      />
    </div>
  );
}

const condition = authUser => !!authUser;

const RecipePage = compose(
  withStyles(styles),
  withAuthorization(condition)
)(Recipe);

export default RecipePage;
