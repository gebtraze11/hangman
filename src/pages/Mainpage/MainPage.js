import React, { Component } from 'react';
import './MainPage.css';
import getWord from '../../fetchWord';
import userService from '../../utils/userService';

const Images = ['/Images/a.png','/Images/b.png','/Images/c.png','/Images/d.png','/Images/e.png','/Images/f.png','/Images/g.png']
const Alphabet = (()=>{
    let character = [];
    for(let i=97; i<=122; i++){
        character.push(String.fromCharCode(i))
    }
    return character;
})();

class MainPage extends Component{
    state = {
        word: null,
        secretWord: null,
        wrongGuess: 0,
        win:0,
        hint: null
    }

    async componentDidMount(){
        await this.initializeState()
        let userScore = await userService.getHighScore()
        console.log(userScore)
    }

    initializeState = async()=> {
        let word = await getWord();
        let secret = word.split('').map(letter=> '_').join('')

        this.setState({
            gameOver: null,
            hint: null,
            word,
            secret,
            wrongGuess: 0,
            wins: await this.props.getWinScore(),
            disabledButtons: (() => {
                let temp = {};
                for(let i=97; i<=122; i++) {
                    temp[String.fromCharCode(i)] = false;
                }
                return temp;
            })() 
        })
    }


    handleLetterClick = async(e) =>{

        if (this.state.gameOver === null){
            let disabledButtons = this.state.disabledButtons
            let value = e.target.innerHTML.toLowerCase()
            disabledButtons[value] = true;
            let found = false
            let secret = this.state.secret.split('')

            this.state.word.split('').forEach((letter, i)=>{
                if (letter === value){
                    found = true;
                    secret[i]= value;
                }
            })
            this.setState({
                disabledButtons
            })         
            if (!found){
                if (this.state.wrongGuess+1 === 6){
                this.setState({
                    gameOver: 'loose'
                })
                }
                this.setState({
                    wrongGuess: this.state.wrongGuess + 1
                })
            } else {
                await this.setState({
                    secret: secret.join('')
                })
                setTimeout(()=>{
                    if (!this.state.secret.includes('_')){
                        this.setState({
                            gameOver:'win'
                        })
                        this.props.handleWin();
                    }
                }, 500)
            }
        }
    }


    DisplayResult = () =>{
        if (this.state.gameOver){
            if(this.state.gameOver === 'win'){
                return <div>Congratulation!!! You guessed the word.
                    <br></br>
                
                    <button onClick={this.initializeState}>Play Again</button>
                </div>
            }else if(this.state.gameOver === 'loose'){
                return <div>OOPS!!
                    <br></br>
                    The word was: <a href={`https://www.vocabulary.com/dictionary/${this.state.word}`} target='_blank'>{this.state.word}</a>.<br/>
                    <p>Want to know the meaning?? </p><a href={`http://www.just-fucking-google.it?s=${this.state.word}aple&e=finger`} target='_blank'>click here</a>
                    <br/>
                    <button onClick={this.initializeState}>Play Again</button>
                </div>
            }
        } else {
            return null;
        }
    }

    
        
    revealHint=()=>{
        var Word = this.state.word
        var secretWord = this.state.secret
        let hiddenLetters = []
        secretWord.split('').forEach((char, i)=>{
            if (char === '_'){
                hiddenLetters.push(Word[i])
            }
        })
        let wordLength = hiddenLetters.length
        let idx= Math.floor(Math.random() * wordLength);
        console.log('test')
        this.setState({
            hint: (hiddenLetters[idx])
        })
        
    }

  
    render(){
        return(
            <>
          <div className="MainPage">
              <div className="Nav">
                  <div className="Categories">Categories:  
                  <select disabled>
                    <option >General Words</option>
                    <option >Movie</option>
                    <option >Cars</option>
                  </select>
                  </div>          
                  <div className="Difficulty">Difficulty:  
                  <select disabled>
                    <option >Easy</option>
                    <option >Hard</option>
                  </select>
                  </div>          
                  <div className="MyScore">My Score:   
                  {this.state.wins}
                  
                  </div>     
                  <div> <a href="/highscore">High Score</a> </div>     
               </div>
               <div className="Playarea">
                <div className="Guesszone">
                    <div className="Guess">   
                        {this.state.secret ? this.state.secret : <p>Loading...</p>}
                    </div>
                    <div className="Keyboard">
                        {Alphabet.map(letter=>
                            <button disabled={this.state.disabledButtons && this.state.disabledButtons[letter]} onClick={this.handleLetterClick}>{letter}</button>
                        )}
                    </div>
                    {this.state.word}
                    <p> <button onClick={this.revealHint} disabled={this.state.hint==='null'}>Hint</button>    {this.state.hint}</p>
                        <this.DisplayResult/>
                </div>
               
                    <div className="Images">
                    <img style={{ height:"350px", width:"393px" }} src={Images[this.state.wrongGuess]} />
                    </div>
               </div>
                
          </div>
          <div className="Footer">footer</div>
            </>
        )  
    }
}
export default MainPage;

