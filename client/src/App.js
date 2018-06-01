import React, { Component } from 'react';
import './App.css';
import { Form, FormGroup, Label, Input, Alert, ListGroup, ListGroupItem } from 'reactstrap';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      games: []
    };
  }

  componentWillMount = async () => {
    const request = await fetch('http://localhost:5000/api/games');
    const data = await request.json();

    this.setState({ games: data });
  }

  onSearch = async (e) => {
    const term = e.target.value;
    const request = await fetch(`http://localhost:5000/api/games/${term}`);
    const data = await request.json();

    this.setState({ games: data });
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Search some games & stuff</h1>
        </header>

        <div className="container">
          <Form>
            <FormGroup>
              <Label for="search" hidden>Search</Label>
              <Input type="text" placeholder="Search for a game..." onChange={this.onSearch} />
            </FormGroup>
          </Form>

          {this.state.games.length > 0 ? (
            <ListGroup>
              {this.state.games.map((game) => (
                <ListGroupItem key={game.id}>{game.title}</ListGroupItem>
              ))}
            </ListGroup>
          ) : (
            <Alert color="secondary">No games found for your search...</Alert>
          )}
        </div>
      </div>
    );
  }
}

export default App;
