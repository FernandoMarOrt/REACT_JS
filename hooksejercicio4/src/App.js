import React, { Component } from 'react';
import UserList from './componentes/UserList';
import UserForm from './componentes/UserForm';
import { Button, Input, Row, Col } from 'reactstrap';
import logo from './logo.svg';
import './App.css';






function listaUsuarios(props) {
  return (
    <ul>
      {this.props.users.map(u => {
        return (
          <User
            key={u.id}
            name={u.name}
            email={u.email}
          />
        );
      })
      }
    </ul>
  );
}

function usuario(props) {
  return (

    <ul>

    </ul>

  );

}



class App extends React.Component {
  constructor() {
    super();
    this.state = {
      users: [
        { id: 1, name: "perico", email: "perico@myfpschool.com" },
        { id: 2, name: "juanico", email: "juanico@myfpschool.com" },
        { id: 3, name: "andrés", email: "andrés@myfpschool.com" }
      ]
    };
  }



  handleOnAddUser(event) {
    event.preventDefault();
    let user = {
      name: event.target.name.value,
      email: event.target.email.value
    };
    let tmp = this.state.users;
    tmp.push(user);
    this.setState({
      users: tmp
    });
  }
  render() {
    return (
      <div className="App">
        <div>
          <p><strong>Añade usuarios</strong></p>
          <UserList users={this.state.users} />
          <UserForm onAddUser={(e) => this.handleOnAddUser(e)} />
        </div>
      </div>
    );
  }
}
export default App;