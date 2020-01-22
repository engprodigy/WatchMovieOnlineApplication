import React from 'react';
import MovieItem from '../../components/MovieItem';

import './index.css';

const ListSearch = (props) => {

  const movieItems = props.list.map(movie => {
    console.log(movie.show.image);
    if ( movie.show.image != null) {
    return <MovieItem
              /*key={movie.id}
              id={movie.id}
              voteAverage={movie.vote_average}
              posterPath={movie.poster_path}
              title={movie.title}
              authenticated={props.authenticated}
              onFavoriteSelect={(selectedMovie, userList) => props.addToList(selectedMovie, userList)}
              onFavoriteDeselect={(selectedMovie, userList) => props.removeFromList(selectedMovie, userList)}
              favorites={props.favorites}
              watchLater={props.watchLater} />*/

              
              key={movie.show.id}
              id={movie.show.id}
              url={movie.show.url}
              rating={movie.show.rating.average}
              imagePath={movie.show.image.medium}  //{"http://static.tvmaze.com/uploads/images/medium_portrait/81/202627.jpg"}       //{movie.image.medium}
              title={movie.show.name}
              authenticated={props.authenticated}
              onFavoriteSelect={(selectedMovie, userList) => props.addToList(selectedMovie, userList)}
              onFavoriteDeselect={(selectedMovie, userList) => props.removeFromList(selectedMovie, userList)}
              favorites={props.favorites}
              watchLater={props.watchLater} />
      }
  });

  return (
    <div className="list-container">{movieItems}</div>
  );

}

export default ListSearch;
