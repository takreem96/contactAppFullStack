import React, { Component } from 'react';
import Contact from './Contact';
import { Consumer } from '../../context';

class Contacts extends Component {
  state = {
    search : ''
  };

  updateSearch(event){
    this.setState({search : event.target.value.substr(0, 20)});
  }
  render() { 
   
    return (
      <Consumer >
        {value => {
          const { contacts } = value;
          let Contactitem;
          let filteredContacts =contacts.filter(
            (contact)=> {
              return contact.name.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1;
            }
          )
      
      
          if(contacts){
            console.log(contacts);
            Contactitem = filteredContacts.map( (contact , index)  =>{
           
              return(
                <Contact    key = {contact._id}   contact  = {contact}/>
              )
            
               
             });
         
         
          }
          return (
            <React.Fragment >
              
              <h1 className="display-4 mb-2">
                <span className="text-primary">Contact</span> List
              </h1> <input  className ="font input" placeholder = "Search..." type ="text"  value ={this.state.search} onChange = {this.updateSearch.bind(this)}/>
              <div className ="scroll">
             
              {Contactitem}
              {/* {contacts.map(contact => (
                <Contact key={contact.id} contact={contact} />
              ))} */}
           </div>
            </React.Fragment>
          );
        }}
      </Consumer>
    );
  }
}

export default Contacts;
