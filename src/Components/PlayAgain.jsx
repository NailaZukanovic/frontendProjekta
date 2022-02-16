import React, { Component } from 'react';
import { Link } from "react-router-dom";
import './Game.css';

export default class PlayAgain extends Component {

  reloadPage = () => {
    document.location.reload(true)
  }

  render() {

    return (
      <div className="playagainbutton">
        <button className="button" onClick={this.reloadPage}>Again!</button>
        <Link to="/Notes"><button className="button">Go Back</button></Link>
      </div>
    );
  }
}