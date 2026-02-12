import React, { useEffect, useRef, useState } from "react";
import './TitleCard.css'
import cards_data from '../../assets/cards/Cards_data'


const TitleCards = ({title, category}) => {


    const [apiData, setApiData] = useState([]);
    const cardsRef = useRef();

    const options = {
    method: 'GET',
    headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5NWViY2QxMzlhZjc0NDkxNmFiOTMxZmIwZjY0OGU2NCIsIm5iZiI6MTc2NzAxNTk3NS42NDIsInN1YiI6IjY5NTI4NjI3ZTIzMjM3M2MwZGMzN2M0ZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.DIGa2HEknBx48ZVM4mVa0E7qfmogPQq2p8RXoJ89ckg'
    }
    };

   
   const handleWheel = (event) => {
   event.preventDefault();
   cardsRef.current.scrollLeft += event.deltaY;
   }

    useEffect(()=> {

        const fetchCategory = category ? category : "now_playing";

        fetch(`https://api.themoviedb.org/3/movie/${fetchCategory}?language=en-US&page=1`, options)
       .then(res => res.json())
       .then(res => {
        if(res.results){
            setApiData(res.results)
        }
       })
       .catch(err => console.error(err));

       const currentRef = cardsRef.current;

    cardsRef.current.addEventListener('wheel', handleWheel);
    }, [category])

    
    return(
        <div className="title-cards">
            <h2>{title?title:"Popular on Netflix"}</h2>
            <div className="card-list" ref={cardsRef}>
                {apiData?.map((card, index)=> {
                    return <div className="card" key={index}>
                        <img src={`https://image.tmdb.org/t/p/w500`+ card.backdrop_path} alt="" />
                        <p>{card.original_title}</p>
                    </div>
                })}
            </div>
        </div>
    );
};

export default TitleCards;