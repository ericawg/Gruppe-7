import * as React from 'react';
import { Component } from 'react-simplified';
import ReactDOM from 'react-dom';
import { NavLink, HashRouter, Route } from 'react-router-dom';
import { studentService } from './services';
import { emneService } from './services' ;
import { Card, List, Row, Column, NavBar, Button, Form } from './widgets';

import createHashHistory from 'history/createHashHistory';
const history = createHashHistory(); // Use history.push(...) to programmatically change path, for instance after successfully saving a student

class Menu extends Component {
  render() {
    return (
      <NavBar brand="WhiteBoard">
        <NavBar.Link to="/students">Students</NavBar.Link>
        <NavBar.Link to="/emner">Emner</NavBar.Link>
      </NavBar>
    );
  }
}

class Home extends Component {
  render() {
    return <Card title="Welcome">Welcome to WhiteBoard</Card>;
  }
}

class StudentList extends Component {
  students = [];

  render() {
    return (
      <Card title="Students">
        <List>
          {this.students.map(student => (
            <List.Item key={student.id} to={'/students/' + student.id}>
              {student.name}
            </List.Item>
          ))}
        </List>
      </Card>
    );
  }

  mounted() {
    studentService.getStudents(students => {
      this.students = students;
    });
  }
}

class StudentDetails extends Component {
  student = null;

  render() {
    if (!this.student) return null;

    return (
      <div>
        <Card title="Student details">
          <Row>
            <Column width={2}>Name:</Column>
            <Column>{this.student.name}</Column>
          </Row>
          <Row>
            <Column width={2}>Email:</Column>
            <Column>{this.student.email}</Column>
          </Row>
        </Card>
        <Button.Light onClick={this.edit}>Edit</Button.Light>
      </div>
    );
  }

  mounted() {
    studentService.getStudent(this.props.match.params.id, student => {
      this.student = student;
    });
  }

  edit() {
    history.push('/students/' + this.student.id + '/edit');
  }
}

class StudentEdit extends Component {
  student = null;

  render() {
    if (!this.student) return null;

    return (
      <div>
        <Card title="Edit student">
          <Form.Label>Name:</Form.Label>
          <Form.Input type="text" value={this.student.name} onChange={e => (this.student.name = e.target.value)} />
          <Form.Label>Email:</Form.Label>
          <Form.Input type="text" value={this.student.email} onChange={e => (this.student.email = e.target.value)} />
        </Card>
        <Row>
          <Column>
            <Button.Success onClick={this.save}>Save</Button.Success>
          </Column>
          <Column>
            <Button.Success onClick={this.add}>Add</Button.Success>
          </Column>
          <Column right>
            <Button.Light onClick={this.cancel}>Cancel</Button.Light>
          </Column>
        </Row>
      </div>
    );
  }

  mounted() {
    studentService.getStudent(this.props.match.params.id, student => {
      this.student = student;
    });
  }

  save() {
    studentService.updateStudent(this.student, () => {
      history.push('/students/' + this.props.match.params.id);
    });
  }

  cancel() {
    history.push('/students/' + this.props.match.params.id);
  }
  add() {
    studentService.addStudent(this.student.name,this.student.email, () =>{
      students.push();
    } )
  }
}

class EmneList extends Component{
  emner = [];

  render() {
    return (
      <Card title="Emner">
        <List>
          {this.emner.map(emne => (
            <List.Item key={emne.emne_kode} to={'/emner/' + emne.emne_kode}>
              {emne.emne_navn}
            </List.Item>
          ))}
        </List>
      </Card>
    );
  }

  mounted() {
    emneService.getEmner(emner => {
      this.emner = emner;
    });
  }
};

class EmneDetails extends Component {
  emne = null;

  render() {
    if (!this.emne) return null;

    return (
      <div>
        <Card title="Emne details">
          <Row>
            <Column width={2}>Name:</Column>
            <Column>{this.emne.emne_navn}</Column>
          </Row>
          <Row>
            <Column width={2}>Email:</Column>
            <Column>{this.emne.emne_kode}</Column>
          </Row>
        </Card>
        <Button.Light onClick={this.edit}>Edit</Button.Light>
      </div>
    );
  }

  mounted() {
    emneService.getEmne(this.props.match.params.id, emne => {
      this.emne = emne;
    });
  }

  edit() {
    history.push('/emner/' + this.emne.emne_kode + '/edit');
  }


};

class EmneEdit extends Component {
  emne = null;

  render() {
    if (!this.emne) return null;

    return (
      <div>
        <Card title="Edit Emne">
          <Form.Label>Name:</Form.Label>
          <Form.Input type="text" value={this.emne.emne_navn} onChange={e => (this.emne.emne_navn = e.target.value)} />
          <Form.Label>Kode:</Form.Label>
          <Form.Input type="text" value={this.emne.emne_kode} onChange={e => (this.emne.emne_kode = e.target.value)} />
        </Card>
        <Row>
          <Column>
            <Button.Success onClick={this.save}>Save</Button.Success>
          </Column>
          <Column>
            <Button.Success onClick={this.add}>Add</Button.Success>
          </Column>
          <Column right>
            <Button.Light onClick={this.cancel}>Cancel</Button.Light>
          </Column>
        </Row>
      </div>
    );
  }

  mounted() {
    emneService.getEmne(this.props.match.params.id, emne => {
      this.emne = emne;
    });
  }

  save() {
    emneService.updateEmne(this.emne, () => {
      history.push('/emner/' + this.props.match.params.id);
    });
  }

  cancel() {
    history.push('/emner/' + this.props.match.params.id);
  }
  add() {
    emneService.addEmne(this.emne.emne_navn,this.emne.emne_kode, () =>{
      emner.push();
    } )
  }
}



ReactDOM.render(
  <HashRouter>
    <div>
      <Menu />
      <Route exact path="/" component={Home} />
      <Route exact path="/students" component={StudentList} />
      <Route exact path="/students/:id" component={StudentDetails} />
      <Route exact path="/students/:id/edit" component={StudentEdit} />
      <Route exact path="/emner" component={EmneList} />
      <Route exact path="/emner/:id" component={EmneDetails} />
      <Route exact path="/emner/:id/edit" component={EmneEdit} />
    </div>
  </HashRouter>,
  document.getElementById('root')
);
