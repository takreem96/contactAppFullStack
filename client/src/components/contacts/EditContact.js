import React, { Component } from 'react';
import { Consumer } from '../../context';
import TextInputGroup from '../layout/TextInputGroup';
// import axios from 'axios';
import $ from 'jquery';

class EditContact extends Component {
  state = {
  
    name: '',
    email: '',
    phone: '',
    errors: {}
  };

   componentDidMount() {
    //find ID By Url of local


    const {id} = this.props.match.params;
   
    
    fetch(`http://localhost:5000/contact/edit/${id}`)
    .then(response => response.json())
    .then(contacts =>  {contacts.map( (contact , index)  =>{
      
      this.setState({
        name : contact.name,
        email: contact.email,
        phone: contact.phone
       
      });
});
     });

// const res =  axios.get(
    //   `http://localhost:5000/contact/edit/${id}`
    // );
  
    // const contact = res.data;
    
    // this.setState({
    //   name : contacts.name,
    //   email: contacts.email,
    //   phone: contacts.phone
     
    // });
  }

  onSubmit =  (dispatch, e) => {
    e.preventDefault();

    const { name, email, phone } = this.state;

    // Check For Errors
    if (name === '') {
      this.setState({ errors: { name: 'Name is required' } });
      return;
    }

    if (email === '') {
      this.setState({ errors: { email: 'Email is required' } });
      return;
    }

    if (phone === '') {
      this.setState({ errors: { phone: 'Phone is required' } });
      return;
    }

   

    const { id } = this.props.match.params;

    const updContact = {
      name,
      email,
      phone,
      _id: id
    };
console.log(id);
console.log( this.props.match.params);
$.ajax({
  type : 'PUT',
  url :`http://localhost:5000/api/customer/update/${id}`,
  data : updContact
}).done(function(res){


  
  dispatch({ type: 'UPDATE_CONTACT', payload: updContact});

});

// dispatch({ type: 'UPDATE_CONTACT', payload: updContact });
    // const res =  axios.put(
    //   `http://localhost:5000/api/customer/update/${id}`,
    //   updContact
    // );

    // dispatch({ type: 'UPDATE_CONTACT', payload: res.data });

    // Clear State
    this.setState({
      name: '',
      email: '',
      phone: '',
      errors: {}
    });

    this.props.history.push('/');
  };
// this is happen when you type some things on input field.
  onChange = e => this.setState({ [e.target.name]: e.target.value });

  render() {
    const { name, email, phone, errors } = this.state;

    return (
      <Consumer>
        {value => {
          const { dispatch } = value;
          return (
            <div className="card mb-3">
              <div className="card-header">Edit Contact</div>
              <div className="card-body">
                <form onSubmit={this.onSubmit.bind(this, dispatch)}>
                  <TextInputGroup
                    label="Name"
                    name="name"
                    placeholder="Enter Name"
                    value={name}
                    onChange={this.onChange}
                    error={errors.name}
                  />
                  <TextInputGroup
                    label="Email"
                    name="email"
                    type="email"
                    placeholder="Enter Email"
                    value={email}
                    onChange={this.onChange}
                    error={errors.email}
                  />
                  <TextInputGroup
                    label="Phone"
                    name="phone"
                    placeholder="Enter Phone"
                    value={phone}
                    onChange={this.onChange}
                    error={errors.phone}
                  />
                  <input
                    type="submit"
                    value="Update Contact"
                    className="btn btn-light btn-block"
                  />
                </form>
              </div>
            </div>
          );
        }}
      </Consumer>
    );
  }
}

export default EditContact;
