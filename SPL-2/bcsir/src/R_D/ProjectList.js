import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { getSetCookie } from '../Set_up_profile/CookiesHandle';

const projects = [
  {
    id: 1,
    title: 'Project 1',
    leader: 'FAhim',
    teammates: ['sakib','momin'],
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    progress: 50,
  },
  {
    id: 2,
    title: 'Project 2',
    leader: 'Sakib',
    teammates: ['fahim','momin'],
    description: 'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    progress: 75,
  },

];

const ProjectList = () => {
  const [updatedProjects, setUpdatedProjects] = useState(projects);
  const [editPermission, setEditpermission] = useState(false);
  const [projectLists, setProjectList] = useState([]);


  var result;
  useEffect(() => {
    function handleCookie() {
      result = getSetCookie('my_cookies');
    }
    handleCookie();
  }, []);

  useEffect(() => {
    const handleProfileClick = async () => {
      const output = await axios.post('http://localhost:3001/RD/getProjectList');
      setProjectList(output.data);
      const input = {
        cookieID: result,
      };
      input.cookieID = result;
      if (input.cookieID != null) {
        const ID = await axios.post('http://localhost:3001/app/getPersonalInfo', input);
        if(ID.data[0].type === 'PI'){
          setEditpermission(true);
        }
        else{
          input.ID = ID.data[0].ID;
        }
      }
    };
    handleProfileClick();
  }, [result]);

  useEffect(()=>{
    const setUpInfo = () =>{
        //const array = projectLists
    }
    setUpInfo();
  },[projectLists])


  const updateProgress = (projectId, newProgress) => {
    const updatedList = projectLists.map(project => {
      if (project.ResearchID === projectId) {
        return { ...project, Progress: newProgress };
      }
      return project;
    });
    setProjectList(updatedList);
     axios.post('http://localhost:3001/RD/storeListUpdate', {projectLists: projectLists});
  };

 
  const [isRCHead,setisRCHead] = useState(true);

  return (
    <div  className='full_page_normal p-5 shade1'>
    <div className="shade2 p-5 rounded">
      <center><h3><strong>Ongoing Project List</strong></h3></center> <hr /> <br/>
      {projectLists.map(project => (
        <div key={project.ResearchID} className="shade3 m-3 p-3 rounded">
          <h4>{project.Title}</h4> <hr/>
          <p><strong>Project Leader: </strong>{project.Name}</p>
          {/* <p><strong>Associates: </strong>{project.teammates.join(', ')}</p> */}
          <p><strong>Description: </strong>{project.description}</p>
          <p><strong>Progress: </strong>{project.Progress}%</p>
          {editPermission && (
            <div>
              <input
                type="number"
                min={0}
                max={100}
                placeholder='Enter New Progress (in %)'
                onChange={e => updateProgress(project.ResearchID, e.target.value)}
              />
              <button className='btn btn-outline-light' onClick={() => updateProgress(project.ResearchID, project.Progress)}>Update Progress</button>
            </div>
          )}
        </div>
      ))}
    </div>
    </div>
  );
};

export default ProjectList;
