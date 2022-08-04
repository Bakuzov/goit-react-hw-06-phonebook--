import { Component } from 'react';
import { nanoid } from 'nanoid';
import { Input, Button, P } from './ContactForm.styled';

export class ContactForm extends Component {
  state = {
    name: '',
    number: '',
  };

  handleChange = ({ target: { name, value } }) => {
    // transfering of values from input to state
    console.log(value);
    this.setState({ [name]: value });
  };
  handleSubmit = event => {
    event.preventDefault();
    const id = nanoid();
    const contact = { ...this.state, id }; // creating a contact as an object
    this.props.addContact(contact); // passing the contact to the method "addContact" which from the App
    this.setState({ name: '', number: '' }); // clearing the input field
  };

  render() {
    const { name, number } = this.state;
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          <P>Name</P>
          <Input
            type="text"
            name="name"
            value={name}
            onChange={this.handleChange}
            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            required
          />
        </label>
        <label>
          <P> Number</P>
          <Input
            type="tel"
            name="number"
            value={number}
            onChange={this.handleChange}
            pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            required
          />
        </label>
        <Button type="submit">Add contact</Button>
      </form>
    );
  }
}
