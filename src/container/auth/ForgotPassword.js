// library imports
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
// components imports
import Input from '../../components/input';
import Button from '../../components/button';
import { Form } from 'react-bootstrap';
// redux imports
import { forgotPassword } from '../../redux/slices/authSlice';
// style imports
import './style.css';

const ForgotPassword = ({ heading }) => {
  const [email, setEmail] = useState();
  const [error, setError] = useState(true);
  //  email validation
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  const isValidEmail = (e) => emailRegex.test(e);
  const emailChangeHandler = (event) => {
    if (!isValidEmail(event.target.value)) {
      setError('Enter a valid email address');
    } else {
      setError(false);
    }
    setEmail(event.target.value);
  };
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = () => {
    dispatch(forgotPassword({ email }));
  };
  return (
    <>
      <div className="background">
        <div className="heading">
          <h3>{heading}</h3>
        </div>
        <div className="input_container">
          <Input
            className="input_field"
            type="email"
            placeholder="Please enter your Email"
            lable="Enter email address"
            id="email"
            text="Enter a valid email address"
            onChange={emailChangeHandler}
          />
          {error && <Form.Text style={{ color: 'red' }}>{error}</Form.Text>}
          {/* {error && <Form.Text style={{ color: 'red' }}>{error}</Form.Text>} */}
        </div>
        <div className="input_container">
          <Button
            onClick={() => {
              handleSubmit();
              navigate('/login');
            }}
            className="btn"
            type="primary"
            id="btn"
            size="lg"
            placeholder="Forgot Password"
          />
          <p className="Reminder">
            No, I remember my password <Link to="/">Login</Link>
          </p>
        </div>
      </div>
    </>
  );
};
export default ForgotPassword;
