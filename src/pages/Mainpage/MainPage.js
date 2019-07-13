import React, { Component } from 'react';
// import Image from '../Image/Image'
import './MainPage.css';
import getWord from '../../fetchWord';
// import { get } from 'mongoose';

const Images = ['/Images/a.png','/Images/b.png','/Images/c.png','/Images/d.png','/Images/e.png','/Images/f.png','/Images/g.png']
const Alphabet = (()=>{
    let character = [];
    for(let i=65; i<=90; i++){
        character.push(String.fromCharCode(i))
    }
    return character;
})();

class MainPage extends Component{
    state = {
        word: null,
        secretWord: null,
        guessedLetter: [],
        wrongGuess: 0,
    }
   async componentDidMount(){
    await this.initializeState()
   }

    initializeState = async()=> {
    let word = await getWord();
    let secret = word.split('').map(letter=> '_').join('')
    this.setState({
        word,
        secret,
        wordCheck: word
    })
   }

    handleLetterClick = e =>{
    while (true){
        
    }
}

    
    render(){
        return(
            <>
          <div className="MainPage">MainPage
              <div className="Nav">
                  <div className="Categories">Categories</div>          
                  <div className="Difficulty">Difficulty</div>          
                  <div className="Highscore">Highscore</div>
               </div>
               <div className="Playarea">
                <div className="Guesszone">
                    <div className="Guess">Actual word
                    </div>
                    <div className="Keyboard">Virtual Keyboard
                        {Alphabet.map(letter=>
                            <button onClick={this.handleLetterClick}>{letter}</button>
                        )}
                    </div>
                </div>
                    <div className="Images">
                    <img style={{ height:"300px", width:"300px" }} src='https://i.imgur.com/Lg7gkA5.png' />
                    </div>
               </div>
                
          </div>
          <div className="Footer">footer</div>
            </>
        )  
    }
}
export default MainPage;

