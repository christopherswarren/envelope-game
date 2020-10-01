import React, { Component } from 'react';
import moment from 'moment';
import Card from 'react-bootstrap/Card';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faPause } from '@fortawesome/free-solid-svg-icons'

class Gameprogress extends Component {
  constructor(props) {
    super(props);
    this.state = {
      seatsFullError: false,
      disabled: false
    }
    this.togglePlay = this.togglePlay.bind(this);
    this.seatsNotFull = this.seatsNotFull.bind(this);
  }


async togglePlay(val) {

  this.setState({disabled : true});
  this.setState({seatsFullError: false});
  console.log(this.props.is_started);
  if (!this.props.is_started) {
    console.log("in toggle");
    const response = await fetch(`/api/start-game/${this.props.facilitatorGets}/${this.props.gameID}`)
    const json = await response.json();
    console.log(json);
  }
  else {
    console.log("in else");
    const response = await fetch(`/api/stop-game/${this.props.facilitatorGets}/${this.props.gameID}`)
    const json = await response.json();
    console.log(json);
  }
  this.setState({disabled: false});

}

seatsNotFull() {
  this.setState({seatsFullError: true});
}
  
  render() {
    let ic = this.props.is_started ? faPause : faPlay;
    const profitPerEnvelope = 22;
    const facilID = this.props.facilitatorGets;
    return (
      <div >
        
        <Card style={{ width: '25em' }}>
          <Card.Body>
          
            <h1>Money Earned</h1>
            {facilID && 
              <FontAwesomeIcon icon={ic} spin onClick={this.props.seatsFull ? this.togglePlay : this.togglePlay} disabled={this.state.disabled}/>
            }
            {facilID && this.state.seatsFullError && 
              <h5>Error: Seats are not Full yet</h5>
            }
            <p> {this.props.t1Name} --- VS --- {this.props.t2Name}</p>
            <h2 >
              ${profitPerEnvelope * 0}
                    &nbsp;&nbsp;&nbsp;&nbsp;
                      
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    ${profitPerEnvelope * 0}
            </h2>
            
          </Card.Body>
        </Card>
      </div>
    );
  }
}

export default Gameprogress;
