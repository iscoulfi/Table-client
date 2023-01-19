import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import { AiFillDelete } from 'react-icons/ai';

function BasicExample() {
  return (
    <ButtonGroup aria-label="Basic example" className="mb-2">
      <Button variant="danger">Block</Button>
      <Button variant="success">Unblock</Button>
      <Button variant="secondary">
        <AiFillDelete />
      </Button>
    </ButtonGroup>
  );
}

export default BasicExample;
