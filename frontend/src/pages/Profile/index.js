import React, { useState, useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { FiPower, FiTrash2 } from 'react-icons/fi'

import api from '../../services/api'

import logoImg from '../../assets/logo.svg'
import './styles.css'

export default function Profile() {
  const history = useHistory()

  const [ incidents, setIncidents ] = useState([])

  const ongName = localStorage.getItem('ongName')
  const ongId = localStorage.getItem('ongId')

  useEffect( () => {
    api.get('profile', {
      headers: {
        Authorization: ongId
      }
    }).then(res => {
       setIncidents(res.data.incidents)
    })
  }, [ongId])

  async function handleDeleteIncident(id) {
    try {
      await api.delete(`incidents/${id}`, {
        headers: {
          Authorization: ongId
        }
      })

      setIncidents(incidents.filter(incident => incident.id !== id))
    } catch (err) {
      alert('Erro ao deletar caso, tente novamente!')
    }
  }

  function handleLogout() {
    localStorage.clear()

    history.push('/')
  }

  return (
    <div className="profile-container">
      <header>
        <img src={logoImg} alt="By The Hero" />
        <span>Bem Vinda, {ongName}</span>

        <Link to="/incidents/new" className="button">Cadastrar novo caso</Link>
        <button type="button" onClick={handleLogout}>
          <FiPower size={18} color="#e02041" />
        </button>
      </header>

      <h1>Casos Cadastrados</h1>

      <ul>
        {incidents.map(incident => (
          <li key={incident.id}>
            <strong>Caso:</strong>
            <p>{incident.title}</p>

            <strong>Descrição:</strong>
            <p>{incident.description}</p>

            <strong>Valor:</strong>
            <p>{incident.value.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})}</p>

            <button type='button' onClick={() => handleDeleteIncident(incident.id)}>
              <FiTrash2 size={20} color="#a8a8b3" />
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}