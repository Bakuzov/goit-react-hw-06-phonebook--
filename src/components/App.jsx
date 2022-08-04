import { Component } from 'react';
import { ContactList } from './ContactList/ContactList';
import { ContactForm } from './ContactForm/ContactForm';
import { Filter } from './Filter/Filter';
export class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };
  componentDidMount() {
    const contacts = localStorage.getItem('contacts');
    if (contacts) {
      this.setState({ contacts: JSON.parse(contacts) });
    }
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevState.contacts !== this.state.contacts) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }
  }
  componentWillUnmount() {
    console.log('Unmount');
  }
  addContact = contact => {
    const searchName = this.state.contacts.find(
      item => item.name === contact.name
    );
    if (searchName) {
      alert(`${contact.name}  is already in contacts`);
    } else if (this.setState(ps => ({ contacts: [...ps.contacts, contact] }))); // adding a new contact
  };

  handleChangeFilter = ({ target: { value } }) => {
    this.setState({ filter: value });
  };

  getVisableContacts = () => {
    const { contacts, filter } = this.state;
    return contacts.filter(({ name }) =>
      name.toLowerCase().includes(filter.toLowerCase())
    ); //checking: does the name includes filter's value
  };

  // handleDelete = id => {
  //   this.setState(prevState => {
  //     return {
  //       contacts: prevState.contacts.filter(contact => contact.id !== id),
  //     }; //от борабтного оставляем все элементы кроме того который выбрали удалить.
  //   });
  // };

  handleDelete = id => {
    this.setState(({ contacts }) => {
      const index = contacts.findIndex(el => el.id === id);
      const newArray = [
        ...contacts.slice(0, index),
        ...contacts.slice(index + 1),
      ];
      return {
        contacts: newArray,
      };
    });
  };

  render() {
    const { filter } = this.state;

    return (
      <>
        <h1 className="title">Phonebook</h1>
        <ContactForm addContact={this.addContact} />
        <h2 className="title">Contacts</h2>
        <Filter filter={filter} formSubmitFilter={this.handleChangeFilter} />
        <ContactList
          contactList={this.getVisableContacts()}
          deleteContact={this.handleDelete}
        />
      </>
    );
  }
}
