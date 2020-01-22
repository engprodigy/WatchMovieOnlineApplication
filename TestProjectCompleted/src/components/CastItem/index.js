import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import './index.css';

class CastItem extends Component {

  constructor(props) {
    super(props);

    this.state = {
      favorited: false,
      toWatchLater: false
    };

  }

  

  titleURL = (title) => title.replace(/\W+/g, '-').toLowerCase()

  processLists = (listObj, id, state) => {
    if (listObj) {
      Object.keys(listObj).forEach((key) => {
        const stateObject = () => {
          const obj = {};
          obj[state] = true;
          return obj;
        }
        if (listObj[key] === id) {
          this.setState(stateObject);
        }
      });
    }
  }

  componentWillMount = () => {
    if (this.props.authenticated){
      this.processLists(this.props.favorites, this.props.id, 'favorited');
      this.processLists(this.props.watchLater, this.props.id, 'toWatchLater');
    }
  }

  componentWillReceiveProps = (nextProps) => {
    if (nextProps.authenticated){
      this.processLists(nextProps.watchLater, nextProps.id, 'toWatchLater');
      this.processLists(nextProps.favorites, this.props.id, 'favorited');
    }
  }

  

 

  render () {

    return (
      <div key={this.props.id} className="list-container__movie-item">
       

        <div className="list__movie-image">
          {/*this.props.posterPath ? (*/
          this.props.imagePath ?(
            <div>
              <div className="list__movie-actions">
                

                <svg width="10" height="15" className="list__movie-action action__playtrailer" viewBox="0 0 10 15" xmlns="http://www.w3.org/2000/svg"><path d="M.013.135L9.7 7.5.012 14.865" /></svg>

                
              </div>

              <Link className="list__movie-image-link" to={`/movie/${this.props.id}-${this.titleURL(this.props.name)}`}><img src={this.props.imagePath} alt={this.props.name}/></Link>
            </div>

          )
          : (
            <div>
              <div className="list__movie-actions">
                
                <svg width="10" height="15" className="list__movie-action action__playtrailer" viewBox="0 0 10 15" xmlns="http://www.w3.org/2000/svg"><path d="M.013.135L9.7 7.5.012 14.865" /></svg>
              </div>
              <Link to={`/movie/${this.props.id}`}><div className="list__movie-no_image_holder"></div></Link>
            </div>
            )
          }
        </div>

        <div className="list__movie-title">
        {this.props.name}
        </div>
      </div>
    );
  }
}

export default CastItem;
