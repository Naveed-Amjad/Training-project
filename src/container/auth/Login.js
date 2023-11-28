// Library imports
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
// component imports
import Input from '../../components/input';
import Button from '../../components/button';
import CustomFormText from '../../components/utils/formText';
// Redux imports
import { loginUser } from '../../redux/slices/authSlice';
// Style imports
import './style.css';

const Login = ({ heading }) => {
  const navigate = useNavigate();
  const [textMsg, setTextMsg] = useState('');
  const [email, setEmail] = useState();
  const [error, setError] = useState(null);
  const wrongPassword = useSelector((state) => state.authReducer.error)
  const [password, setPassword] = useState();
  //  email validation
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  const isValidEmail = (e) => emailRegex.test(e);
  const emailChangeHandler = (event) => {
    if (!isValidEmail(event.target.value)) {
      setError('Invalid Email');
    } else {
      setError(false);
    }
    setEmail(event.target.value);
  };
  // password handle
  const passwordChangeHandler = (event) => {
    setPassword(event.target.value);
  };

  const dispatch = useDispatch();
  const loginHandler = async () => {
    if (!email) {
      setTextMsg('Please enter email')
    } else if (!password) {
      setTextMsg('Please enter password')
    } else {
      const resp = await dispatch(loginUser({ email, password }));
      console.log({ resp });
      if (!resp.error) {
        navigate('/dashboard')
        localStorage.getItem('role') === 'admin' ? navigate('/dashboard') : navigate('/')
      }
    }
  };

  return (
    <div>
      {/* {state === 1 && (<PopUp/>)} */}
      <div className="background">
        <div className="heading">
          <h1>{heading}</h1>
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
          {error && <CustomFormText textMsg='Invalid email format' />}
          {!email && <CustomFormText textMsg={textMsg} />}
        </div>
        <div className="input_container">
          <Input
            type="password"
            placeholder="Please enter password"
            lable="Password"
            id="password"
            onChange={passwordChangeHandler}
          />
          {wrongPassword && <CustomFormText textMsg='Wrong password' />}
          {!password && <CustomFormText textMsg={textMsg} />}
        </div>
        <div className="input_container">
          <Button
            className="btn"
            type="primary"
            id="btn"
            size="lg"
            placeholder="Login"
            onClick={loginHandler}
          />
          <p className="Reminder">
            Forgot Password! <Link to="/forgotpassword">Reset</Link> <br></br>
            Do not Have Account! <Link to="/signup">Signup</Link>
          </p>
        </div>
      </div>
    </div>
  );
};
export default Login;
