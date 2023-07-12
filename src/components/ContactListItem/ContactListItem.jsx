import {} from './ContactListItem.styled';
import { deleteContact } from 'redux/contactsSlice';
import { useSelector, useDispatch } from 'react-redux';
import Notiflix from 'notiflix';

const ContactListItem = ({ name, number, onDeleteContact }) => {
  const dispatch = useDispatch();

  const contactsState = useSelector(state => state.contacts.contacts);
  const filterState = useSelector(state => state.filter);

  function getVisibleContacts() {
    const normalizedFilter = filterState.toLowerCase();
    return contactsState.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  }

  const handleDelete = (id, name) => {
    dispatch(deleteContact(id));
    Notiflix.Notify.success(`Contact ${name} deleted successfully`);
  };

  return getVisibleContacts().map(({ id, name, number }) => {
    return (
      <li key={id}>
        {name}: {number}
        <button type="button" onClick={() => handleDelete(id, name)}>
          Delete
        </button>
      </li>
    );
  });
};

export default ContactListItem;
