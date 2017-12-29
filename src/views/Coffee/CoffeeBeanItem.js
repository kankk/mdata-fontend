import React, { Component } from 'react';
import './CoffeeBeanItem.less';

class CoffeeBeanItem extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  handleSectionClick = () => {
    this.props.onClick();
  }

  render() {
    const { coffeebean } = this.props;
    return (
      <section className="coffee-bean-item list-item" onClick={this.handleSectionClick}>
        { coffeebean.name_cn } - { coffeebean.name_en }
      </section>
    );
  }
}

export default CoffeeBeanItem;