// library imports
// import Button from 'react-bootstrap/Button';
import CustomButton from '../../button'
import Card from 'react-bootstrap/Card';
// component imports

// redux imports

// style imports
import './UserCard.css'
const UserCard = ({ product, handleDetails }) => {
  return (
    <Card style={{ width: '18rem', marginBottom: '20px' }}>
      <Card.Img className='card_img' variant="top" src={`http://localhost:4009/${product?.images[0]}`} alt='image' />
      <Card.Body>
        {/* <Card.Title>Card Title</Card.Title> */}
        <Card.Text>
          {`${product?.description}`}
        </Card.Text>
        <div>Price: <span style={{ color: '#007BFF' }}>{`${product?.price}`}</span></div>
        {product.stock === 0 ? <CustomButton isEnabledbtn={true} style={{ height: '40px', width: '130px', color: 'red', marginLeft: '120px', backgroundColor: 'white' }} placeholder='Out of stock' /> : <CustomButton className='card_btn' onClick={() => handleDetails(product)} placeholder='Details'></CustomButton>}
      </Card.Body>
    </Card>
  );
}

export default UserCard;
