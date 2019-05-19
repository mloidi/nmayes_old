import moment from 'moment';

export const formatDate = date => {
  return moment(date).format('MMM DD, YYYY');
};

export const cardDate = (created, updated) => {
  if (typeof updated !== 'undefined')
    return moment(updated).format('MMM DD, YYYY');
  return moment(created).format('MMM DD, YYYY');
};

export const composeName = (firstName, lastName) => {
  return firstName + ' ' + lastName;
};

export const isLoggedUserAuthor = (loggedUserId, authorId) => {
  return loggedUserId === authorId;
};
