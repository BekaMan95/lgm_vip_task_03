import './App.css';
import {useEffect, useState} from "react";


function App() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [website, setWebsite] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [gender, setGender] = useState('');
    const [skills, setSkills] = useState([]);

    const [students, setStudents] = useState(() => {
        const locVal = localStorage.getItem("STUDENTS");
        if (locVal == null) return []
        return JSON.parse(locVal)
    });

    useEffect(() => {
        localStorage.setItem("STUDENTS", JSON.stringify(students))
    }, [students])

    const handleNameChange = (event) => {
        setName(event.target.value);
    };

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };

    const handleWebsiteChange = (event) => {
        setWebsite(event.target.value);
    };

    const handleImageUrlChange = (event) => {
        setImageUrl(event.target.value);
    };

    const handleGenderChange = (event) => {
        setGender(event.target.value);
    };

    const handleSkillsChange = (event) => {
        const skill = event.target.value;
        const isChecked = event.target.checked;
        if (isChecked) {
            setSkills([...skills, skill]);
        } else {
            setSkills(skills.filter((selectedSkill) => selectedSkill !== skill));
        }
    };


    function handleClear(event) {
        event.preventDefault()
        setName('');
        setEmail('');
        setWebsite('');
        setImageUrl('');
        setGender('');
        setSkills([]);
    }



    function handleSubmit(event) {
        event.preventDefault()
        if (name !== '' && email !== '' && gender !== '') {
            setStudents(currentStudents => {
                return [
                    ...currentStudents,
                    {id: crypto.randomUUID(),
                        Name: name,
                        Email: email,
                        Website: website,
                        ImageUrl: imageUrl,
                        Gender: gender,
                        Skills: skills
                    },
                ]
            })
            handleClear(event);
        }

    }


    function deleteStudent(id){
        setStudents(currentStudents => {
            return currentStudents.filter(student => student.id !== id)
        })
    }

    return (
        <div className={"container"}>
          <div className={"enrollmentForm"}>
              <h2>Registration Form</h2>
              <form onSubmit={handleSubmit} >
                  <label htmlFor="name">Name</label>
                  <input className={"neon-input"} type="text" id="name" name="name" value={name} onChange={handleNameChange} required /><br/><br/>

                  <label htmlFor="email">Email</label>
                  <input className={"neon-input"} type="email" id="email" name="email" value={email} onChange={handleEmailChange} required /><br/><br/>

                  <label htmlFor="website">Website</label>
                  <input className={"neon-input"} type="url" id="website" name="website" value={website} onChange={handleWebsiteChange} /><br/><br/>

                  <label htmlFor="image">Image Link</label>
                  <input className={"neon-input"} type="url" id="image" name="image" value={imageUrl} onChange={handleImageUrlChange} /><br/><br/>

                  <div className={"genderSection"}>
                      <label htmlFor="gender">Gender</label>
                      <input type="radio" value="male" checked={gender === 'male'} onChange={handleGenderChange} required/>
                      <label htmlFor="male">Male</label>
                      <input type="radio" value="female" checked={gender === 'female'} onChange={handleGenderChange} required />
                      <label htmlFor="female">Female</label><br/><br/>
                  </div>

                  <div className={"skillSection"}>
                      <label htmlFor="skills">Skills</label>
                      <input type="checkbox" id="html" name="skills" value="html " checked={skills.includes('html ')} onChange={handleSkillsChange}/>
                      <label htmlFor="html">HTML</label>
                      <input type="checkbox" id="css" name="skills" value="css " checked={skills.includes('css ')} onChange={handleSkillsChange}/>
                      <label htmlFor="css">CSS</label>
                      <input type="checkbox" id="javascript" name="skills" value="javascript " checked={skills.includes('javascript ')} onChange={handleSkillsChange}/>
                      <label htmlFor="javascript">JavaScript</label>
                      <input type="checkbox" id="python" name="skills" value="python " checked={skills.includes('python ')} onChange={handleSkillsChange}/>
                      <label htmlFor="python">Python</label><br/><br/><br/>
                  </div>

                  <input className={"btn"} type="submit" value="Enroll student"/>
                  <button className={"btn btn-danger"} type={"button"} onClick={handleClear}>Clear</button>
              </form>
          </div>
          <div className={"enrolledStudents"}>
              <h2>Enrolled Students</h2>
              <div className={'student'}>
                  <table border={2}>

                      <tr>
                          <th>Description</th>
                          <th>Image</th>
                      </tr>
                      {students.map(student => {
                          return <tr key={student.id}>
                                  <td>{student.Name}<br/>{student.Gender}<br/>{student.Email}<br/>{student.Website}<br/>{student.Skills}</td>
                                  <td><img src={student.ImageUrl} alt={"Image of"+student.Name} width={150} height={150}/></td>
                              <button className={"btn btn-danger"} onClick={() => deleteStudent(student.id)}>X</button>
                          </tr>
                      })}

                  </table>
              </div>
          </div>
        </div>
    );
}

export default App;
