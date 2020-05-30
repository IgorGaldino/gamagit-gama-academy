import React, { useState } from 'react';
import axios from 'axios';
import * as Style from './styled';
import { useHistory } from 'react-router-dom';

export default function Home() {
  const history = useHistory();
  const [ usuario, setUsuario ] = useState('');
  const [ erro, setErro ] = useState(false);

  function handlePesquisa() {
    axios.get(`https://api.github.com/users/${usuario}/repos`)
    .then( response => {
      const repositories = response.data;
      const repositoriesName = [];

      repositories.map( repo => repositoriesName.push(repo.name));

      localStorage.setItem('repositoriesName', JSON.stringify(repositoriesName));
      setErro(false);
      history.push('/repositories');
    })
    .catch( err => {
      setErro(true);
    })
  }

  return(
    <Style.HomeContainer>
      <Style.Header>Busque repositórios públicos de um usuário do github</Style.Header>
      <Style.Content>
        <Style.Input placeholder="Usuário" value={usuario} onChange={e => setUsuario(e.target.value)} />
        <Style.Button type="Button" onClick={handlePesquisa}>Pesquisar</Style.Button>
      </Style.Content>
      { erro ? <Style.ErrorMsg>Usuário não encontrado! Tente novamente.</Style.ErrorMsg> : '' }
    </Style.HomeContainer>
  )
}

