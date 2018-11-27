import React, { Component, PropTypes } from 'react';
import ComponentStore from 'src/helpers/componentStore';
import Textarea from 'react-textarea-autosize';

export class SimpleTextBoxDesigner extends Component {
  getJsonDefinition() {
    return this.props.metadata;
  }

  render() {
    return (
        <div className="obs-comment-section-wrap">
        <Textarea />
        </div>
    );
  }
}

SimpleTextBoxDesigner.propTypes = {
  metadata: PropTypes.shape({
    concept: PropTypes.object.isRequired,
    displayType: PropTypes.string,
    id: PropTypes.string.isRequired,
    properties: PropTypes.object.isRequired,
    type: PropTypes.string,
  }),
};

const descriptor = {
  control: SimpleTextBoxDesigner,
  designProperties: {
    isTopLevelComponent: false,
  },
  metadata: {
    attributes: [
    ],
  },
};

ComponentStore.registerDesignerComponent('simpleTextBox', descriptor);
