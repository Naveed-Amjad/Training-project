import { Form } from 'react-bootstrap';

const CustomFormText = ({ textMsg }) => {
  return <Form.Text className="text-muted">{<span style={{ color: 'red' }}>{textMsg}</span>}</Form.Text>;
};

export default CustomFormText;
