import Form from 'react-bootstrap/Form';

const Input = ({ type, placeholder, lable, id, text, onChange, style, value, min }) => {
  return (
    <>
      <Form.Group controlId={id}>
        <Form.Label style={{ marginTop: '15px' }}>{lable}</Form.Label>
        <Form.Control
          min={min}
          onChange={onChange}
          type={type}
          placeholder={placeholder}
          style={style}
          value={value}
          accept={type === 'file' ? 'image/png, image/gif, image/jpeg' : ''}
        />
        {/* {error && <Form.Control.Feedback type="invalid">{error}</Form.Control.Feedback>} */}
      </Form.Group>
    </>
  );
};
export default Input;
