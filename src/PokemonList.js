import React from 'react'

export default function pokemonlist({pokemon}) {
    return (
        <div>
            {pokemon.map(item => (
                <div key={item}>{item}</div>
            ))}
        </div>
    )
}
