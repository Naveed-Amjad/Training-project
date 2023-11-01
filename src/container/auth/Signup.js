// library imports

// component imports
import { useState } from 'react';
import Input from '../../components/input';
import Button from '../../components/button';
import { Form } from 'react-bootstrap';
// import Button from '../../components/button'
// Redux imports
import { signupUser } from '../../redux/slices/authSlice';
// style imports
import './style.css';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
//
const Signup = ({ heading }) => {
  const [name, setName] = useState('');
  const [nameError, setNameError] = useState(true);
  const [email, setEmail] = useState();
  const [emailError, setEmailError] = useState(true);
  const [password, setPassword] = useState();
  const [errorPassword, setErrorPassword] = useState(true);

  // name input handler
  const nameInputHandler = (event) => {
    if (name === ' ' || name.length < 5) {
      setNameError('Please enter your full name');
    } else {
      setNameError(false);
    }
    setName(event.target.value);
  };
  // email input handler
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  const isValidEmail = (e) => emailRegex.test(e);
  const emailChangeHandler = (event) => {
    if (!isValidEmail(event.target.value)) {
      setEmailError('Invalid Email');
    } else {
      setEmailError(false);
    }
    setEmail(event.target.value);
  };
  const passwordReg =
    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
  // password validator
  const isValidPassword = (password) => passwordReg.test(password);
  // password handler
  const passwordHandler = (event) => {
    if (!isValidPassword(event.target.value)) {
      setErrorPassword(
        'password must contain capital, small letter, number and symbols'
      );
    } else {
      setErrorPassword(false);
    }
    setPassword(event.target.value);
  };
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const signUpHandler = () => {
    dispatch(signupUser({ name, email, password }));
  }
  console.log(email);
  console.log(password);
  return (
    <>
      <div className="background" style={{ height: '600px' }}>
        <div className="heading">
          <h1>{heading}</h1>
        </div>
        <div className="input_container">
          <Input
            className="input_field"
            type="text"
            placeholder="Full Name"
            lable="Full Name"
            id="email"
            text="Enter a valid email address"
            onChange={nameInputHandler}
          />
          {nameError && (
            <Form.Text style={{ color: 'red' }}>{nameError}</Form.Text>
          )}
        </div>
        <div className="input_container">
          <Input
            className="input_field"
            type="email"
            placeholder="Email address"
            lable="Email address"
            id="email"
            text="Enter a valid email address"
            onChange={emailChangeHandler}
          />
          {emailError && (
            <Form.Text style={{ color: 'red' }}>{emailError}</Form.Text>
          )}
        </div>
        <div className="input_container">
          <Input
            type="password"
            placeholder="Password"
            lable="Password"
            id="password"
            onChange={passwordHandler}
          />
          {errorPassword && (
            <Form.Text style={{ color: 'red' }}>{errorPassword}</Form.Text>
          )}
        </div>
        {/* <div className="input_container">
          <Input
            type="number"
            placeholder="Mobile number"
            lable="Mobile"
            id="mobile"
            onChange={passwordHandler}
          />
          {errorPassword && (
            <Form.Text style={{ color: 'red' }}>{errorPassword}</Form.Text>
          )}
        </div> */}
        <div className="input_container">
          <Button
            className="btn"
            type="primary"
            id="btn"
            size="lg"
            placeholder="Signup"
            onClick={() => {
              signUpHandler();
              navigate('/login')
            }}
          />
        </div>
      </div>
    </>
  );
};

export default Signup;
