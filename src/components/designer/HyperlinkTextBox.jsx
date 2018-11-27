import React, { Component, PropTypes } from 'react';
import ComponentStore from 'src/helpers/componentStore';

export class HyperlinkTextBoxDesigner extends Component {
  getJsonDefinition() {
    return this.props.metadata;
  }

  render() {
    return (
        <div className="obs-comment-section-wrap">
        <input type="url" name="url" id="url"
               placeholder="https://example.com"
               pattern="https://.*" size="50" />
        </div>
    );
  }
}

HyperlinkTextBoxDesigner.propTypes = {
  metadata: PropTypes.shape({
    concept: PropTypes.object.isRequired,
    displayType: PropTypes.string,
    id: PropTypes.string.isRequired,
    properties: PropTypes.object.isRequired,
    type: PropTypes.string,
  }),
};

const descriptor = {
  control: HyperlinkTextBoxDesigner,
  designProperties: {
    isTopLevelComponent: false,
  },
  metadata: {
    attributes: [
    ],
  },
};

ComponentStore.registerDesignerComponent('hyperlinkTextBox', descriptor);
