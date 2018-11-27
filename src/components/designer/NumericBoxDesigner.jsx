import React, { Component, PropTypes } from 'react';
import ComponentStore from 'src/helpers/componentStore';

export class NumericBoxDesigner extends Component {
  getJsonDefinition() {
    return this.props.metadata;
  }

  _getDisplayType(properties) {
    if (properties.rangeSlider) {
      return 'rangeSlider';
    } 
    return 'simpleNumericBox';
  }

  render() {
    //const { lowNormal, hiNormal } = this.props;
    console.log(JSON.stringify(this.props));
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

NumericBoxDesigner.propTypes = {
  metadata: PropTypes.shape({
    concept: PropTypes.object.isRequired,
    displayType: PropTypes.string,
    id: PropTypes.string.isRequired,
    properties: PropTypes.object.isRequired,
    type: PropTypes.string,
  }),
};

const descriptor = {
  control: NumericBoxDesigner,
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
            name: 'rangeSlider',
            dataType: 'boolean',
            defaultValue: false,
          },
          {
            name: 'abnormal',
            dataType: 'boolean',
            defaultValue: false,
          },
        ],
      },
    ],
  },
};

ComponentStore.registerDesignerComponent('numeric', descriptor);
