import React, { Component, PropTypes } from 'react';

export class Comment extends Component {

  constructor(props) {
    super(props);
    this.state = { showCommentSection: false };
  }

  handleChange(e) {
    const value = e.target.value.trim() !== '' ? e.target.value.trim() : undefined;
    this.props.mapper.setComment(value);
  }

  showCommentSection() {
    if (this.state.showCommentSection) {
      const comment = this.props.mapper.getComment();
      return (
        <textarea
          className="obs-comment-section"
          defaultValue={comment}
          maxLength="255"
          onChange={(e) => this.handleChange(e)}
          placeholder="Notes"
        />);
    }
    return null;
  }

  render() {
    return (
      <div>
        <button
          className="comment-toggle fr"
          onClick={() => this.setState({ showCommentSection: !this.state.showCommentSection })}
        >
          <i className="fa fa-file-o">
            <i className="fa fa-plus-circle" />
            <i className="fa fa-minus-circle" />
          </i>
          <i className="fa fa-file-text-o" />
        </button>
        {this.showCommentSection()}
      </div>
    );
  }
}

Comment.propTypes = {
  mapper: PropTypes.object.isRequired,
};
