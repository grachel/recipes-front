import React from 'react';

export class RecipesList extends React.Component {

   render() {
    return (
      <ul>
        {this.props.recipes && this.props.recipes.map((item, index) => (
          <li key={index}>
            <div className="content">
              <h4 className="header">{item.title}</h4>
              <div>{item.desc}</div>             
            </div>
          </li>
        ))}

      </ul>
    );
  }
}