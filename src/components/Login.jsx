import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  checkIsAuth,
  getLoginTime,
  loginUser,
} from '../redux/slices/authSlice';

const Login = () => {
  const [data, setData] = useState({ username: '', password: '' });
  const dispatch = useDispatch();
  const isAuth = useSelector(checkIsAuth);
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuth) navigate('/table');
  }, [isAuth, navigate]);

  function handleFormSubmit(event) {
    event.preventDefault();

    try {
      let date = Date();
      dispatch(getLoginTime({ ...data, date }));
      dispatch(loginUser({ ...data }));
      setData({ username: '', password: '' });
    } catch (e) {
      console.log(e.message);
    }
  }

  function handleInputChange(text, name) {
    setData({ ...data, [name]: text });
  }

  return (
    <section className="text-center ">
      <div className="card-body py-5 px-md-5">
        <div className=" row d-flex justify-content-center">
          <div className="auth">
            <h2 className="fw-bold mb-5">Sign in</h2>
            <form onSubmit={handleFormSubmit}>
              {/* Username input */}
              <div className="form-outline mb-4">
                <input
                  type="username"
                  className="form-control"
                  value={data.username}
                  onChange={event =>
                    handleInputChange(event.target.value, 'username')
                  }
                />
                <label className="form-label">Username</label>
              </div>

              {/* Password input */}
              <div className="form-outline mb-4">
                <input
                  type="password"
                  className="form-control"
                  value={data.password}
                  onChange={event =>
                    handleInputChange(event.target.value, 'password')
                  }
                />
                <label className="form-label">Password</label>
              </div>

              {/* Submit button */}
              <button type="submit" className="btn btn-primary btn-block mb-4">
                Sign in
              </button>
              <p>
                Don't have an account?{' '}
                <Link to="/register" className="text-decoration-none">
                  Register here
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
