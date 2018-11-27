import constants from 'src/constants';
import get from 'lodash/get';
import map from 'lodash/map';
import isUndefined from 'lodash/isUndefined';
import { Error } from 'src/Error';


export class Validator {
  static nonEmpty(value) {
    if (value === undefined || value === null || value.length === 0) {
      return false;
    }
    return true;
  }

  static mandatory(obsValue) {
    if (this.nonEmpty(obsValue)) return undefined;
    return new Error({ message: constants.validations.mandatory });
  }

  static allowDecimal(obsValue) {
    if (isUndefined(obsValue) || obsValue % 1 === 0) return undefined;
    return new Error({ message: constants.validations.allowDecimal });
  }

  static allowRange(value, params) {
    const error = new Error({
      type: constants.errorTypes.warning,
      message: constants.validations.allowRange,
    });
    if (isUndefined(params)) return undefined;
    return Validator.rangeValidation(value, params.minNormal, params.maxNormal) ?
      error : undefined;
  }

  static minMaxRange(value, params) {
    const error = new Error({
      type: constants.errorTypes.error,
      message: constants.validations.minMaxRange,
    });
    if (isUndefined(params)) return undefined;
    return Validator.rangeValidation(value, params.minAbsolute, params.maxAbsolute) ?
      error : undefined;
  }

  static rangeValidation(value, minRange, maxRange) {
    if (isUndefined(value)) return undefined;

    if ((minRange && value < Number.parseFloat(minRange)) ||
      (maxRange && value > Number.parseFloat(maxRange))) {
      return true;
    }
    return undefined;
  }

  static allowFutureDates(obsValue) {
    if (isUndefined(obsValue)) return undefined;
    if (Date.now() < new Date(obsValue).getTime()) {
      return new Error({ message: constants.validations.allowFutureDates });
    }
    return undefined;
  }

  static hyperLinkError(obsValue) {
    if (isUndefined(obsValue)) return undefined;
    var res = obsValue.match(/^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?|^((http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])$/);
    if(res == null) {
      return new Error({ message: constants.validations.hyperLinkError });
    }
      return undefined;
  }

  static getErrors(controlDetails) {
    const { validations, value, params } = controlDetails;
    const errors = map(validations, (propertyName) => {
      const validator = get(this.propertyValidators, propertyName);
      if (validator) return validator(value, params);
      return undefined;
    });

    return errors.filter((error) => error !== undefined);
  }
}

Validator.propertyValidators = {
  [constants.validations.mandatory]:
    (obsVal) => Validator.mandatory(obsVal),
  [constants.validations.allowDecimal]:
      (obsVal) => Validator.allowDecimal(obsVal),
  [constants.validations.allowRange]:
      (obsVal, params) => Validator.allowRange(obsVal, params),
  [constants.validations.minMaxRange]:
    (obsVal, params) => Validator.minMaxRange(obsVal, params),
  [constants.validations.allowFutureDates]:
    (obsValue) => Validator.allowFutureDates(obsValue),
    [constants.validations.hyperLinkError]:
    (obsValue) => Validator.hyperLinkError(obsValue),
};
