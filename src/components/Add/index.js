import React from "react";
import { compose } from "recompose";

import { withAuthorization } from "../Session";
import { withService } from "../Service";

export class Add extends React.Component {
  state = {
    
  };

  componentDidMount() {
   
  }

  render() {
    return (
      <div>
        <main className="ui main text container">
          add
        </main>
      </div>
    );
  }
}

const condition = authUser => !!authUser;

const AddPage = compose(
  withService,
  withAuthorization(condition)
)(Add);

export default AddPage;
