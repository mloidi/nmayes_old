import React, { useContext } from 'react';
import { NavLink as Link } from 'react-router-dom';
import styled from 'styled-components';

import {
  Card,
  CardArea,
  CardPost,
  CardPostBar,
  CardPostContent,
  CardSeparator,
  Author,
  PostDetails,
  PublishedAt,
  PostDescription,
  Button
} from '../css/Common.Style';
import Icon from './common/Icon';
import { cardDate, composeName, isLoggedUserAuthor } from './common/Util';
import { AuthContext, AlertContext, LoadingContext } from './context/';

const Image = styled.img`
  display: block;
  margin-left: auto;
  margin-right: auto;
  width: 100%;
`;

const Sep = styled.div`
  padding: 1rem;
`;

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
  const authContext = useContext(AuthContext);
  const loggedUserIsAuthorOrNotAuthenticated =
    !authContext.isAuthenticated() ||
    (authContext.isAuthenticated() &&
      authContext.getUser() &&
      isLoggedUserAuthor(authContext.getUser()._id, post.author._id));
  return (
    <Card>
      <CardPost>
        <CardPostBar>
          {authContext.isAuthenticated() &&
          loggedUserIsAuthorOrNotAuthenticated ? (
            <React.Fragment>
              <Link className="link" to={`/post/edit/${post.slug}`}>
                <Icon icon="faEdit" /> Edit
              </Link>
              <LoadingContext.Consumer>
                {loadingContext => (
                  <AlertContext.Consumer>
                    {alertContext => (
                      <Button
                        onClick={() => {
                          loadingContext.setLoading(true);
                          props.delete(post._id, post.title, alertContext);
                        }}
                        fontSize="1rem"
                      >
                        <Icon icon="faTrash" /> Remove
                      </Button>
                    )}
                  </AlertContext.Consumer>
                )}
              </LoadingContext.Consumer>
            </React.Fragment>
          ) : (
            <Sep />
          )}
        </CardPostBar>
        <CardPostContent
          onClick={() => {
            const to = '/post/view/' + post.slug;
            props.history.push(to);
          }}
        >
          {post.thumb && <Image src={post.thumb} alt={post.title} />}
          <h3>{post.title}</h3>
          <PostDetails>
            <Author
              loggedUserIsAuthorOrNotAuthenticated={
                loggedUserIsAuthorOrNotAuthenticated
              }
            >
              By{' '}
              {post.author &&
                composeName(post.author.firstName, post.author.lastName)}
            </Author>
            <PublishedAt>{cardDate(post.created, post.updated)}</PublishedAt>
          </PostDetails>
          <PostDescription>{post.description}</PostDescription>
        </CardPostContent>
      </CardPost>
      <CardSeparator />
    </Card>
  );
};

export default CardMuseum;
