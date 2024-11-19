import { Container, Card, Button, Row, Col } from 'react-bootstrap';
import { useQuery, useMutation } from '@apollo/client';
import { QUERY_ME } from '../utils/queries';
import { REMOVE_BOOK } from '../utils/mutations';  // Import REMOVE_BOOK mutation
import Auth from '../utils/auth';
import { removeBookId } from '../utils/localStorage'; // Assuming this function is implemented
import { Book } from '../models/Book';

const SavedBooks = () => {
  const { loading, data, refetch } = useQuery(QUERY_ME);

  // Hook to perform the REMOVE_BOOK mutation
  const [removeBook] = useMutation(REMOVE_BOOK);

  // Check if data exists, otherwise handle loading
  if (loading) {
    return <h2>LOADING...</h2>;
  }

  // Get saved books from the data fetched by the query
  const savedBooks: Book[] = data?.me?.savedBooks || [];

  // Create function to delete a book
  const handleDeleteBook = async (bookId: string) => {
    const token = Auth.loggedIn() ? Auth.getToken() : null;
    if (!token) {
      return false;
    }

    try {
      // Call the REMOVE_BOOK mutation to delete the book
       await removeBook({
        variables: { bookId },
      });

      // After deleting, refetch the data to update the UI
      refetch();

      // Upon success, remove the book's id from localStorage
      removeBookId(bookId);
    } catch (err) {
      console.error('Error deleting book:', err);
    }
  };

  return (
    <>
      <div className='text-light bg-dark p-5'>
        <Container>
          {data?.me?.username ? (
            <h1>Viewing {data.me.username}'s saved books!</h1>
          ) : (
            <h1>Viewing saved books!</h1>
          )}
        </Container>
      </div>
      <Container>
        <h2 className='pt-5'>
          {savedBooks.length
            ? `Viewing ${savedBooks.length} saved ${
                savedBooks.length === 1 ? 'book' : 'books'
              }:`
            : 'You have no saved books!'}
        </h2>
        <Row>
          {savedBooks.map((book: Book) => {
            return (
              <Col md='4' key={book.bookId}>
                <Card border='dark'>
                  {book.image ? (
                    <Card.Img
                      src={book.image}
                      alt={`The cover for ${book.title}`}
                      variant='top'
                    />
                  ) : null}
                  <Card.Body>
                    <Card.Title>{book.title}</Card.Title>
                    <p className='small'>Authors: {book.authors}</p>
                    <Card.Text>{book.description}</Card.Text>
                    <Button
                      className='btn-block btn-danger'
                      onClick={() => handleDeleteBook(book.bookId)}  // Call the delete function
                    >
                      Delete this Book!
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            );
          })}
        </Row>
      </Container>
    </>
  );
};

export default SavedBooks;
