import React, { Component, Fragment } from 'react';
import _ from 'lodash';
import { Form, FormGroup, Label, Input } from 'reactstrap';
import GameResults from './GameResults';

class Games extends Component {
  constructor(props) {
    super(props);

    // Local component state
    this.state = {
      currentPage: 0,
      allGames: [],
      pagedGames: []
    };
  }

  componentWillMount = async () => {
    const request = await fetch('http://localhost:5000/api/games');
    const data = await request.json();
    const pagedData = this.getPaginatedItems(data);

    // This will cause a re-render
    this.setState({ allGames: data, pagedGames: pagedData, currentPage: 0 });
  }

  onSearch = async () => {
    const term = this.search.value;
    const request = await fetch(`http://localhost:5000/api/games/${term}`);
    const data = await request.json();
    const pagedData = this.getPaginatedItems(data);

    // This will cause a re-render
    this.setState({ allGames: data, pagedGames: pagedData, currentPage: 0 });
  }

  // Move state to the clicked page number
  handlePageClick = (data) => {
    const pageNumber = data.selected + 1;
    const pagedData = this.getPaginatedItems(this.state.allGames, pageNumber);

    // This will cause a re-render
    this.setState({ pagedGames: pagedData, currentPage: data.selected });
  }

  // Convert the data from the server to a paged result set for the client
  getPaginatedItems = (items, pageNumber) => {
    const page = pageNumber || 1,
        perPage = 10,
        offset = (page - 1) * perPage,
        paginatedItems = _.drop(items, offset).slice(0, perPage);

    return {
        page: page,
        perPage: perPage,
        total: items.length,
        totalPages: Math.ceil(items.length / perPage),
        items: paginatedItems
    };
  }

  // We debounce the search function in order to provide a better UX / less lag on the screen while typing freaky fast
  onSearchDebounced = _.debounce(this.onSearch, 200)

  render() {
    return (
      <Fragment>
        <Form>
            <FormGroup>
              <Label for="search" hidden>Search</Label>
              <Input type="text" placeholder="Search for a game..." 
                innerRef={ref => { this.search = ref; }}
                onChange={this.onSearchDebounced} />
            </FormGroup>
        </Form>

        <GameResults data={this.state.pagedGames} currentPage={this.state.currentPage} onPageChange={this.handlePageClick} />
      </Fragment>
    );
  }
}

export default Games;
