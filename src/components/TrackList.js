/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';

const TrackList = () => {
  const [tracks, setTracks] = useState([]);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const { albumId } = useParams();
  
  useEffect(() => {
    const fetchTracks = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/api/albums/${albumId}/tracks`);
        setTracks(response.data);
      } catch (error) {
        console.error('Erro ao buscar faixas:', error);
      }
    };

    fetchTracks();
  }, [albumId]);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://127.0.0.1:8000/api/albums/${albumId}/tracks/${id}`);
      setTracks(tracks.filter(track => track.id !== id));
      setSuccessMessage('Faixa excluída com sucesso!');
      setTimeout(() => {
        setSuccessMessage('');
      }, 5000); // Remover mensagem de sucesso após 5 segundos
    } catch (error) {
      console.error('Erro ao excluir faixa:', error);
      setErrorMessage('Erro ao excluir faixa. Por favor, tente novamente.');
      setTimeout(() => {
        setErrorMessage('');
      }, 5000); // Remover mensagem de erro após 5 segundos
    }
  };

  const handleAddTrack = async () => {
    try {
      // Lógica para adicionar uma nova faixa
      setSuccessMessage('Faixa adicionada com sucesso!');
      setTimeout(() => {
        setSuccessMessage('');
      }, 5000); // Remover mensagem de sucesso após 5 segundos
    } catch (error) {
      console.error('Erro ao adicionar faixa:', error);
      setErrorMessage('Erro ao adicionar faixa. Por favor, tente novamente.');
      setTimeout(() => {
        setErrorMessage('');
      }, 5000); // Remover mensagem de erro após 5 segundos
    }
  };

  return (
    <div className="wrapper" id="home">
      <header>
        <nav className="secondary-menu">
          <div className="container">
            <div className="sm-left">
              <strong>Retornar</strong>:&nbsp; <a href="/">Voltar para listagem de Álbuns</a>
            </div>
            <div className="clearfix"></div>
          </div>
        </nav>
        <nav className="navbar navbar-fixed-top navbar-default">
          <div className="container">
            <div className="navbar-header">
              <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1">
                <span className="sr-only">Toggle navigation</span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
              </button>
            </div>
            <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
              <ul className="nav navbar-nav navbar-right">
                <li>
                  <Link to={`/add-track/${albumId}/`}>Adicionar nova Faixa +</Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </header>

      <div className="nav-animate"></div>

      <div id="latestalbum" className="hero pad">
        <div className="container">
          <div className="hero-content">
            <h2>Lista de Faixas</h2>
            <hr />
            <p>Acompanhe as <strong className="theme-color">faixas </strong>de todos os álbuns da dupla <strong className="theme-color">Tião Carreiro e Pardinho</strong>.</p>
          </div>
          <div className="hero-playlist">
            <div className="row">
              <div className="col-md-6 col-sm-6">
                <div className="album-details">
                {successMessage && <div className="alert alert-success">{successMessage}</div>}
                {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
                  {tracks.map(track => (
                    <h4 key={track.id}>{track.title}
                      &nbsp; (Duração: {track.duration} Sg)
                    </h4>
                  ))}
                </div>
              </div>
              <div className="col-md-6 col-sm-6">
                <ul className="album-details">
                  <div className="song-info">
                    {tracks.map(track => (
                      <li key={track.id}>
                        <Link to={`/edit-track/${albumId}/${track.id}`} className="btn btn-lg btn-basic">Editar Faixa</Link>
                        <button onClick={() => handleDelete(track.id)} className="btn btn-lg btn-theme">Excluir Faixa</button>
                      </li>
                    ))}
                  </div>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="about" id="team">
        <div className="container">
          <div className="default-heading">
            <h2>As 3 faixas mais famosas</h2>
          </div>
          <div className="about-what-we">
            <div className="row">
              <div className="col-md-4 col-sm-4">
                <div className="what-we-item ">
                  <h3>Pagode em Brasília</h3>
                  <p>Essa música é um dos maiores sucessos da dupla. "Pagode em Brasília" é uma composição alegre e animada que homenageia a cidade de Brasília, a capital do Brasil. A canção apresenta uma melodia contagiante e letras que celebram a cultura caipira, o estilo de vida simples e festivo do interior e a alegria de viver. "Pagode em Brasília" tornou-se um hino do sertanejo tradicional e é uma das músicas mais reconhecidas da dupla.</p>
                </div>
              </div>
              <div className="col-md-4 col-sm-4">
                <div className="what-we-item ">
                  <h3>O Mineiro e o Italiano</h3>
                  <p>Essa é outra música icônica de Pardinho e Tião Carreiro. "O Mineiro e o Italiano" conta a história divertida e cativante de dois amigos, um mineiro e um italiano, que apesar das diferenças culturais e de personalidade, compartilham uma amizade verdadeira. A música é marcada por sua melodia envolvente e pelas letras que narram de forma leve e descontraída as aventuras e desventuras desses dois personagens, conquistando o público com seu humor e simplicidade.</p>
                </div>
              </div>
              <div className="col-md-4 col-sm-4">
                <div className="what-we-item ">
                  <h3>Boi Soberano</h3>
                  <p>"Boi Soberano" é uma das músicas mais emblemáticas da dupla, amplamente reconhecida por sua beleza poética e sua melodia tocante. A canção narra a história de um boi lendário, o "Boi Soberano", que representa força, bravura e determinação. Com letras que destacam a imponência e a nobreza desse animal, "Boi Soberano" emociona os ouvintes e é uma das favoritas dos fãs da música sertaneja raiz.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <footer>
        <div className="container">
          <div className="social">
            <a className="h-linkedin" href="https://www.linkedin.com/in/lucas-kirow-fernandes-304b74272/"><i className="fa fa-linkedin"></i></a>
          </div>
          <p className="copy-right">&copy; copyright 2024, Todos os direitos são reservados.</p>
        </div>
      </footer>
      <span className="totop"><a href="#"><i className="fa fa-chevron-up"></i></a></span>
    </div>
  );
};

export default TrackList;
