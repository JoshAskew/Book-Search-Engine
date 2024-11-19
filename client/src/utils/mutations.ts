import { gql } from '@apollo/client';

// Mutation to add a user (for authentication purposes)
export const ADD_USER = gql`
  mutation addUser($email: String!, $password: String!, $username: String!) {
    addUser(email: $email, password: $password, username: $username) {
      token
      user {
        _id
        username
        email
      }
    }
  }
`;

// Mutation to save a book to the user's profile
export const SAVE_BOOK = gql`
  mutation saveBook($bookData: BookInput!) {
    saveBook(bookData: $bookData) {
      _id
      username
      email
      savedBooks {
        bookId
        title
        authors
        description
      }
    }
  }
`;

// Mutation to remove a saved book
export const REMOVE_BOOK = gql`
  mutation removeBook($bookId: String!) {
    removeBook(bookId: $bookId) {
      _id
      username
      email
      savedBooks {
        bookId
        title
        authors
        description
      }
    }
  }
`;

// Mutation for user login (you may already have this, but adjusted for books)
export const LOGIN_USER = gql`
  mutation Mutation($email: String!, $password: String!) {
  login(email: $email, password: $password) {
    user {
      username
    }
    token
  }
}
`;
