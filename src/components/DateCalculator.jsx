import React, { Component, PropTypes } from 'react';
import ComponentStore from 'src/helpers/componentStore';
import { Validator } from 'src/helpers/Validator';
import isEmpty from 'lodash/isEmpty';
import classNames from 'classnames';

export class DateCalculator extends Component {

  constructor(props){
    super(props);
    this.DateCalcHandler = this.DateCalcHandler.bind(this);
    this.NumberOfDaysChangeHandler = this.NumberOfDaysChangeHandler.bind(this);
    let dt = new Date();
    const errors = this._getErrors(props.value) || [];
    const hasErrors = this._isCreateByAddMore() ? this._hasErrors(errors) : false;
    this.state = {
        newDate: '',
        numberOfDays: 0,
        hasErrors:''
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

DateCalcHandler (event) {
  let selectedDate = new Date(this.refs.olddate.value);
  let futureDate = new Date(selectedDate.setDate(selectedDate.getDate()+parseInt(this.refs.numberOfDays.value)));
  futureDate = futureDate.getFullYear() + '-' + 
              (("0" + (futureDate.getMonth() + 1)).slice(-2)) + '-' + 
              ("0" + futureDate.getDate()).slice(-2);

  futureDate = (futureDate === '') ? undefined : futureDate;
  const errors = this._getErrors(futureDate);
  this.setState({ hasErrors: this._hasErrors(errors) });
  this.props.onChange(futureDate, errors);
  this.setState({newDate: futureDate});
}; 

NumberOfDaysChangeHandler (event) {
      let numb = parseInt(this.refs.numberOfDays.value);
      this.setState({numberOfDays: numb});
      this.DateCalcHandler();
  
      
}

  render() {
    var inputBoxStyle = {
      width: 50
		}
    const defaultValue = this.props.value || this.state.newDate;
    return (
      <div>
        <input type="date" ref="olddate" disabled={!this.props.enabled} name="olddate" 
        onChange ={this.DateCalcHandler }
        className={classNames({ 'form-builder-error': this.state.hasErrors })}/>
        <input type="number" 
                ref="numberOfDays" name="numberOfDays" 
                placeholder="Enter Number Of Days..."
                disabled={!this.props.enabled}
                value = { this.state.numberOfDays } 
                onChange = { this.NumberOfDaysChangeHandler }
                style = { inputBoxStyle }/>
        <input type="date" ref="newDate" name="newDate" disabled = "true" value = { defaultValue }
         className={classNames({ 'form-builder-error': this.state.hasErrors })}/>
      </div>
    );
  }

}

DateCalculator.propTypes = {
  enabled: PropTypes.bool,
  formFieldPath: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  validate: PropTypes.bool.isRequired,
  validateForm: PropTypes.bool.isRequired,
  validations: PropTypes.array.isRequired,
  value: PropTypes.string,
};

ComponentStore.registerComponent('dateCalculator', DateCalculator);
