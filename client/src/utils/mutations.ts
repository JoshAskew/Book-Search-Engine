import { gql } from '@apollo/client';

// Mutation to add a user (for authentication purposes)
export const ADD_USER = gql`
  mutation addUser($email: String!, $password: String!, $name: String!) {
    addUser(email: $email, password: $password, name: $name) {
      token
      user {
        _id
        name
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
      name
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
  mutation removeBook($bookId: ID!) {
    removeBook(bookId: $bookId) {
      _id
      name
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
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        name
      }
    }
  }
`;
