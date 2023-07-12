import { Container } from './App.styled';
import ContactForm from 'components/ContactForm/ContactForm';
import Filter from 'components/Filter/Filter';
import ContactsList from 'components/ContactsList/ContactsList';
import { useSelector } from 'react-redux';

const App = () => {
  const contacts = useSelector(state => state.contacts.contacts);
  return (
    <Container>
      <h1>PhoneBook</h1>
      <ContactForm />

      <div>
        {contacts.length > 0 && (
          <div>
            <h2>Contacts</h2>
            <Filter />
          </div>
        )}
        {contacts.length > 0 && <ContactsList />}
      </div>
    </Container>
  );
};

export default App;
