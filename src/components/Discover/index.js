import React, { Component } from 'react';
import { API_KEY, PATH_BASE, PATH_DISCOVER, PATH_MOVIE, DEFAULT_PAGE, PATH_PAGE, PATH_SHOW } from '../../api';
import List from '../../components/List';
import Button from '../../components/Button';
import Dropdown from 'react-dropdown';

import './index.css';

class Discover extends Component {

  constructor(props) {
    super(props);

    this.state = {
      movies: {},
      loading: true
    };

  }

  componentDidMount = () => {
    this.getMovies(DEFAULT_PAGE);
    
  }

  componentDidUpdate = (prevProps, prevState) => {
    if (prevProps.filters !== this.props.filters){
      this.getMovies(DEFAULT_PAGE)
    }
    
  }

  getMovies = (page) => {
    /*fetch(`
      ${PATH_BASE}${PATH_DISCOVER}${PATH_MOVIE}?api_key=${API_KEY}&${PATH_PAGE}${page}
      &language=en-US&region=us&include_adult=false&vote_count.gte=200
      &primary_release_year=${this.props.filters.year}
      &vote_average.gte=${this.props.filters.rating.min}
      &vote_average.lte=${this.props.filters.rating.max}
      &with_runtime.gte=${this.props.filters.runtime.min}
      &with_runtime.lte=${this.props.filters.runtime.max}
      &sort_by=${this.props.filters.sort_by.value}.${this.props.filters.order.value}`
    )*/
    fetch(`
      ${PATH_BASE}${PATH_SHOW}?${PATH_PAGE}${page}`
    )
    .then(response => response.json())
    .then(movies => {
      this.setMovies(movies)
    });
  }

  setMovies = (movies) => {
    //const { results, page } = movies;
    const results  = movies;
    var filters = this.props.filters;
    
    if(results[1].premiered.slice(0, 4) == filters.year){
      //{console.log(results[1].premiered.slice(0, 4))}
      {console.log(results[1].runtime)}
    }
    var filteredResults =  results.filter(function(result) {
      return result.rating.average > filters.rating.min &&
             result.rating.average < filters.rating.max 
            && result.premiered.slice(0, 4) ==  filters.year
            && result.runtime > filters.runtime.min
            && result.runtime < filters.runtime.max ;
    });


     if(filters.sort_by.value == 'vote_average'){

      if(filters.order.value == 'desc') {
      filteredResults.sort(function (a,b){
          return  b.rating.average - a.rating.average ;
       });
      }else{
        filteredResults.sort(function (a,b){
          return  a.rating.average - b.rating.average ;
       });

      }

     }else if (filters.sort_by.value == 'original_title'){
      if(filters.order.value == 'desc') {
       
        filteredResults.sort(function (a,b) {
        var nameA  = a.name.toUpperCase();
        var nameB =  b.name.toUpperCase();
        if (nameA < nameB) {
          return -1;
        }
        if (nameA > nameB) {
          return 1;
        }
      
        // names must be equal
        return 0;
     });

        }else{


          filteredResults.sort(function (a,b) {
            var nameA  = a.name.toUpperCase();
            var nameB =  b.name.toUpperCase();
            if (nameA < nameB) {
              //return -1;
              return 1;
             }
            if (nameA > nameB) {
              //return 1;
              return -1;
            }
          
            // names must be equal
            return 0;
         });

            

        }

     } else if (filters.sort_by.value == 'popularity') {

              if(filters.order.value == 'desc') {

               filteredResults.sort(function (a,b) {
               return  b.weight - a.weight;

              });

               }else{
       
                 filteredResults.sort(function (a,b) {
                 return  a.weight - b.weight ;
                 });

        }
  }

    const page = 1;
    const oldResults = page !== 1
      ? this.state.movies.results
      : []

    const updatedResults = [
      ...oldResults,
      ...filteredResults
    ]
    {console.log(this.props.filters)}
    this.setState({
      movies: { results: updatedResults, page },
      loading: false
    })
  }

  render () {

    const { movies } = this.state;
    const { results, page } = movies;
    //{console.log(results)}
   // {console.log(this.props.filters.filters.order)}
    const sort_by = [
      { value: 'popularity', label: 'Popularity' },
      { value: 'vote_average', label: 'Rating' },
      { value: 'original_title', label: 'Original Title' }];
    const sort_by_order = [
      { value: 'asc', label: 'Ascending' },
      { value: 'desc', label: 'Descending' }
    ];
    
    return (
      <div className="Main-wrapper">
        <h1 className="App-main-title Discover-main-title">{this.props.title}</h1>
        <h2 className="discover-tagline">— browse movies by year, ratings and duration.</h2>

        <div className="sort-order">
          <div className="sort-order__item">
            <span className="sort-order-label">Sort by</span>
            <Dropdown
              className="test"
              options={sort_by}
              value={`${this.props.filters.sort_by.label}`}
              onChange={sort_by => this.props.updateFilters({ ...this.props.filters, sort_by: sort_by })} />
          </div>
          <div className="sort-order__item">
            <span className="sort-order-label">Order by</span>
            <Dropdown
              className="test"
              options={sort_by_order}
              value={`${this.props.filters.order.label}`}
              onChange={order => this.props.updateFilters({ ...this.props.filters, order: order })} />
          </div>
        </div>

        { results &&
          <List
            list={results}
            addToList={(selectedMovie, userList) => this.props.addToList(selectedMovie, userList)}
            removeFromList={(selectedMovie, userList) => this.props.removeFromList(selectedMovie, userList)}
            authenticated={this.props.authenticated}
            favorites={this.props.favorites}
            watchLater={this.props.watchLater}
         />
        }
        <Button
          className="button"
          onClick={() => this.getMovies(page + 1)}
          text="Load more"
         />
      </div>
    );

  }
}

export default Discover;
