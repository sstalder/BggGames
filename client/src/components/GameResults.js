import React, { Component, Fragment } from 'react';
import { observer, inject } from 'mobx-react';
import { withRouter } from 'react-router-dom';
import { Link } from "react-router-dom";
import { Alert, ListGroup, ListGroupItem, Badge } from 'reactstrap';
import ReactPaginate from 'react-paginate';

@inject('app')
@withRouter
@observer
class GameResults extends Component {
  render() {
    // Ensure the component has the props:
    // data: { items, total, totalPages }
    // currentPage: Number, passed from the parent state
    // onPageChange: Function to call on page change, passed from the parent state

    const { items, total, totalPages } = this.props.data;

    return (
        <Fragment>
            <p>
                <Badge color="dark">Found {total} results</Badge>
            </p>

            <div className="results">
                {total > 0 ? (
                    <Fragment>
                        <ListGroup>
                        {items.map((game) => (
                            <ListGroupItem key={game.id}>
                                <Link to={`/${game.id}`}>{game.title}</Link>
                            </ListGroupItem>
                        ))}
                        </ListGroup>

                        <hr />

                        <ReactPaginate 
                            previousLabel={"Prev"}
                            previousClassName="page-item"
                            previousLinkClassName="page-link"
                            nextLabel={"Next"}
                            nextClassName="page-item"
                            nextLinkClassName="page-link"
                            breakLabel={<a href="" className="page-link">...</a>}
                            breakClassName={"page-item disabled"}
                            forcePage={this.props.currentPage}
                            pageCount={totalPages}
                            pageClassName="page-item"
                            pageLinkClassName="page-link"
                            marginPagesDisplayed={0}
                            pageRangeDisplayed={15}
                            onPageChange={(e) => this.props.app.goToPage(e.selected + 1)}
                            containerClassName={"pagination justify-content-center"}
                            subContainerClassName={"pages pagination justify-content-center"}
                            activeClassName={"page-item active"} />
                    </Fragment>
                ) : (
                    <Alert color="secondary">No games found for your search...</Alert>
                )}
            </div>
        </Fragment>
    );
  }
}

export default GameResults;
