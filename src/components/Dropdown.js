import Dropdown from 'react-bootstrap/Dropdown';

function DropDownMenu() {
  return (
    <Dropdown>
      <Dropdown.Toggle variant="success" id="dropdown-basic">
        Dropdown Button
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item href="/action-1">Africa</Dropdown.Item>
        <Dropdown.Item href="/action-2">Antarctica</Dropdown.Item>
        <Dropdown.Item href="/action-3">Americas</Dropdown.Item>
        <Dropdown.Item href="/action-4">Asia</Dropdown.Item>
        <Dropdown.Item href="/action-5">Europe</Dropdown.Item>
        <Dropdown.Item href="/action-6">Oceania</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
}

export default DropDownMenu;