import React, { useState, useEffect, useContext } from "react";
import { compose } from "recompose";
import { withStyles } from "@material-ui/core/styles";
import { withRouter } from "react-router-dom";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import ImageIcon from "@material-ui/icons/Image";
import ListItemText from "@material-ui/core/ListItemText";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";

import * as ROUTES from "../../constants/routes";
import { ServiceContext } from "../Service";
import { snapshotToArray } from "../../constants/helper.js";
import { styles } from "./styles";

function PhotoBase(props) {
  const [images, setImages] = useState([]);
  const service = useContext(ServiceContext)
  const { classes } = props;

  const fileSelector = document.createElement('input');
  fileSelector.setAttribute('type', 'file');
  fileSelector.setAttribute('multiple', 'multiple');
  fileSelector.setAttribute('accept', 'image/png, image/jpeg');
  fileSelector.onchange = onFileChange;

  useEffect(() => {
    service.images().once("value", data => {
      const images = snapshotToArray(data);
      setImages(images);
    });
  }, [])


  function findParent(t) {
    if (t.getAttribute("role") === "button") {
      return t;
    } else {
      return findParent(t.parentElement);
    }
  };

  function onFileChange(e) {
    const newImages = [...images];
    Array.from(fileSelector.files).forEach(file => {
      service.storage.ref(file.name).put(file);
      const uid = service.images().push().key;
      service.image(uid).set({
        name: file.name,
        date: file.lastModified
      });
      newImages.push({ key: uid, name: file.name, date: file.lastModified })
      console.log(newImages)
    });
    setImages(newImages);
  };

  function onAddClick(e) {
    fileSelector.click();
  };

  function onClick(e) {
    const parent = findParent(e.target);
    const name = parent.getAttribute("value");
    const uid = parent.getAttribute("data-uid");
    if (name && uid) {
      props.history.push({
        pathname: ROUTES.ADD,
        state: { name: name, imageID: uid }
      });
    }
  };

  return (
    <div>
      <List className={classes.root}>
        {images &&
          images.map((item, index) => (
            <ListItem key={index} button onClick={onClick} value={item.name} data-uid={item.key}>
              <ListItemAvatar>
                <Avatar>
                  <ImageIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary={item.name} secondary={new Date(item.date).toLocaleString()} />
            </ListItem>
          ))}
      </List>
      <Fab
        color="primary"
        aria-label="Add"
        className={classes.fab}
        onClick={onAddClick}
      >
        <AddIcon />
      </Fab>
    </div>
  );
}

const Photo = compose(
  withStyles(styles),
  withRouter
)(PhotoBase);

export default Photo;
