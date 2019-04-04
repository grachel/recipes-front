import React from 'react';

export class RecipesList extends React.Component {

  render() {
    return (
      <ul>
        {this.props.recipes && this.props.recipes.map((item, index) => (
          <li key={index}>
            <div className="content">
              <h4 className="header">{item.name}</h4>
              <div>{item.desc}</div>
              <ul>
                {item.ingredients && item.ingredients.map((ingredient, index) => (
                  <li key={index}>
                    <div className="ingredient">
                    <h5>{ingredient}</h5>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </li>
        ))}

      </ul>
    );
  }
}