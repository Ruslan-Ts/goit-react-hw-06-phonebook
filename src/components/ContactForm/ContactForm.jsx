import { useState } from 'react';
import {} from './ContactForm.styled';
import { useSelector, useDispatch } from 'react-redux';
import { addContact } from 'redux/contactsSlice';
import Notiflix from 'notiflix';

const ContactForm = ({ onSubmit }) => {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');
  const dispatch = useDispatch();
  const contacts = useSelector(state => state.contacts.contacts);

  const handleInputChange = e => {
    const { name, value } = e.currentTarget;
    switch (name) {
      case 'name':
        setName(value);
        break;

      case 'number':
        setNumber(value);
        break;

      default:
        break;
    }
  };

  const handleSubmit = e => {
    e.preventDefault();

    for (const contact of contacts) {
      if (
        contact.name.toLowerCase() ===
        e.target.elements.name.value.toLowerCase()
      ) {
        Notiflix.Notify.failure(`${[name]} is already exist`);
        return;
      } else if (contact.number === e.target.elements.number.value) {
        return Notiflix.Notify.failure(
          `${e.target.elements.number.value} is already exist`
        );
      }
    }

    dispatch(
      addContact({
        name: e.target.elements.name.value,
        number: e.target.elements.number.value,
      })
    );
    Notiflix.Notify.success('Contact added');
    setName('');
    setNumber('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Name
        <input
          type="text"
          name="name"
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
          placeholder="Enter name"
          onChange={handleInputChange}
          value={name}
        />
      </label>
      <label>
        Number
        <input
          type="tel"
          name="number"
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
          placeholder="Enter phone number"
          onChange={handleInputChange}
          value={number}
        />
      </label>

      <button type="submit">Add contact</button>
    </form>
  );
};

export default ContactForm;
