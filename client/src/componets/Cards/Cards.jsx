import React from 'react'

import './Cards.css'
import Card from '../Card/Card'

function Cards ({allDogs}){
                                        //mapeo de las props de dog solicitadas por el componente cards
    return (

        <div className='cards-container'>     
            {allDogs?.map(dog =>(
                <Card key={dog.id} dog={dog}/> ))}  
        </div>

    )
}

export default Cards
