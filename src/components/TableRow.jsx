const TableRow = ({ el, toggleUser }) => {
  const { _id, username, email, createdAt, loginTime, statusUser, select } = el;

  let d = new Date(createdAt).toLocaleString();
  let l = new Date(loginTime).toLocaleString();

  return (
    <tr>
      <th scope="col">
        <div className="form-check">
          <input
            className="form-check-input"
            type="checkbox"
            value=""
            id="flexCheckDefault"
            onChange={e => {
              toggleUser(_id, e, el);
            }}
            checked={select}
          />
        </div>
      </th>
      <td>{_id}</td>
      <td>{username}</td>
      <td>{email}</td>
      <td>{d}</td>
      <td>{l}</td>
      <td>{statusUser}</td>
    </tr>
  );
};

export default TableRow;
