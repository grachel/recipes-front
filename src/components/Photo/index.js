import React from "react";
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
import { withService } from "../Service";
import { snapshotToArray } from "../../constants/helper.js";

const styles = theme => ({
  root: {
    flexGrow: 1,
    width: "80%",
    marginLeft:"10%"
  },
  fab: {
    position: "absolute",
    bottom: 50,
    right: 50
  }
});

export class PhotoBase extends React.Component {
  constructor(props) {
    super(props);
    this.state = { images: [], inputValue: null };

    this.fileSelector = document.createElement('input');
    this.fileSelector.setAttribute('type', 'file');
    this.fileSelector.setAttribute('multiple', 'multiple');
    this.fileSelector.setAttribute('accept', 'image/png, image/jpeg'); 
    this.fileSelector.onchange = this.onFileChange;
    this.fileSelector.value = this.state.inputValue;
  }

  componentDidMount() {
    this.props.service.images().once("value", data => {
      const images = snapshotToArray(data);
      this.setState({ images: images });
    });
  }

  findParent = t => {
    if (t.getAttribute("role") === "button") {
      return t;
    } else {
      return this.findParent(t.parentElement);
    }
  };
 
  onFileChange = e => {    
    Array.from(this.fileSelector.files).forEach(file => {
      this.props.service.storage.ref(file.name).put(file);
      const uid = this.props.service.images().push().key;
      this.props.service.image(uid).set({
        name: file.name,
        date: file.lastModified
      });   
    });
  };

  onAddClick = e => {
    this.fileSelector.click();
  };

  onClick = e => {
    const name = this.findParent(e.target).getAttribute("value");
    if (name) {
      this.props.history.push({
        pathname: ROUTES.ADD,
        state: { name: name }
      });
    }
  };

  render() {
    const { classes } = this.props;
    const { images } = this.state;

    return (
      <div>
        <List className={classes.root}>
          {images &&
            images.map((item, index) => (
              <ListItem button onClick={this.onClick} value={item.name}>
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
              onClick={this.onAddClick}
            >
              <AddIcon />
            </Fab>
      </div>
    );
  }
}

const Photo = compose(
  withStyles(styles),
  withService,
  withRouter
)(PhotoBase);

export default Photo;
