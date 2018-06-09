import { observable, action } from 'mobx';
import _ from 'lodash';

export default class AppModel {
    @observable loading = true;
    @observable searchFor = '';
    @observable games = [];
    @observable game = {
        id: 0,
        title: '',
        rank: '',
        sleeveData: '',
        gameLink: '',
        listLink: '',
        rankLink: ''
    };
    @observable gamesPaged = [];
    @observable currentPage = 1;
    @observable itemsPerPage = 10;

    @action
    async loadGames(searchFor) {
        if (searchFor) {
            this.currentPage = 1; // Reset page # on searching
            this.searchFor = searchFor;
        }

        // If you delete your search
        if (this.searchFor !== '' && searchFor === '') {
            this.searchFor = '';
        }

        const request = await fetch(`//api.sleevedb.com/api/games/${this.searchFor}`);
        const data = await request.json();

        if (data) {
            this.games = observable(data);

            this.goToPage(this.currentPage);
        }

        this.loading = false;
    }

    @action
    async loadGame(id) {
        const request = await fetch(`//api.sleevedb.com/api/game/${id}`);
        const data = await request.json();

        this.game = observable(data);
    }

    @action
    goToPage(pageNumber) {
        const pagedItems = this.getPaginatedItems(this.games, pageNumber, this.itemsPerPage);

        this.gamesPaged = observable(pagedItems);
        this.currentPage = pageNumber;
    }

    @action
    getPaginatedItems(items, pageNumber) {
        const page = pageNumber || 1,
            perPage = this.itemsPerPage || 10,
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
}