import React from 'react';
import { NavLink as Link } from 'react-router-dom';

import {
  Card,
  CardArea,
  CardPost,
  CardPostBar,
  CardPostContent,
  CardSeparator,
  Button
} from '../css/Common.Style';
import Icon from './common/Icon';

export const CardMuseum = ({ museum }) => {
  return (
    <CardArea>
      <h3>
        <a href={museum.url} target="_blank" rel="noopener noreferrer">
          {museum.name}
        </a>
      </h3>
      <Link to={`/museum/${museum.slug}`}>more info</Link>
      <p>{museum.university}</p>
      <p>{museum.phone}</p>
      <p>{museum.mail}</p>
      <p>{museum.location.address1}</p>
      <p>{museum.location.address2}</p>
      <p>{museum.location.city}</p>
      <p>{museum.location.zip}</p>
      <p>{museum.location.state}</p>
      <p>{museum.location.country}</p>
    </CardArea>
  );
};

export const CardBlog = props => {
  const post = props.post;
  
  return (
    <Card>
      <CardPost>
        <CardPostBar>
          <Link className="link" to={`/post/${post.slug}`}>
            <Icon icon="faEdit" />
          </Link>
          <Button onClick={() => props.delete(post._id, post.title)}>
            <Icon icon="faTrash" />
          </Button>
        </CardPostBar>
        <CardPostContent>
          {post.coverPhoto && (
            <React.Fragment>
              <br />
              <img width="100%" src={post.coverPhoto} alt="Upload Preview" />
              <br />
            </React.Fragment>
          )}
          <h3>{post.title}</h3>
          <p>{post.description}</p>
          {/* {post.text && (
        <TextEditor readOnly={true} editorState={JSON.parse(props.post.text)} />
      )} */}
        </CardPostContent>
        <Link to={`/post/${post.slug}`}>Read</Link>
      </CardPost>
      <CardSeparator />
    </Card>
  );
};

export default CardMuseum;
