import React from 'react'
import { GoHeart } from "react-icons/go";
import { GoHeartFill } from "react-icons/go";

function Response() {
    const {isLiked, setIsLiked} = useState({
        one: false,
        two: false,
        three: false,
        four: false,
    });

    const handleLike = (id) => {
        setIsLiked((prevState) => {
            return {
                ...prevState,
                [id]: !prevState[id],
            };
        });
    };
  return (
    <>
        <div>
            <button>Edit your choices</button>
        </div>
        <div>
            <div>
                <button onClick={handleLike}>{isLiked.one ? <GoHeart/> : <GoHeartFill/>}</button>
                <img src={/*add later*/} alt={/*add later*/} />
                <h3>{/*name*/}</h3>
            </div>
            <div>
                <button onClick={handleLike}>{isLiked.two ? <GoHeart/> : <GoHeartFill/>}</button>
                <img src={/*add later*/} alt={/*add later*/} />
                <h3>{/*name*/}</h3>
            </div>
            <div>
                <button onClick={handleLike}>{isLiked.three ? <GoHeart/> : <GoHeartFill/>}</button>
                <img src={/*add later*/} alt={/*add later*/} />
                <h3>{/*name*/}</h3>
            </div>
            <div>
                <button onClick={handleLike}>{isLiked.four ? <GoHeart/> : <GoHeartFill/>}</button>
                <img src={/*add later*/} alt={/*add later*/} />
                <h3>{/*name*/}</h3>
            </div>
            <div>
                <button>Regenerate</button>
            </div>
        </div>
    </>
  )
}

export default Response