import { gql } from '@apollo/client';

export const QUERY_PROFILES = gql`
  query allProfiles {
    profiles {
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

export const QUERY_SINGLE_PROFILE = gql`
  query singleProfile($profileId: ID!) {
    profile(profileId: $profileId) {
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

export const QUERY_ME = gql`
  query me {
    me {
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

export const SEARCH_BOOKS = gql`
  query searchBooks($title: String!) {
    searchBooks(title: $title) {
      bookId
      title
      authors
      description
    }
  }
`;

export const QUERY_ALL_BOOKS = gql`
  query allBooks {
    books {
      bookId
      title
      authors
      description
    }
  }
`;
