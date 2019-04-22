import React, { Component } from 'react';
import {
  EditorState,
  RichUtils,
  convertToRaw,
  convertFromRaw,
  AtomicBlockUtils
} from 'draft-js';
import Editor from 'draft-js-plugins-editor';
import styled from 'styled-components';

import addLinkPlugin from './plugins/addLinkPlugin';
import { mediaBlockRenderer } from './plugins/mediaBlockRenderer';

import Icon from '../common/Icon';

const EditorArea = styled.div`
  background-color: white;
  border: 0.1rem solid #ddd;
  font-size: 1rem;
  padding: 1rem;

  .activeButton {
    color: rgb(161, 207, 90);
  }
`;

const EditorControlsBar = styled.div`
  display: inline-grid;
  grid-template-columns: auto auto auto auto auto;
`;

const EditorSeparator = styled.div`
  margin-right: 0.5rem;
  border-left: 0.1rem solid #ddd;
  align-content: center;
`;

const EditorControls = styled.div`
  font-size: 1rem;
  user-select: none;
`;

const EditorButton = styled.span`
  color: #999;
  cursor: pointer;
  margin-right: 0.5rem;
  padding: 0.2rem;
  display: inline-block;
  border: 0.1rem solid transparent;
  transition: border 0.5s, color 0.5s;
  &:hover,
  &:focus {
    color: white;
    background-color: rgb(161, 207, 90);
    border: 0.1rem solid rgb(161, 207, 90);
  }
`;

const EditorTextArea = styled.div`
  border-top: 0.1rem solid #ddd;
  cursor: text;
  font-size: 1rem;
  margin-top: 1rem;
  padding: 0.5rem;

  .public-DraftEditorPlaceholder-root,
  .public-DraftEditor-content {
    margin: 0 -1rem -1rem;
    padding: 1rem;
  }

  .public-DraftEditor-content {
    min-height: 10rem;
  }
  .public-DraftStyleDefault-pre {
    background-color: rgba(0, 0, 0, 0.05);
    font-size: 1rem;
    padding: 1rem;
  }
`;

export default class TextEditor extends Component {
  constructor(props) {
    super(props);
    if (this.props.editorState) {
      this.state = {
        editorState: EditorState.createWithContent(
          convertFromRaw(this.props.editorState)
        )
      };
    } else {
      this.state = { editorState: EditorState.createEmpty() };
    }

    this.focus = () => this.refs.editor.focus();
    this.onChange = editorState => this._onChange(editorState);

    this.handleKeyCommand = command => this._handleKeyCommand(command);
    this.onTab = e => this._onTab(e);
    this.toggleBlockType = type => this._toggleBlockType(type);
    this.toggleInlineStyle = style => this._toggleInlineStyle(style);
    this.onAddLink = () => this._onAddLink();
    this.bonAddImage = () => this._onAddImage();
    this.plugins = [addLinkPlugin];
  }

  _onAddImage = e => {
    e.preventDefault();
    const editorState = this.state.editorState;
    const urlValue = window.prompt('Paste Image Link');
    const contentState = editorState.getCurrentContent();
    const contentStateWithEntity = contentState.createEntity(
      'image',
      'IMMUTABLE',
      { src: urlValue }
    );
    const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
    const newEditorState = EditorState.set(
      editorState,
      { currentContent: contentStateWithEntity },
      'create-entity'
    );
    this.setState(
      {
        editorState: AtomicBlockUtils.insertAtomicBlock(
          newEditorState,
          entityKey,
          ' '
        )
      },
      () => {
        setTimeout(() => this.focus(), 0);
      }
    );
  };
  _onAddLink = () => {
    const editorState = this.state.editorState;
    const selection = editorState.getSelection();
    const link = window.prompt('Paste the link -');
    if (!link) {
      this.onChange(RichUtils.toggleLink(editorState, selection, null));
      return 'handled';
    }
    const content = editorState.getCurrentContent();
    const contentWithEntity = content.createEntity('LINK', 'MUTABLE', {
      url: link
    });
    const newEditorState = EditorState.push(
      editorState,
      contentWithEntity,
      'create-entity'
    );
    const entityKey = contentWithEntity.getLastCreatedEntityKey();
    this.onChange(RichUtils.toggleLink(newEditorState, selection, entityKey));
    return 'handled';
  };

  _onChange = editorState => {
    this.setState({ editorState });
    const contentState = JSON.stringify(
      convertToRaw(editorState.getCurrentContent())
    );
    if (!this.props.readOnly) this.props.sendText(contentState);
  };

  _handleKeyCommand(command) {
    const { editorState } = this.state;
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      this.onChange(newState);
      return true;
    }
    return false;
  }

  _onTab(e) {
    const maxDepth = 4;
    this.onChange(RichUtils.onTab(e, this.state.editorState, maxDepth));
  }

  _toggleBlockType(blockType) {
    this.onChange(RichUtils.toggleBlockType(this.state.editorState, blockType));
  }

  _toggleInlineStyle(inlineStyle) {
    this.onChange(
      RichUtils.toggleInlineStyle(this.state.editorState, inlineStyle)
    );
  }

  render() {
    const { editorState } = this.state;
    return (
      <React.Fragment>
        {!this.props.readOnly && (
          <EditorArea>
            <EditorControlsBar>
              <BlockStyleControls
                editorState={editorState}
                onToggle={this.toggleBlockType}
              />
              <EditorSeparator />
              <InlineStyleControls
                editorState={editorState}
                onToggle={this.toggleInlineStyle}
              />
              <EditorSeparator />
              <EditorControls>
                <EditorButton id="link_url" onClick={this._onAddLink}>
                  <Icon icon="faLink" />
                </EditorButton>
                <EditorButton onClick={this._onAddImage}>
                  <Icon icon="faImage" />
                </EditorButton>
              </EditorControls>
            </EditorControlsBar>

            <EditorTextArea onClick={this.focus}>
              <Editor
                blockRendererFn={mediaBlockRenderer}
                editorState={editorState}
                handleKeyCommand={this.handleKeyCommand}
                onChange={this.onChange}
                onTab={this.onTab}
                ref="editor"
                spellCheck={true}
                plugins={this.plugins}
                readOnly={this.props.readOnly}
              />
            </EditorTextArea>
          </EditorArea>
        )}
        {this.props.readOnly && (
          <Editor
            blockRendererFn={mediaBlockRenderer}
            editorState={editorState}
            handleKeyCommand={this.handleKeyCommand}
            onChange={this.onChange}
            onTab={this.onTab}
            ref="editor"
            spellCheck={true}
            plugins={this.plugins}
            readOnly={this.props.readOnly}
          />
        )}
      </React.Fragment>
    );
  }
}

class StyleButton extends React.Component {
  constructor() {
    super();
    this.onToggle = e => {
      e.preventDefault();
      this.props.onToggle(this.props.style);
    };
  }

  render() {
    let className = '';
    if (this.props.active) {
      className += 'activeButton';
    }

    return (
      <EditorButton className={className} onMouseDown={this.onToggle}>
        {this.props.label === 'Bold' ? (
          <Icon icon="faBold" />
        ) : this.props.label === 'Italic' ? (
          <Icon icon="faItalic" />
        ) : this.props.label === 'Underline' ? (
          <Icon icon="faUnderline" />
        ) : this.props.label === 'OL' ? (
          <Icon icon="faListOl" />
        ) : this.props.label === 'H2' ? (
          <Icon icon="faHeading" />
        ) : this.props.label === 'UL' ? (
          <Icon icon="faListUl" />
        ) : (
          this.props.label
        )}
      </EditorButton>
    );
  }
}

const BLOCK_TYPES = [
  // { label: 'H1', style: 'header-one' },
  { label: 'H2', style: 'header-two' },
  // { label: 'H3', style: 'header-three' },
  // { label: 'H4', style: 'header-four' },
  // { label: 'H5', style: 'header-five' },
  // { label: 'H6', style: 'header-six' },
  // { label: 'Blockquote', style: 'blockquote' },
  { label: 'UL', style: 'unordered-list-item' },
  { label: 'OL', style: 'ordered-list-item' }
  // { label: 'Code Block', style: 'code-block' }
];

const BlockStyleControls = props => {
  const { editorState } = props;
  const selection = editorState.getSelection();
  const blockType = editorState
    .getCurrentContent()
    .getBlockForKey(selection.getStartKey())
    .getType();

  return (
    <EditorControls>
      {BLOCK_TYPES.map(type => (
        <StyleButton
          key={type.label}
          active={type.style === blockType}
          label={type.label}
          onToggle={props.onToggle}
          style={type.style}
        />
      ))}
    </EditorControls>
  );
};

var INLINE_STYLES = [
  { label: 'Bold', style: 'BOLD' },
  { label: 'Italic', style: 'ITALIC' },
  { label: 'Underline', style: 'UNDERLINE' }
];

const InlineStyleControls = props => {
  var currentStyle = props.editorState.getCurrentInlineStyle();
  return (
    <EditorControls>
      {INLINE_STYLES.map(type => (
        <StyleButton
          key={type.label}
          active={currentStyle.has(type.style)}
          label={type.label}
          onToggle={props.onToggle}
          style={type.style}
        />
      ))}
    </EditorControls>
  );
};
