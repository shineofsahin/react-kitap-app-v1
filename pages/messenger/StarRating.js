import {useEffect,useState,useContext,useRef} from 'react'
import axios from "axios";

const StarRating = ({otheruser,currentUser}) => {
    const [rating, setRating] = useState(0);
    const [hover, setHover] = useState(0);

    const ratingHandler =(index)=>{
      try {
        const packet2 ={
          userId: currentUser._id,
          ratings: otheruser.totalrating + index,
        }
        axios.put("/rating/" + otheruser._id , { packet2 });
      } catch (err) {}
   window.location.reload();
      
    }
    return (
      <div className="star-rating">
        {[...Array(5)].map((star, index) => {
          index += 1;
          return (
            <button
              type="button"
              key={index}
              className={index <= (hover || rating) ? "on" : "off"}
              onClick={() => {setRating(index); ratingHandler(index)}}
              onMouseEnter={() => setHover(index)}
              onMouseLeave={() => setHover(rating)}
            >
              <span className="star">&#9733;</span>
            </button>
          );
        })}
      </div>
    );
  };

  export default StarRating;