import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';
// style import
import './style.css';
import DropWrapper from './style';
const FilterDropdown = ({ style, title, list, sortArr }) => {
  return (
    <DropWrapper>
      <DropdownButton
        style={style}
        title={title}
        className="border rounded"
        variant=""
      >
        {/* {console.log('type of checking this ', typeof list, list)} */}
        {/* <Dropdown.Item>Price</Dropdown.Item> */}
        {
          list?.map((data, i) => {
            return <Dropdown.Item key={i} onClick={data.onClick}>{data.title}</Dropdown.Item>
          })
        }
        {
          sortArr?.map((data, index) => {
            return <Dropdown.Item key={index} onClick={data.onClick} >{data.value}</Dropdown.Item>
          })
        }
      </DropdownButton>
    </DropWrapper>
  );
};

export default FilterDropdown;
