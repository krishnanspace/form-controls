import React, { Component, PropTypes } from 'react';
import ComponentStore from 'src/helpers/componentStore';

export class SimpleDateDesigner extends Component {
  getJsonDefinition() {
    return this.props.metadata;
  }


  render() {
    return (<input type="date" />);
  }
}

SimpleDateDesigner.propTypes = {
  metadata: PropTypes.shape({
    concept: PropTypes.object.isRequired,
    displayType: PropTypes.string,
    id: PropTypes.string.isRequired,
    properties: PropTypes.object.isRequired,
    type: PropTypes.string,
  }),
};

const descriptor = {
  control: SimpleDateDesigner,
  designProperties: {
    isTopLevelComponent: false,
  },
  metadata: {
    attributes: [
    ],
  },
};

ComponentStore.registerDesignerComponent('simpleDate', descriptor);
