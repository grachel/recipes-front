import React from "react";
import { compose } from "recompose";

import { withAuthorization } from "../Session";
import { RecipesList } from "../Recipe";
import { withService } from "../Service";

export class Home extends React.Component {
  state = {
    recipes: []
  };

  componentDidMount() {
    this.props.service.recipes().once("value", data => {
      this.setState({ recipes: data.val() });
    });
  }

  render() {
    return (
      <div>
        <main className="ui main text container">
          <RecipesList recipes={this.state.recipes} />
        </main>
      </div>
    );
  }
}

const condition = authUser => !!authUser;

const HomePage = compose(
  withService,
  withAuthorization(condition)
)(Home);

export default HomePage;
