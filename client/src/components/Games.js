import React, { Component, Fragment } from 'react';
import { observer, inject } from 'mobx-react';
import { withRouter } from 'react-router-dom';
import _ from 'lodash';
import { Form, FormGroup, Label, Input } from 'reactstrap';
import GameResults from './GameResults';

@inject('app')
@withRouter
@observer
class Games extends Component {
  async componentDidMount() {
    await this.props.app.loadGames();
  }

  onSearch = async () => {
    const term = this.search.value;

    await this.props.app.loadGames(term);
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
                defaultValue={this.props.app.searchFor}
                onChange={this.onSearchDebounced} />
            </FormGroup>
        </Form>

        <GameResults data={this.props.app.gamesPaged} currentPage={this.props.app.currentPage-1} />
      </Fragment>
    );
  }
}

export default Games;
