import { useState, useEffect } from 'react';
import { Container } from './App.styled';
import { nanoid } from 'nanoid';
import Notiflix from 'notiflix';
import ContactForm from 'components/ContactForm/ContactForm';
import Filter from 'components/Filter/Filter';
import ContactsList from 'components/ContactsList/ContactsList';

const App = () => {
  const [contacts, setContacts] = useState(
    JSON.parse(localStorage.getItem('contacts')) ?? []
  );
  const [filter, setFilter] = useState('');

  const handleContactSubmit = data => {
    for (const contact of contacts) {
      if (data.name === contact.name) {
        return Notiflix.Notify.failure(
          `Контакт з імʼям ${data.name} вже існує!`
        );
      } else if (data.number === contact.number) {
        return Notiflix.Notify.failure(
          `Контакт з номером ${data.number} вже існує!`
        );
      }
    }

    setContacts([...contacts, { ...data, id: nanoid() }]);
    Notiflix.Notify.success(`Контакт з імʼям ${data.name} додано!`);
  };

  const onFilter = e => {
    setFilter(e.target.value);
  };

  const getVisibleContacts = () => {
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );
  };

  const deleteContact = contactId => {
    setContacts(contacts.filter(contact => contact.id !== contactId));
  };

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  // componentDidMount() {
  //   const contacts = localStorage.getItem('contacts');
  //   const parsedContacts = JSON.parse(contacts);
  //   if (parsedContacts) {
  //     this.setState({ contacts: parsedContacts });
  //   }
  // };

  // componentDidUpdate(prevProps, prevState) {
  //   if (this.state.contacts !== prevState.contacts) {
  //     localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
  //   }
  // };

  return (
    <Container>
      <h1>PhoneBook</h1>
      <ContactForm onSubmit={handleContactSubmit} />

      <div>
        <h2>Contacts</h2>
        <Filter value={filter} onFilter={onFilter} />
        <ContactsList
          contacts={getVisibleContacts()}
          onDeleteContact={deleteContact}
        />
      </div>
    </Container>
  );
};

// class App extends Component {
//   state = {
//     contacts: [
//       { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
//       { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
//       { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
//       { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
//     ],
//     filter: '',
//   };

//   handleContactSubmit = data => {

//     for (const contact of this.state.contacts) {
//       if (data.name === contact.name) {
//         return Notiflix.Notify.failure(
//           `Контакт з імʼям ${data.name} вже існує`
//         );
//       } else if (data.number === contact.number) {
//         return Notiflix.Notify.failure(
//           `Контакт з номером ${data.number} вже існує`
//         );
//       }
//     }

//     this.setState(prevState => ({
//       contacts: [...prevState.contacts, { ...data, id: nanoid() }],
//     }));
//   };

//   onFilter = e => {
//     this.setState({ filter: e.target.value });
//   };

//   getVisibleContacts = () => {
//     const { filter, contacts } = this.state;
//     return contacts.filter(contact =>
//       contact.name.toLowerCase().includes(filter.toLowerCase())
//     );
//   };

//   deleteContact = contactId => {
//     this.setState(prevState => ({
//       contacts: prevState.contacts.filter(contact => contact.id !== contactId),
//     }));
//   };
//   componentDidMount() {
//     const contacts = localStorage.getItem('contacts');
//     const parsedContacts = JSON.parse(contacts);
//     if (parsedContacts) {
//       this.setState({ contacts: parsedContacts });
//     }
//   }

//   componentDidUpdate(prevProps, prevState) {
//     if (this.state.contacts !== prevState.contacts) {
//       localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
//     }
//   }

//   render() {
//     return (
//       <Container>
//         <h1>PhoneBook</h1>
//         <ContactForm onSubmit={this.handleContactSubmit} />

//         <div>
//           <h2>Contacts</h2>
//           <Filter value={this.state.filter} onFilter={this.onFilter} />
//           <ContactsList
//             contacts={this.getVisibleContacts()}
//             onDeleteContact={this.deleteContact}
//           />
//         </div>
//       </Container>
//     );
//   }
// }

export default App;
