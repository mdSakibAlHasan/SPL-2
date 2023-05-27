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
        <div className="shade3 mx-3 shadow p-3 mb-5 rounded" style={{width:"18rem",float:"left"}}>
        <img style={{height:"300px" }} src={imageSrc} className="card-img-top" alt={`Photo of ${name}`}/>
        <div className="shade3 card-body">
            <h4 className=" m-2">{name}</h4>
            <small className="card-text">({designation})</small>
            <center>
              <a  href={`/profile/${ID}`} className="m-3 btn btn-outline-light" >Go to profile</a>
            </center>
            
        </div>
        </div>
    </>
  )
}

