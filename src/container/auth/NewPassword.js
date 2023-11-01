// Library imports
import { useState } from 'react'
// component imports
import Input from '../../components/input';
import Button from '../../components/button'
import { Form } from 'react-bootstrap';
// redux imports
import { resetPassword } from '../../redux/slices/authSlice';
// Style imports
import './style.css'
import { useDispatch } from 'react-redux';

const NewPassword = ({ heading }) => {
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();
  const [error, setError] = useState(true);
  const [confirmError, setConfirmError] = useState(true);

  const passwordReg = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
  // password validator
  const isValidPassword = (password) => passwordReg.test(password);
  // password handler
  const passwordHandler = (event) => {
    if (!isValidPassword(event.target.value)) {
      setError('password must contain capital, small letter, number and symbols')
    } else {
      setError(false);
    }
    setPassword(event.target.value);
  }
  // password and confirm password match
  const matchPassword = (pass, confirmPass) => pass === confirmPass;
  // confirm password handler
  const confirmPasswordHandler = (event) => {
    if (!matchPassword(password, event.target.value)) {
      setConfirmError('confirm password does\'nt match password');
    } else {
      setConfirmError(false);
    }
    setConfirmPassword(event.target.value)
  }
  console.log(confirmPassword);

  const dispatch = useDispatch();
  const handleSubmit = () => {
    const query = new URLSearchParams(window.location.search);
    const token = query.get('token');
    dispatch(resetPassword({ newPassword: password, token }));
  }

  return (
    <>
      <div className="background">
        <div className='heading'>
          <h1>{heading}</h1>
        </div>
        <div className='input_container'>
          <Input className="input_field" type="password" placeholder="Please enter password" lable="Password" id="email" text="Enter a valid email address" onChange={passwordHandler} />
          {error && <Form.Text style={{ color: 'red' }}>{error}</Form.Text>}
        </div>
        <div className='input_container'>
          <Input className="input_field" type="password" placeholder="confirm password" lable="Confirm Password" id="email" text="Enter a valid email address" onChange={confirmPasswordHandler} />
          {confirmError && <Form.Text style={{ color: 'red' }}>{confirmError}</Form.Text>}
        </div>
        <div className='input_container'>
          <Button onClick={handleSubmit} className="btn" type="primary" id="btn" size="lg" placeholder="Reset Password" />
        </div>

      </div>
    </>
  )
}

export default NewPassword;
