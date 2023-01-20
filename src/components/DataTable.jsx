import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { checkIsAuth, logout, blockUser } from '../redux/slices/authSlice';
import {
  blocker,
  getAll,
  refresh,
  removeUser,
} from '../redux/slices/tableSlice';
import { useNavigate } from 'react-router-dom';
import Table from 'react-bootstrap/Table';
import TableRow from './TableRow';
import Toolbar from './Toolbar';

const DataTable = () => {
  const [toggleUsers, setToggleUsers] = useState([]);
  const [check, setCheck] = useState([]);
  const [checkedMain, setCheckedMain] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const isAuth = useSelector(checkIsAuth);
  const all = useSelector(state => state.table.all);

  useEffect(() => {
    let a = all.map(el => {
      return { select: false, ...el };
    });
    setCheck(a);
  }, [all]);

  const toggleUser = (id, e, el) => {
    setCheckedMain(false);
    toggleUsers.includes(id)
      ? setToggleUsers(toggleUsers.filter(el => el !== id))
      : setToggleUsers([...toggleUsers, id]);
    let checked = e.target.checked;
    setCheck(
      check.map(data => {
        if (el._id === data._id) {
          data.select = checked;
        }
        return data;
      })
    );
  };

  const handleChange = e => {
    checkedMain ? setCheckedMain(false) : setCheckedMain(true);
    let tempUser = all.map(user => {
      const { _id } = user;
      return _id;
    });
    e.target.checked ? setToggleUsers(tempUser) : setToggleUsers([]);
    setCheck(
      check.map(d => {
        d.select = e.target.checked;
        return d;
      })
    );
  };

  function cleaner() {
    toggleUsers.forEach(id => {
      dispatch(removeUser(id));
      id === window.localStorage.id && dispatch(logout()) && navigate('/');
      dispatch(refresh(id));
    });
    setToggleUsers([]);
  }

  const logoutUser = () => {
    dispatch(logout());
    window.localStorage.removeItem('token');
    navigate('/');
  };

  const checkCurrentUser = id => {
    id === window.localStorage.id && logoutUser();
  };

  (() => {
    let status = 'available',
      id = window.localStorage.id,
      a = all.find(el => el._id === id);
    a &&
      a.statusUser === 'blocked' &&
      dispatch(blocker({ id, status })) &&
      logoutUser();
  })();

  const block = status => {
    toggleUsers.forEach(id => {
      let uname = check.find(el => el._id === id).username;
      dispatch(blockUser({ uname, status }));
      dispatch(blocker({ id, status }));
      status === 'blocked' && checkCurrentUser(id);
    });
    setToggleUsers([]);
    check.map(el => (el.select = false));
    setCheckedMain(false);
  };

  useEffect(() => {
    dispatch(getAll());
  }, [dispatch]);

  return (
    <>
      {isAuth && (
        <>
          <h2 className="fw-bold mt-5 text-center">Users</h2>
          <div className="text-center">
            <Toolbar cleaner={cleaner} block={block} />
          </div>

          <Table striped responsive bordered hover variant="dark">
            <thead>
              <tr>
                <th scope="col">
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      value=""
                      id="flexCheckDefault"
                      name="allSelect"
                      checked={checkedMain}
                      onChange={handleChange}
                    />
                  </div>
                </th>
                <th>id</th>
                <th>Username</th>
                <th>E-mail</th>
                <th>Registration time</th>
                <th>Last login time</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {check.map(el => (
                <TableRow el={el} toggleUser={toggleUser} key={el._id} />
              ))}
            </tbody>
          </Table>
        </>
      )}
    </>
  );
};

export default DataTable;
