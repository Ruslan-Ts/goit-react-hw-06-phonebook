import PropTypes from 'prop-types';
import {} from './Filter.styled';

const Filter = ({ value, onFilter }) => (
  <label>
    Find contacts by name
    <input
      type="text"
      placeholder="Enter name of contact"
      value={value}
      onChange={onFilter}
    ></input>
  </label>
);

Filter.propTypes = {
  onFilter: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
};

export default Filter;