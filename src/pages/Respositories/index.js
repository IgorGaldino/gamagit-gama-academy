import React, { useEffect, useState } from 'react';
import * as Style from './styled';
import { useHistory } from 'react-router-dom';

export default function Repositories() {
  const history = useHistory();
  const [ repositories, setRepositories ] = useState([]);

  useEffect( () => {
    try {
      const repositoriesName = JSON.parse(localStorage.getItem('repositoriesName'));
      if (repositoriesName) {
        setRepositories(repositoriesName);
        localStorage.clear();
      } else {
        history.push('/');  
      }
    } catch(err) {
      history.push('/');
    }
  }, []);
  
  return(
    <Style.Container>
      <Style.Title>Repositórios Públicos</Style.Title>
      <Style.List>
        {
          repositories.map( repo => {
            return (
              <Style.ListItem>Nome do Repositório: { repo } </Style.ListItem>
            )
          })
        }
      </Style.List>
      <Style.LinkHome to="/"> Voltar </Style.LinkHome>
    </Style.Container>
  )
}