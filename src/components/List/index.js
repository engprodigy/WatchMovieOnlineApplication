import React from 'react';
import MovieItem from '../../components/MovieItem';

import './index.css';

const List = (props) => {

  const movieItems = props.list.map(movie => {
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

              
              key={movie.id}
              id={movie.id}
              url={movie.url}
              rating={movie.rating.average}
              imagePath= {movie.image.medium}    //{"http://static.tvmaze.com/uploads/images/medium_portrait/81/202627.jpg"}       //{movie.image.medium}
              title={movie.name}
              authenticated={props.authenticated}
              onFavoriteSelect={(selectedMovie, userList) => props.addToList(selectedMovie, userList)}
              onFavoriteDeselect={(selectedMovie, userList) => props.removeFromList(selectedMovie, userList)}
              favorites={props.favorites}
              watchLater={props.watchLater} />
  });

  return (
    <div className="list-container">{movieItems}</div>
  );

}

export default List;
