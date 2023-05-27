import React, { useState } from 'react';

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


  const updateProgress = (projectId, newProgress) => {
    const updatedList = updatedProjects.map(project => {
      if (project.id === projectId) {
        return { ...project, progress: newProgress };
      }
      return project;
    });
    setUpdatedProjects(updatedList);
  };

 
  const [isRCHead,setisRCHead] = useState(true);

  return (
    <div  className='full_page_normal p-5 shade1'>
    <div className="shade2 p-5 rounded">
      <center><h3><strong>Ongoing Project List</strong></h3></center> <hr /> <br/>
      {updatedProjects.map(project => (
        <div key={project.id} className="shade3 m-3 p-3 rounded">
          <h4>{project.title}</h4> <hr/>
          <p><strong>Project Leader: </strong>{project.leader}</p>
          <p><strong>Team Mates: </strong>{project.teammates.join(', ')}</p>
          <p><strong>Description: </strong>{project.description}</p>
          <p><strong>Progress: </strong>{project.progress}%</p>
          {isRCHead && (
            <div>
              <input
                type="number"
                min={0}
                max={100}
                placeholder='Enter New Progress (in %)'
                onChange={e => updateProgress(project.id, e.target.value)}
              />
              <button className='btn btn-outline-light' onClick={() => updateProgress(project.id, project.progress)}>Update Progress</button>
            </div>
          )}
        </div>
      ))}
    </div>
    </div>
  );
};

export default ProjectList;
