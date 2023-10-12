import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';
// style import
import './style.css'
import DropWrapper from './style';
const FilterDropdown = ({ style, title }) => {
  return (
    <DropWrapper>
      <DropdownButton style={style} title={title} className='border rounded' variant=''>
        <Dropdown.Item >Action</Dropdown.Item>
        <Dropdown.Item >Another action</Dropdown.Item>
      </DropdownButton>
    </DropWrapper>
  );
}

export default FilterDropdown;
