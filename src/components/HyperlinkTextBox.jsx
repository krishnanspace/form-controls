import React, { Component, PropTypes } from 'react';
import ComponentStore from 'src/helpers/componentStore';
import { Validator } from 'src/helpers/Validator';
import classNames from 'classnames';
import isEmpty from 'lodash/isEmpty';

export class HyperlinkTextBox extends Component {

  constructor(props) {
    super(props);
    const errors = this._getErrors(props.value) || [];
    const hasErrors = this._isCreateByAddMore() ? this._hasErrors(errors) : false;
    this.state = { hasErrors,
                   validURL : false
    };
  }

  _hasErrors(errors) {
    return !isEmpty(errors);
  }

  _getErrors(value) {
    const validations = this.props.validations;
    const controlDetails = { validations, value };
    return Validator.getErrors(controlDetails);
  }

  _isCreateByAddMore() {
    return (this.props.formFieldPath.split('-')[1] !== '0');
  }



 handleChange(e) {
    const value = e.target.value;
    const errors = this._getErrors(value);
    this.setState({ hasErrors: this._hasErrors(errors) });
    this.props.onChange(value, errors);
  }

  render() {
    const defaultValue = this.props.value || '';
    var hidden = {
			display: defaultValue && !this.state.hasErrors ? "block" : "none"
		}
    return (
        <div className="obs-comment-section-wrap">
        <input type="text" name="url" id="url"
               placeholder="https://example.com"
               size="50"
               onChange={(e) => this.handleChange(e)}
               value = { defaultValue }
               className = {classNames({ 'form-builder-error': this.state.hasErrors })}/>
        <a href ={ defaultValue } style = { hidden } target="_blank">Click Here</a>
        
        </div>
    );
  }
}

HyperlinkTextBox.propTypes = {
  enabled: PropTypes.bool,
  formFieldPath: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  validate: PropTypes.bool.isRequired,
  validateForm: PropTypes.bool.isRequired,
  validations: PropTypes.array.isRequired,
  value: PropTypes.string,
};


ComponentStore.registerComponent('hyperlinkTextBox', HyperlinkTextBox);
