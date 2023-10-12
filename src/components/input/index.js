import Form from 'react-bootstrap/Form';

const Input = ({ type, placeholder, lable, id, text, onChange, style }) => {
  return (
    <>
      <Form.Group controlId={id}>
        <Form.Label style={{ marginTop: '15px' }}>{lable}</Form.Label>
        <Form.Control
          onChange={onChange}
          type={type}
          placeholder={placeholder}
          style={style}
        />
      </Form.Group>
    </>
  );
};
export default Input;
