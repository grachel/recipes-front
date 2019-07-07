import React from "react";
import { compose } from "recompose";
import { withRouter } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";

import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import * as ROUTES from "../../constants/routes";

import { withAuthorization } from "../Session";
import { withService } from "../Service";

const styles = theme => ({
  root: {
    flexGrow: 1
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: "95%",
    padding: theme.spacing.unit * 2,
    ali: "center"
  },
  paperLeft: {
    padding: theme.spacing.unit * 2,
    textAlign: "center",
    verticalAlign: "middle",
    color: theme.palette.text.secondary,
    width: "42%",
    height: 650,
    display: "inlineBlock",
    margin: "auto",
    marginTop: "3%",
    marginLeft: "3%",
    float: "left"
  },
  paperRight: {
    padding: theme.spacing.unit * 2,
    textAlign: "center",
    color: theme.palette.text.secondary,
    width: "42%",
    height: 650,
    display: "inlineBlock",
    margin: "auto",
    marginTop: "3%",
    marginRight: "3%",
    float: "right",
    position: "relative"
  },
  uploaderImg: {
    position: "absolute",
    width: "100%",
    top: -1,
    left: -1,
    zIndex: 1,
    border: "none"
  },
  uploader: {
    position: "relative",
    overflow: "auto",
    width: "100%",
    height: 650
  },
  filePhoto: {
    position: "absolute",
    width: "100%",
    height: 650,
    top: -50,
    left: 0,
    zIndex: 2,
    opacity: 0,
    cursor: "pointer"
  },
  centeredText: {
    paddingTop: 250
  },
  fab: {
    position: "absolute",
    bottom: 20,
    right: 20
  }
});

export class Add extends React.Component {
  state = {
    image: "",
    title: "",
    desc: ""
  };

  componentDidMount() {
    if (this.props.location && this.props.location.state) {
      const img = this.props.location.state.name;
      if (img) {
        this.props.service.storage
          .ref(img)
          .getDownloadURL()
          .then(url => {
            this.setState({ image: url });
          });
      }
    }
  }

  onAddClick = () => {
    const { title, desc } = this.state;
    const uid = this.props.service.recipes().push().key;

    this.props.service.recipe(uid).set({
      title,
      desc
    });
    this.props.history.push(ROUTES.HOME);
  };

  onImageChange = e => {
    var reader = new FileReader();
    reader.onload = event => {
      this.setState({ image: event.target.result });
    };
    reader.readAsDataURL(e.target.files[0]);
  };

  onTextChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const { classes } = this.props;
    const { image, title, desc } = this.state;
    return (
      <div>
        <main>
          <Paper className={classes.paperLeft}>
            <div className={classes.uploader} onClick={this.onDropDownClick}>
              <p className={classes.centeredText}>
                Kliknij lub przeciągnij zdjęcie tutaj
              </p>
              <object
                className={classes.uploaderImg}
                data={image}
                type="image/jpg"
              >
                Przeciągnij zdjęcie tutaj
              </object>
              <input
                className={classes.filePhoto}
                type="file"
                name="userprofile_picture"
                id="filePhoto"
                onChange={this.onImageChange}
              />
            </div>
          </Paper>
          <Paper className={classes.paperRight}>
            <TextField
              id="standard-input"
              label="Nazwa"
              name="title"
              className={classes.textField}
              type="input"
              onChange={this.onTextChange}
              margin="normal"
              value={title}
            />
            <TextField
              id="standard-textarea"
              label="Przepis"
              name="desc"
              multiline
              rowsMax="22"
              className={classes.textField}
              onChange={this.onTextChange}
              margin="normal"
              value={desc}
            />
            <Fab
              color="primary"
              aria-label="Add"
              className={classes.fab}
              onClick={this.onAddClick}
            >
              <AddIcon />
            </Fab>
          </Paper>
        </main>
      </div>
    );
  }
}

const condition = authUser => !!authUser;

const AddPage = compose(
  withRouter,
  withService,
  withStyles(styles),
  withAuthorization(condition)
)(Add);

export default AddPage;
