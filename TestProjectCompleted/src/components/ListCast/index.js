import React from 'react';
import CastItem from '../../components/CastItem';

import './index.css';

const ListCast = (props) => {

  //const movieItems = props.list.map(movie => {
    const movieItems = props.list.map(movie => {
    return <CastItem
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
              name={movie.person.name}
              //rating={movie.rating.average}
              imagePath= {movie.person.image.medium}    //{"http://static.tvmaze.com/uploads/images/medium_portrait/81/202627.jpg"}       //{movie.image.medium}
               />
  });

  return (
    <div className="list-container">{movieItems}</div>
  );

}

export default ListCast;
