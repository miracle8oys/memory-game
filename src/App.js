import {useLayoutEffect, useState } from 'react';
import './App.css';
import SingleCard from './components/SingleCard';

const cartImages = [
  {"src": "/img/helmet-1.png", matched: false},
  {"src": "/img/potion-1.png", matched: false},
  {"src": "/img/ring-1.png", matched: false},
  {"src": "/img/scroll-1.png", matched: false},
  {"src": "/img/shield-1.png", matched: false},
  {"src": "/img/sword-1.png", matched: false}
]

function App() {

  const [cards, setCards] = useState([]);
  const [turns, setTurns] = useState(0);

  const [firstChoice, setFirstChoice] = useState(null);
  const [secondChoice, setSecondChoice] = useState(null);

  const shuffleCards = () => {
    const shuffledCards = [...cartImages, ...cartImages]
    .sort(() => Math.random() - 0.5)
    .map((card) => ({...card, id: Math.random()}));

    setCards(shuffledCards);
    setTurns(0);
  }

  const handleChoice = (card) => {
    //firstChoice ? setSecondChoice(card) : setFirstChoice(card);
    if (firstChoice === null) {
      setFirstChoice(card);
    } else if (secondChoice === null) {
      setSecondChoice(card);
    }
    //compareChoice();
  }

  useLayoutEffect(() => {
    if (firstChoice && secondChoice) {

      const choiceMatched = () => {
        if (firstChoice.src === secondChoice.src) {
          setCards(cards => {
            return cards.map(card => {
              if (card.src === firstChoice.src) {
                return {...card, matched: true}
              } else {
                return card
              }
            });
          })
        }
      }
      //choiceMatched has assign in this function cause its use useeffect
      choiceMatched();

      const resetTurn = () => {
        setTimeout(() => {
          setFirstChoice(null);
          setSecondChoice(null);
          setTurns(turn => turn+1);
        }, 1000)
      }
      resetTurn();
    }
  }, [firstChoice, secondChoice]);

  

  

  // const compareChoice = () => {
  //   if (firstChoice.src == secondChoice.src) {
      
  //   }
  // }

  return (
    <div className="App">
          <h1>Memory Game</h1>
          <button onClick={shuffleCards}>New Game</button>
          <div className="card-grid">
            {cards.map(card => (
              <SingleCard 
              handleChoice={handleChoice} 
              card={card} key={card.id} 
              flipped={card === firstChoice || card === secondChoice || card.matched}
              />
            ))}
        </div>
        <p>Turns: {turns}</p>
    </div>
  );
}

export default App;
