import axios from "axios";
import { useEffect, useRef, useState } from "react";
import "./DeleteProject.css"

function DeleteProject({update}){

  const form = useRef();
  const listOfProjects = useRef([]);

  // filter the project will deleted in array 
  // most thing i try hard :( 
  function handlecheck(e){
    if (e.target.checked){
      listOfProjects.current = [...listOfProjects.current, e.target.id];
      listOfProjects.current = [...new Set(listOfProjects.current)];
    }else{
      listOfProjects.current = listOfProjects.current.filter((ele)=> {
        return ele !== e.target.id;
      })
    }
  }
  
  async function handleSubmit(e){
    e.preventDefault();
    const Url = "https://elekwoa.onrender.com/post/deleteprojects";
    try {
      await axios.post(Url, listOfProjects.current);
      document.getElementById('message').textContent = 'تم الحذف بنجاح';
    } catch (error){
      document.getElementById('message').textContent = `لم يتم الحذف: ${error}`;
    }
    getProjects();
  }
  
  const [project, setProject] = useState([])

  const url = 'https://elekwoa.onrender.com/get/projects';
  const getProjects = async () => {
    try {
      const response = await fetch(url);
      const data = await response.json();
      setProject(data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getProjects();
  }, [])
  
  if(update){
    getProjects();
  }

  // id title type image
  let deleteProject = project.map((ele) => (
    <>
      <label for={ele.id} key={ele.id}>
        <div>
          <input id={ele.id} type="checkbox" onChange={handlecheck}/>
          <p>{ele.title}</p>
        </div>
        <img src={ele.image}/>
      </label>
      <hr/>
    </>
      
  ));
  if (project.length === 0){
    return(
     <div className="delete">
       <h2>
        لا يتوفر مشاريع
       </h2>
     </div>
    )
  }
  return(
    <div className="delete">
      <h3> حذف المشروع :-</h3>
      <form ref={form} onSubmit={handleSubmit}>
        {deleteProject}
        <button type="submit">حذف</button>
      </form>
      <p id='message'></p>
    </div>
  )
}
export default DeleteProject;