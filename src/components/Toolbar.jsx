import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import { AiFillDelete } from 'react-icons/ai';

function BasicExample({ cleaner, block }) {
  return (
    <ButtonGroup aria-label="Basic example" className="mb-2">
      <Button variant="danger" onClick={() => block('blocked')}>
        Block
      </Button>
      <Button variant="success" onClick={() => block('available')}>
        Unblock
      </Button>
      <Button variant="secondary" onClick={cleaner}>
        <AiFillDelete />
      </Button>
    </ButtonGroup>
  );
}

export default BasicExample;
