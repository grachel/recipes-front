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

import * as ROUTES from "../../constants/routes";
import { withService } from "../Service";
import { snapshotToArray } from "../../constants/helper.js";

const styles = theme => ({
  root: {
    flexGrow: 1,
    width: "80%",
    marginLeft:"10%"
  },
});

export class PhotoBase extends React.Component {
  constructor(props) {
    super(props);

    this.state = { images: [] };
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
                <ListItemText primary={item.name} secondary={item.date} />
              </ListItem>
            ))}
        </List>
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
