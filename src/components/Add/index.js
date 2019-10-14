import React, { useState, useEffect, useContext } from "react";
import { compose } from "recompose";
import { withRouter } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";

import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import * as ROUTES from "../../constants/routes";

import { withAuthorization } from "../Session";
import { styles } from "./styles";
import { ServiceContext } from "../Service";

function Add(props) {
  const [image, setImage] = useState('');
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const service = useContext(ServiceContext)
  const { classes } = props;

  useEffect(() => {
    if (props.location && props.location.state) {
      const img = props.location.state.name;
      if (img) {
        service.storage
          .ref(img)
          .getDownloadURL()
          .then(url => {
            setImage(url);
          });
      }
    }
  });

  function onAddClick() {
    if (title && desc) {
      const uid = service.recipes().push().key;

      service.recipe(uid).set({
        title,
        desc
      });

      removePhotoFromList();

      props.history.push(ROUTES.HOME);
    }
  };

  function removePhotoFromList() {
    if (props.location && props.location.state) {
      const img = props.location.state.name;
      const id = props.location.state.imageID;
      if (img && id) {
        service.image(id).remove();

        service.storage
          .ref(img)
          .delete();
      }
    }
  }

  function onImageChange(e) {
    var reader = new FileReader();
    reader.onload = event => {
      setImage(event.target.result);
    };
    reader.readAsDataURL(e.target.files[0]);
  };

  return (
    <div>
      <main>
        <Paper className={classes.paperLeft}>
          <div className={classes.uploader}>
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
              onChange={onImageChange}
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
            onChange={ev => setTitle(ev.target.value)}
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
            onChange={ev => setDesc(ev.target.value)}
            margin="normal"
            value={desc}
          />
          <Fab
            color="primary"
            aria-label="Add"
            className={classes.fab}
            onClick={onAddClick}
          >
            <AddIcon />
          </Fab>
        </Paper>
      </main>
    </div>
  );
}

const condition = authUser => !!authUser;

const AddPage = compose(
  withRouter,
  withStyles(styles),
  withAuthorization(condition)
)(Add);

export default AddPage;
