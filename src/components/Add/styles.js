export const styles = theme => ({
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