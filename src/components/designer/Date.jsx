import React, { Component, PropTypes } from 'react';
import ComponentStore from 'src/helpers/componentStore';

export class DateDesigner extends Component {
  getJsonDefinition() {
    return this.props.metadata;
  }

  _getDisplayType(properties) {
    if (properties.dateCalculator) {
      return 'dateCalculator';
    } 
    return 'simpleDate';
  }

  render() {
    const { metadata, metadata: { concept } } = this.props;
    const displayType = this._getDisplayType(metadata.properties);
    const registeredComponent = ComponentStore.getDesignerComponent(displayType);
    if (registeredComponent) {
      return React.createElement(registeredComponent.control, {
        asynchronous: false,
        labelKey: 'name',
        ref: this.storeChildRef,
      });
    }
    return null;
  }
}

DateDesigner.propTypes = {
  metadata: PropTypes.shape({
    concept: PropTypes.object.isRequired,
    displayType: PropTypes.string,
    id: PropTypes.string.isRequired,
    properties: PropTypes.object.isRequired,
    type: PropTypes.string,
  }),
};

const descriptor = {
  control: DateDesigner,
  designProperties: {
    isTopLevelComponent: false,
  },
  metadata: {
    attributes: [
      {
        name: 'properties',
        dataType: 'complex',
        attributes: [
          {
            name: 'allowFutureDates',
            dataType: 'boolean',
            defaultValue: false,
          },
          {
            name: 'dateCalculator',
            dataType: 'boolean',
            defaultValue: false,
          },
        ],
      },
    ],
  },
};

ComponentStore.registerDesignerComponent('date', descriptor);
