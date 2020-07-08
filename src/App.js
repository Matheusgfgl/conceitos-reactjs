import React , {useEffect, useState} from "react";
import api from './services/api'
import "./styles.css";

function App() {
  const [repositories, setrepositories] = useState([])

  useEffect(() => {
      api.get('/repositories').then(response => {
        setrepositories(response.data)
      })
  }, [])

  async function handleAddRepository() {
     const project = {
      title: " Mobile com React",
      url: "matheus",
      techs: [
      "node", "React", "Native"
        ]
      }
    const response = await api.post('/repositories', project)
    setrepositories([...repositories, response.data])
  }

  async function handleRemoveRepository(id) {
    await api.delete(`/repositories/${id}`);

    setrepositories(repositories.filter(repository => repository.id !== id));
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repository => (
            <li key= {repository.id}>
            {repository.title}
  
            <button onClick={() => handleRemoveRepository(repository.id)}>
              Remover
            </button>
          </li>

  ))}
        
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
