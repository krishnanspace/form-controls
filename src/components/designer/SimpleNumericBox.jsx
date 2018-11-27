import React, { Component, PropTypes } from 'react';
import ComponentStore from 'src/helpers/componentStore';

export class SimpleNumericBoxDesigner extends Component {
  getJsonDefinition() {
    return this.props.metadata;
  }

  render() {
    const { lowNormal, hiNormal } = this.props;
    if (SimpleNumericBoxDesigner.getRange(lowNormal, hiNormal) !== '') {
      return (
          <div className="fl">
            <input type="number" />
            <span className="form-builder-valid-range">
              {SimpleNumericBoxDesigner.getRange(lowNormal, hiNormal)}
            </span>
          </div>
      );
    }
    return (
        <div className="fl">
          <input type="number" />
        </div>
    );
  }
}

SimpleNumericBoxDesigner.propTypes = {
  hiAbsolute: PropTypes.number,
  hiNormal: PropTypes.number,
  lowAbsolute: PropTypes.number,
  lowNormal: PropTypes.number,
  metadata: PropTypes.shape({
    displayType: PropTypes.string,
    id: PropTypes.string.isRequired,
    properties: PropTypes.object.isRequired,
    type: PropTypes.string,
  }),
};

SimpleNumericBoxDesigner.getRange = (lowNormal, hiNormal) => {
  if (lowNormal && hiNormal) {
    return `(${lowNormal} - ${hiNormal})`;
  } else if (lowNormal) {
    return `(> ${lowNormal})`;
  } else if (hiNormal) {
    return `(< ${hiNormal})`;
  }
  return '';
};

const descriptor = {
  control: SimpleNumericBoxDesigner,
  designProperties: {
    isTopLevelComponent: false,
  },
  metadata: {
    attributes: [
      {
        name: 'properties',
        dataType: 'complex',
        attributes: [
        ],
      },
    ],
  },
};

ComponentStore.registerDesignerComponent('simpleNumericBox', descriptor);
