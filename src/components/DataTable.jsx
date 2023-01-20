import { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import { useDispatch, useSelector } from 'react-redux';
import { checkIsAuth, logout } from '../redux/slices/authSlice';
import Toolbar from './Toolbar';
import { getAll, removeUser } from '../redux/slices/tableSlice';
import TableRow from './TableRow';
import { useNavigate } from 'react-router-dom';

const DataTable = () => {
  const [toggleUsers, setToggleUsers] = useState([]);
  const [check, setCheck] = useState([]);

  const navigate = useNavigate();

  const isAuth = useSelector(checkIsAuth);

  const dispatch = useDispatch();

  const all = useSelector(state => state.table.all);

  useEffect(() => {
    let a = all.map(el => {
      return { select: false, ...el };
    });

    setCheck(a);
  }, [all]);

  const toggleUser = (id, e, el) => {
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
    toggleUsers.map(id => {
      dispatch(removeUser(id));
      id === window.localStorage.id && dispatch(logout());
      return null;
    });
    // setCheck(check.filter(user => user.select !== true));
    navigate('/');
  }
  console.log(check);
  useEffect(() => {
    dispatch(getAll());
  }, [dispatch]);
  return (
    <>
      {isAuth && (
        <>
          <h2 className="fw-bold mt-5 text-center">Users</h2>
          <div className="text-center">
            <Toolbar cleaner={cleaner} />
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
