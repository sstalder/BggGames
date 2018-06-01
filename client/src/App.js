import React, { Component } from 'react';
import _ from 'lodash';
import { Form, FormGroup, Label, Input, Alert, ListGroup, ListGroupItem, Badge } from 'reactstrap';

import './App.css';

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

  onSearch = async () => {
    const term = this.search.value;
    const request = await fetch(`http://localhost:5000/api/games/${term}`);
    const data = await request.json();

    this.setState({ games: data });
  }

  onSearchDebounced = _.debounce(this.onSearch, 250)

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
              <Input type="text" placeholder="Search for a game..." 
                innerRef={ref => { this.search = ref; }}
                onChange={this.onSearchDebounced} />
            </FormGroup>
          </Form>

          {this.state.games.length > 0 ? (
            <div>
              <p>
                <Badge color="dark">Found {this.state.games.length} results</Badge>
              </p>
              
              <ListGroup>
                {this.state.games.map((game) => (
                  <ListGroupItem key={game.id}>{game.title}</ListGroupItem>
                ))}
              </ListGroup>
            </div>
          ) : (
            <Alert color="secondary">No games found for your search...</Alert>
          )}
        </div>
      </div>
    );
  }
}

export default App;
