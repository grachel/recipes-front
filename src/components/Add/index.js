import React from "react";
import { compose } from "recompose";
import { withStyles } from "@material-ui/core/styles";

import Paper from '@material-ui/core/Paper';

import { withAuthorization } from "../Session";
import { withService } from "../Service";

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200,
    padding: theme.spacing.unit * 2,
    ali: 'center',
  },
  button: {
    margin: theme.spacing.unit,
    padding: theme.spacing.unit * 2,
    textAlign: 'center',
  },
  input: {
    display: 'none',
  },
  paper: {
    padding: theme.spacing.unit * 2,
    textAlign: 'center',
    color: theme.palette.text.secondary,
    width: '30%',
    display: 'block',
    margin: 'auto',
    marginTop: '5%'
  },
  chip: {
    margin: theme.spacing.unit,
  },
});

export class Add extends React.Component {
  state = {
    
  };

  componentDidMount() {
   
  }

  render() {
    const { classes } = this.props;
    return (
      <div>
        <main className="ui main text container">
        <Paper className={classes.paper}>
        </Paper>
        <Paper className={classes.paper}>
        </Paper>
        </main>
      </div>
    );
  }
}

const condition = authUser => !!authUser;

const AddPage = compose(
  withService,
  withStyles(styles),
  withAuthorization(condition)
)(Add);

export default AddPage;
