import React, { Component } from 'react';
import userService from '../../utils/userService'
// import { unlink } from 'fs';


class HighScore extends Component{
  state = {
    highscore: []
  }
  async componentDidMount(){
    let userScore = await userService.getHighScore()
    this.setState({
      highscore: userScore
    })
    console.log(userScore)
}

  render(){

    console.log(this.state.highscore)

    return(
      <ol>{this.state.highscore.map(e=>

        <li>{e.name}:{e.wins}</li>
        )}
      </ol>
    )
  }
}
export default HighScore;