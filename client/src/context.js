import React, { Component } from 'react';

// import $ from 'jquery';

const Context = React.createContext();

const reducer = (state, action) => {
  switch (action.type) {
    case 'DELETE_CONTACT':
      return {
        ...state,
        contacts: state.contacts.filter(
          contact => contact._id !== action.payload
        )
      };
    case 'ADD_CONTACT':
      return {
        ...state,
        contacts: [action.payload, ...state.contacts]
      };
    case 'UPDATE_CONTACT':
      return {
        ...state,
        contacts: state.contacts.map(
          contact =>
            contact._id === action.payload._id
              ? (contact = action.payload)
              : contact
        )
      };
    default:
      return state;
  }
};

export class Provider extends Component {
  state = {
    contacts: [],
    
    dispatch: action => this.setState(state => reducer(state, action))
  };

   componentDidMount() {
    fetch('http://localhost:5000/api/customer')
  .then(response => response.json())
  .then(json =>  {this.setState({ contacts: json }); console.log(json)})

   
   }
   getSnapshotBeforeUpdate(){
    fetch('http://localhost:5000/api/customer')
  .then(response => response.json())
  .then(json =>  {this.setState({ contacts: json }); console.log(json)})

   
   }
  

  render() {
    return (
      <Context.Provider value={this.state}>
        {this.props.children}
      </Context.Provider>
    );
  }
}

export const Consumer = Context.Consumer;
