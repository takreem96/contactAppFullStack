import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Contacts from './components/contacts/Contacts';
import AddContact from './components/contacts/AddContact';
import EditContact from './components/contacts/EditContact';
import Header from './components/layout/Header';
import About from './components/pages/About';
import NotFound from './components/pages/NotFound';
import Test from './components/test/Test';
import Sidebar from './components/layout/Sidebar';

import { Provider } from './context';

// import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';


class App extends Component {
  render() {
    return (
      <Provider>
        <Router>
          <div className="App">
           
            <Header branding="Contact Manager" />
           
             <div className = "row">
           <div className = "col-md-3  ">
           <Sidebar/>
           </div>
           <div className ="col-md-8  col-sm-12 col-xs-12">
           <div className ="mt-3">
              <Switch>
                <Route exact path="/" component={Contacts} />
                <Route exact path="/contact/add" component={AddContact} />
                <Route exact path="/contact/edit/:id" component={EditContact} />
                <Route exact path="/about" component={About} />
                <Route exact path="/test" component={Test} />
                <Route component={NotFound} />
              </Switch>
              </div>
              </div>
            </div>
        </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
