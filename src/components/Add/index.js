import React from "react";
import { compose } from "recompose";
import { withStyles } from "@material-ui/core/styles";

import Paper from "@material-ui/core/Paper";

import { withAuthorization } from "../Session";
import { withService } from "../Service";

const styles = theme => ({
  root: {
    flexGrow: 1
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
    float: "right"
  },
  uploaderImg: {
    position: 'absolute',
    width: '100%',
    top:-1,
    left:-1,
    zIndex:1,
    border:'none'
  },
  uploader: {
    position: 'relative', 
    overflow: 'auto', 
    width: '100%', 
    height: 650, 
  },
  filePhoto: {
    position: 'absolute',
    width: '100%',
    height: 650,
    top:-50,
    left:0,
    zIndex:2,
    opacity:0,
    cursor: 'pointer'
  },
  centeredText: {
    paddingTop:250
  }
});

export class Add extends React.Component {
  state = {
    image: "",
  };

  componentDidMount() {}

  onDropDownClick = () => {
  };

  onImageChange = e => {
    var reader = new FileReader();
    reader.onload = event => {
      this.setState({ image: event.target.result});
    }
    reader.readAsDataURL(e.target.files[0]);
  };

  render() {
    const { classes } = this.props;
    const { image } = this.state;
    return (
      <div>
        <main className="ui main text container">
          <Paper className={classes.paperLeft}>
            <div className={classes.uploader} onClick={this.onDropDownClick}>
              <p className={classes.centeredText}>Kliknij lub przeciągnij zdjęcie tutaj</p>
              <object className={classes.uploaderImg} data={image} type="image/jpg">Przeciągnij zdjęcie tutaj</object>
              <input className={classes.filePhoto} type="file" name="userprofile_picture" id="filePhoto" onChange={this.onImageChange}/>
            </div>
          </Paper>
          <Paper className={classes.paperRight} />
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
