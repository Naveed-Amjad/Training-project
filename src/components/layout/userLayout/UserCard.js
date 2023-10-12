// library imports
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
// component imports
import image21 from '../../../assets/image21.png'
// redux imports

// style imports
import './UserCard.css'
const UserCard = () => {
  return (
    <Card style={{ width: '18rem', marginBottom: '20px' }}>
      <Card.Img className='card_img' variant="top" src={image21} alt='image 1' />
      <Card.Body>
        {/* <Card.Title>Card Title</Card.Title> */}
        <Card.Text>
          Some quick example text to build on the card title and make up the
          bulk of the cards content.
        </Card.Text>
        <div>Price: <span style={{ color: '#007BFF' }}>$00.00</span></div>
        <Button className='card_btn'>Details</Button>
      </Card.Body>
    </Card>
  );
}

export default UserCard;
