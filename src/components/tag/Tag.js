import React, { useContext, useState } from 'react';

import {
  Button,
  TagArea,
  TagLine,
  TagButton,
  TagButtonsArea,
  TagNewLine,
  InputText
} from './Style';
import Icon from '../common/Icon';
import { AuthContext, TagContext } from '../context/';

export const Tag = props => {
  const { tags, setTags } = useContext(TagContext);
  const [editTag, setEditTag] = useState(null);
  const [editTagText, setEditTagText] = useState(null);
  const [showNewTag, setShowNewTag] = useState('');
  const [newTag, setNewTag] = useState('');
  const authContext = useContext(AuthContext);

  const handleInputChange = e => {
    if (e.target.name === 'newTag') {
      setNewTag(e.target.value);
    }
    if (e.target.name === 'editTagText') {
      setEditTagText(e.target.value);
    }
  };

  return (
    <TagArea>
      {tags &&
        tags.map(tag => (
          <TagLine key={tag.id}>
            {editTag && editTag.id === tag.id ? (
              <InputText
                type="text"
                id="editTagText"
                name="editTagText"
                value={editTagText}
                onChange={handleInputChange}
              />
            ) : (
              <button
                className={tag.selected ? 'selected' : 'noSelected'}
                onClick={() => {
                  const updateTags = tags.map(item => {
                    if (item.id === tag.id) {
                      item.selected = !tag.selected;
                    }
                    return item;
                  });
                  setTags(updateTags);
                }}
              >
                {tag.name}
              </button>
            )}
            {authContext.isAuthenticated() && (
              <React.Fragment>
                {editTag && editTag.id === tag.id ? (
                  <TagButtonsArea>
                    <TagButton
                      onClick={() => {
                        const updateTags = tags.map(item => {
                          if (item.id === editTag.id) {
                            item.name = editTagText;
                          }
                          return item;
                        });
                        setTags(updateTags);
                        setEditTag();
                      }}
                    >
                      <Icon icon="faSave" />
                    </TagButton>
                    <TagButton
                      onClick={() => {
                        setEditTag();
                      }}
                    >
                      <Icon icon="faTimes" />
                    </TagButton>
                  </TagButtonsArea>
                ) : (
                  !editTag && (
                    <TagButtonsArea>
                      <TagButton
                        onClick={() => {
                          setEditTagText(tag.name);
                          setEditTag(tag);
                        }}
                      >
                        <Icon icon="faEdit" />
                      </TagButton>
                      <TagButton
                        onClick={() => {
                          const updateTags = tags.filter(item => {
                            return item.id !== tag.id;
                          });
                          setTags(updateTags);
                        }}
                      >
                        <Icon icon="faTrash" />
                      </TagButton>
                    </TagButtonsArea>
                  )
                )}
              </React.Fragment>
            )}
          </TagLine>
        ))}
      {showNewTag ? (
        <TagLine>
          <InputText
            type="text"
            id="newTag"
            name="newTag"
            placeholder="New tag"
            value={newTag}
            onChange={handleInputChange}
          />
          <TagButtonsArea>
            <TagButton
              onClick={() => {
                const updateTags = [...tags];
                updateTags.push({
                  id: tags.length + 1,
                  name: newTag,
                  selected: false
                });
                setNewTag('');
                setTags(updateTags);
                setShowNewTag(false);
              }}
            >
              <Icon icon="faSave" />
            </TagButton>
            <TagButton
              onClick={() => {
                setShowNewTag(false);
              }}
            >
              <Icon icon="faTimes" />
            </TagButton>
          </TagButtonsArea>
        </TagLine>
      ) : (
        authContext.isAuthenticated() && (
          <TagNewLine>
            <Button
              fontSize="0.8rem"
              onClick={() => {
                setShowNewTag(true);
              }}
            >
              <Icon icon="faPlus" /> New Category
            </Button>
          </TagNewLine>
        )
      )}
    </TagArea>
  );
};

export default Tag;
