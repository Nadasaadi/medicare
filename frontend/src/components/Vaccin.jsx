import React from 'react'

const Vaccin = ({vaccins}) => {
  return (
    <div id='vaccin' className="vaccin-container">
    <h2>Vaccins</h2>
    {vaccins.map((vaccin, index) => (
      <div key={index} className="vaccin">
        <p>Nom du Vaccin: {vaccin.nom}</p>
        <p>Date de Vaccination: {vaccin.date}</p>
      </div>
    ))}
  </div>
  )
}

export default Vaccin