import React, { Component } from 'react';
import './MainPage.css';
import getWord from '../../fetchWord';


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
        win:0
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
                secret: this.state.word
            })
            alert('you lose')
            this.initializeState()
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
                this.props.handleWin();


            }
        }, 500)
    }
}
  
    render(){
        return(
            <>
          <div className="MainPage">MainPage
              <div className="Nav">
                  <div className="Categories">Categories</div>          
                  <div className="Difficulty">Difficulty</div>          
                  <div className="MyScore">My Score     
                  {this.state.wins}
                  </div>          
                  <div className="Highscore">Highscore</div>
               </div>
               <div className="Playarea">
                <div className="Guesszone">
                    <div className="Guess">   
                    {this.state.secret}
                    
                    </div>
                    <div className="Keyboard">
                        {Alphabet.map(letter=>
                            <button disabled={this.state.disabledButtons && this.state.disabledButtons[letter]} onClick={this.handleLetterClick}>{letter}</button>
                        )}
                    </div>
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

