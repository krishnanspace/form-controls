import React, { PureComponent } from 'react';
import ComponentStore from 'src/helpers/componentStore';

export class RangeSliderDesigner extends PureComponent {

  getJsonDefinition() {
    return this.props.metadata;
  }

  render() {
    return (
      <div>
        <input type="range" min="1" max="100" value="50"  id="myRange"/>
      </div>
    );
  }

}


const descriptor = {
  control: RangeSliderDesigner,
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


ComponentStore.registerDesignerComponent('rangeSlider', descriptor);
