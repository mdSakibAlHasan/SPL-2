import React from 'react'

export default function InfoShowCard(props) {
    const name=props.name;
    const designation = props.designation;
    const photo = props.photo;
    
  return (
    <>
        <div className=" mx-3 card shadow p-3 mb-5 bg-body-tertiary rounded" style={{width:"18rem",float:"left"}}>
        <img src={photo} className="card-img-top" alt={`Photo of ${name}`}/>
        <div className="card-body">
            <h5 className="card-title">{name}</h5>
            <p className="card-text">{designation}</p>
            <a href="/" className="btn btn-outline-info">Go to profile</a>
        </div>
        </div>
    </>
  )
}

InfoShowCard.defaultProps={
    photo: "aaa.jpg"
}