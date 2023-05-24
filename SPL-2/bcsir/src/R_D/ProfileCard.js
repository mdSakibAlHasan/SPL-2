import React,{useEffect, useState} from 'react'


const ProfileCard = ({ name, designation, ID, photo, dept, onClick }) => {
    const [imageSrc, setImageSrc] = useState(null);

    const handleClick = () => {
        console.log(ID," here click")
      onClick(ID,name); // Pass the name to the onClick callback
    };
  
   

  useEffect(() => {
    const handlImage = async () => {
        console.log(name,designation,ID,photo,"--------");
    import(`./../Components/photo/${photo}`)
        .then(image => setImageSrc(image.default))
        .catch(error => console.error(error, "occur here"));
    };
    handlImage();
  }, [ID]);

  
  return (
    <>
        <div className=" mx-3 card shadow p-3 mb-5 shade3 rounded" style={{float:"left"}}>
        <img style={{height:"300px" }} src={imageSrc} className="card-img-top" alt={`Photo of ${name}`}/>
        <div className="card-body">
            <h5 className="card-title display-6">{name}</h5> <hr/>
            <p className="card-text">{designation}</p>
            <p className="card-text">{dept}</p>
            <button className="profile-button" onClick={handleClick}>
                Select
            </button>
        </div>
        </div>
    </>
  )
}

export default ProfileCard;

