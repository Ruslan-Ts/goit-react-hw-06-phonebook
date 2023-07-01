import PropTypes from 'prop-types';
import {} from './ContactListItem.styled';

const ContactListItem = ({ name, number, onDeleteContact }) => {
  return (
    <li>
      {name}: {number}
      <button type="button" onClick={onDeleteContact}>
        Delete
      </button>
    </li>
  );
};

ContactListItem.propTypes = {
  id: PropTypes.string,
  name: PropTypes.string.isRequired,
  number: PropTypes.string.isRequired,
  onDeleteContact: PropTypes.func.isRequired,
};

export default ContactListItem;
