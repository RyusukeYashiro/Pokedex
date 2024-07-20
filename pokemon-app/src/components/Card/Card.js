import React from 'react';
import "./Card.css";

const Card = ({pokemon}) => {
  return (
    <div className='card'>
        <div className='cardImg'>
            <img src={pokemon.sprites.front_default} alt=''></img>
        </div>
        <h3 className='cardName'>
            {pokemon.name}
        </h3>
        <div className='cardTypes'>
            <div>タイプ</div>
            {pokemon.types.map((type) => {
                return (
                    <div key={type.type.name}>
                        <span className='typename'>
                            {type.type.name}
                        </span>
                    </div>
                );
            })}
        </div>
        <div className='cardInfo'>
            <div className='cardData'>
                <p className='title'>重さ : {pokemon.weight}</p>
            </div>
            <div className='cardData'>
                <p className='title'>高さ : {pokemon.height}</p>
            </div>
            <div className='cardData'>
                <p className='title'>特性１ : {pokemon.abilities[0].ability.name || 'なし'}</p>
            </div>
            <div className='cardData'>
                <p className='title'>特性２ : {pokemon.abilities[1]?.ability.name || 'なし'}</p>
            </div>
        </div>
    </div>
  );
};

export default Card;