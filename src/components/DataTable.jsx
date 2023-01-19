import axios from '../utils/axios';
import { useEffect } from 'react';
import Table from 'react-bootstrap/Table';
import { useSelector } from 'react-redux';
import { checkIsAuth } from '../redux/slices/authSlice';
import Toolbar from './Toolbar';

const DataTable = () => {
  const isAuth = useSelector(checkIsAuth);

  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get('/auth/all');
        console.log(data);
      } catch (e) {
        console.log(e.message);
      }
    })();
  }, []);

  return (
    <>
      {isAuth && (
        <>
          <h2 className="fw-bold mt-5 text-center">Users</h2>
          <div className="text-center">
            <Toolbar />
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
              <tr>
                <th scope="col">
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      value=""
                      id="flexCheckDefault"
                    />
                  </div>
                </th>
                <td>1</td>
                <td>1</td>
                <td>1</td>
                <td>1</td>
                <td>1</td>
                <td>1</td>
              </tr>
            </tbody>
          </Table>
        </>
      )}
    </>
  );
};

export default DataTable;
