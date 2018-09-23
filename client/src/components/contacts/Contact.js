import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Consumer } from '../../context';

import $ from 'jquery';



class Contact extends Component {
  state = {
    showContactInfo: false
  };

 onDeleteClick(_id, dispatch){
  
    $.ajax({
        type : 'DELETE',
        url : `http://localhost:5000/contacts/delete/${_id}`
    }).done(function(res){
     
         
   
    });
    dispatch({ type: 'DELETE_CONTACT', payload: _id });
    console.log(" this is deleted..");
  
 }
  // onDeleteClick = async (_id, dispatch) => {
  //   try {
  //     await axios.delete(`http://localhost:5000/contacts/delete/${_id}`);
  //     dispatch({ type: 'DELETE_CONTACT', payload: _id });
  //   } catch (e) {
  //     dispatch({ type: 'DELETE_CONTACT', payload: _id });
  //   }
  // };

  render() {
    const { _id, name, email, phone } = this.props.contact;
    const { showContactInfo } = this.state;

    return (
      <Consumer>
        {value => {
          const { dispatch } = value;
          return (
            <div className="card card-body mb-3">
              <h4     >
                {name}{' '}
                <i
                 
                  className="fas fa-sort-down" onClick={() =>
                    this.setState({
                      showContactInfo: !this.state.showContactInfo
                    })
                  }
                  style={{ cursor: 'pointer' }}
                  
                />
              
                <i
                  className="fas fa-trash-alt" 
                  style={{ cursor: 'pointer', float: 'right', color: 'black' }}
                  onClick={this.onDeleteClick.bind(this, _id, dispatch)}
                />
                <Link to={`contact/edit/${_id}`}>
                  <i
                    className="fas fa-pencil-alt"
                    style={{
                      cursor: 'pointer',
                      float: 'right',
                      color: 'black',
                      marginRight: '1rem'
                    }}
                  />
                </Link>
              </h4>
              {showContactInfo ? (
                <ul className="list-group">
                  <li className="list-group-item">Email: {email}</li>
                  <li className="list-group-item">Phone: {phone}</li>
                </ul>
              ) : null}
            </div>
          );
        }}
      </Consumer>
    );
  }
}

Contact.propTypes = {
  contact: PropTypes.object.isRequired
};

export default Contact;
