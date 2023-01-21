import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  checkIsAuth,
  reduceStatus,
  registerUser,
} from '../redux/slices/authSlice';
import { toast } from 'react-toastify';

const Auth = () => {
  const [data, setData] = useState({ username: '', email: '', password: '' });
  const dispatch = useDispatch();
  const isAuth = useSelector(checkIsAuth);
  const navigate = useNavigate();
  const { status } = useSelector(state => state.auth);

  useEffect(() => {
    if (status) toast(status);
    if (isAuth) navigate('/table');
    dispatch(reduceStatus());
  }, [isAuth, navigate, status, dispatch]);

  function handleFormSubmit(event) {
    event.preventDefault();
    try {
      dispatch(registerUser({ ...data }));
      setData({ username: '', email: '', password: '' });
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
            <h2 className="fw-bold mb-5">Sign up</h2>
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

              {/* Email input */}
              <div className="form-outline mb-4">
                <input
                  type="email"
                  className="form-control"
                  value={data.email}
                  onChange={event =>
                    handleInputChange(event.target.value, 'email')
                  }
                />
                <label className="form-label">Email address</label>
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
                Sign up
              </button>
              <p>
                Already registered{' '}
                <Link to="/" className="text-decoration-none">
                  sign in?
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Auth;
