import React, { Component, Fragment } from 'react';
import { observer, inject } from 'mobx-react';
import { withRouter } from 'react-router-dom';
import { NavLink } from "react-router-dom";
//import { Alert, ListGroup, ListGroupItem, Badge } from 'reactstrap';

@inject('app')
@withRouter
@observer
class GameDetails extends Component {
  async componentDidMount() {
    const { match } = this.props;
    
    await this.props.app.loadGame(match.params.gameId);
  }

  render() {
    const { game } = this.props.app;
    const { match } = this.props;

    return (
        <Fragment>
            <h1>{game.title}</h1>

            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
              <a className="navbar-brand" href={match.url}>Links:</a>

              <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
              </button>

              <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav">
                  <li className="nav-item">
                    <a href={game.gameLink} className="nav-link" target="_blank">Game Link</a>
                  </li>
                  <li className="nav-item">
                  <a href={game.listLink} className="nav-link" target="_blank">List Link</a>
                  </li>
                  <li className="nav-item">
                  <a href={game.rankLink} className="nav-link" target="_blank">Rank Link</a>
                  </li>
                </ul>
              </div>
            </nav>

            <br />

            <div className="card">
              <div className="card-body">
                <h5 className="card-title">Sleeve Data</h5>

                <h6 className="card-subtitle mb-2 text-muted">Rank #: {game.rank}</h6>

                <hr />

                <div className="card-text" dangerouslySetInnerHTML={{__html: game.sleeveData}}></div>
              </div>
            </div>

            <hr />

            <NavLink to="/" className="btn btn-secondary">Back to List</NavLink>
        </Fragment>
    );
  }
}

export default GameDetails;
