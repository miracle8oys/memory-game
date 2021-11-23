import './SingleCard.css';
const SingleCard = ({card, handleChoice, handleClick, flipped}) => {

    handleClick = () => {
        handleChoice(card)
    }

    return ( 
        <div key={card.id} className="card">
            <div className={flipped ? "flipped" : ""}>
                <img src={card.src} className="front" alt="card front" />
                <img 
                src="/img/cover.png" 
                onClick={handleClick} 
                className="back" 
                alt="card back" 
                />
            </div>
        </div>
     );
}
 
export default SingleCard;