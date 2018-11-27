import React, { Component, PropTypes } from 'react';
import ComponentStore from 'src/helpers/componentStore';
import Textarea from 'react-textarea-autosize';

export class TextBoxDesigner extends Component {
  getJsonDefinition() {
    return this.props.metadata;
  }

  _getDisplayType(properties) {
    if (properties.AcceptHyperlinks) {
      return 'hyperlinkTextBox';
    } 
    return 'simpleTextBox';
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

TextBoxDesigner.propTypes = {
  metadata: PropTypes.shape({
    concept: PropTypes.object.isRequired,
    displayType: PropTypes.string,
    id: PropTypes.string.isRequired,
    properties: PropTypes.object.isRequired,
    type: PropTypes.string,
  }),
};

const descriptor = {
  control: TextBoxDesigner,
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
            name: 'AcceptHyperlinks',
            dataType: 'boolean',
            defaultValue: false,
          },
        ],
      },
    ],
  },
};

ComponentStore.registerDesignerComponent('text', descriptor);
