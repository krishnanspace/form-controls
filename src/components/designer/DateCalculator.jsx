import React, { PureComponent } from 'react';
import ComponentStore from 'src/helpers/componentStore';

export class DateCalculatorDesigner extends PureComponent {

  getJsonDefinition() {
    return this.props.metadata;
  }

  render() {
    return (
      <div>
        <input type="number" 
                ref="numberOfDays" name="numberOfDays" 
                placeholder="Enter Number Of Days..."/>
        <input type="date" ref="olddate" name="olddate"/>
        <input type="date" ref="newDate" name="newDate" disabled = "true"/>
      </div>
    );
  }

}


const descriptor = {
  control: DateCalculatorDesigner,
  designProperties: {
    isTopLevelComponent: false,
  },
  metadata: {
    attributes: [
      {
        name: 'properties',
        dataType: 'complex',
        attributes: [],
      },     
    ]
  },
};


ComponentStore.registerDesignerComponent('dateCalculator', descriptor);
