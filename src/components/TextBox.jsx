import React, { Component, PropTypes } from 'react';
import ComponentStore from 'src/helpers/componentStore';

export class TextBox extends Component {

  constructor(props) {
    super(props);
  }

  _getDisplayType(properties) {
    if (properties.AcceptHyperlinks) {
      return 'hyperlinkTextBox';
    } 
    return 'simpleTextBox';
  }

  render() {
    const { properties, formFieldPath, enabled } = this.props;
    const displayType = this._getDisplayType(properties);
    const registeredComponent = ComponentStore.getRegisteredComponent(displayType);
    if (registeredComponent) {
      return React.createElement(registeredComponent, {
        formFieldPath: formFieldPath,
        enabled: enabled,
        onChange: this.props.onChange,
        value: this.props.value,
        validate: this.props.validate,
        validateForm: this.props.validateForm,
        validations: this.props.validations,
      });
    }
    return null;
  }
}

TextBox.propTypes = {
  enabled: PropTypes.bool,
  formFieldPath: PropTypes.string,
  properties: PropTypes.object.isRequired,
  value: PropTypes.string,
  validate: PropTypes.bool.isRequired,
  validateForm: PropTypes.bool.isRequired,
  validations: PropTypes.array.isRequired,
};

ComponentStore.registerComponent('text', TextBox);
