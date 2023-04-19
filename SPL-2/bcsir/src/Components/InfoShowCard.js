import React,{useEffect, useState} from 'react'


export default function InfoShowCard(props) {
    const name=props.name;
    const designation = props.designation;
    const ID = props.ID;
    const photo = props.photo;

    const [imageSrc, setImageSrc] = useState(null);

  useEffect(() => {
    const handlImage = async () => {
    import(`./photo/${photo}`)
        .then(image => setImageSrc(image.default))
        .catch(error => console.error(error, "occur here"));
    };
    handlImage();
  }, [ID]);

  
  return (
    <>
        <div className=" mx-3 card shadow p-3 mb-5 bg-body-tertiary rounded" style={{width:"18rem",float:"left"}}>
        <img style={{height:"300px" }} src={imageSrc} className="card-img-top" alt={`Photo of ${name}`}/>
        <div className="card-body">
            <h5 className="card-title">{name}</h5>
            <p className="card-text">{designation}</p>
            <a  href={`/profile/${ID}`} className="btn btn-outline-info" >Go to profile</a>
        </div>
        </div>
    </>
  )
}

