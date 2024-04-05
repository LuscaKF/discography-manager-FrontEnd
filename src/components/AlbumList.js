/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const AlbumList = () => {
  const [albums, setAlbums] = useState([]);
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    fetchAlbums();
  }, []);

  const fetchAlbums = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/albums');
      setAlbums(response.data);
    } catch (error) {
      console.error('Erro ao buscar álbuns:', error);
    }
  };

  const handleDeleteAlbum = async (albumId) => {
    try {
      await axios.delete(`http://127.0.0.1:8000/api/albums/${albumId}`);
      setAlbums(albums.filter(album => album.id !== albumId));
      setSuccessMessage('Álbum excluído com sucesso!');
      setTimeout(() => {
        setSuccessMessage('');
      }, 3000);
    } catch (error) {
      console.error('Erro ao excluir álbum:', error);
    }
  };

  return (
    <div className="wrapper" id="home">
      <header>
        <nav className="secondary-menu">
          <div className="container">
            <div className="sm-left">
              <strong>Telefone</strong>:&nbsp; <a href="#">+55 (11) 9 9999-8888</a>&nbsp;&nbsp;&nbsp;&nbsp;
              <strong>E-mail</strong>:&nbsp; <a href="#">tiaoepardinho.capira@email.com</a>
            </div>
            <div className="clearfix"></div>
          </div>
        </nav>
        <nav className="navbar navbar-fixed-top navbar-default">
          <div className="container">
            <div className="navbar-header">
              <a className="navbar-brand" href="/">
                <img className="img-responsive" src="img/logo/logo-tiao.jpeg" alt="" />
              </a>
            </div>
            <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
              <ul className="nav navbar-nav navbar-right">
                <li><Link to="/add-album" >Adicionar novo Album +</Link></li>
              </ul>
            </div>
          </div>
        </nav>
      </header>

      <div className="nav-animate"></div>

      <div id="latestalbum" className="hero pad">
        <div className="container">
          <div className="hero-content">
            <h2>Lista de Albums</h2>
            <hr />
            <p>Clique no nome do Álbum e acompanhe todas as <strong className="theme-color">faixas </strong> da dupla <strong className="theme-color">Tião Carreiro e Pardinho</strong>.</p>
          </div>
          <div className="hero-playlist">
            <div className="row">
              <div class="col-md-6 col-sm-6">
                <div class="album-details">
                  {successMessage && <p className="alert alert-success">{successMessage}</p>}
                  {albums.map(album => (
                    <h4>
                      <Link to={`/albums/${album.id}/tracks`}>{album.title}</Link>
                      &nbsp; (lançamento: {album.release_year})
                    </h4>
                  ))}
                </div>
              </div>
              <div className="col-md-6 col-sm-6">
                <div className="album-details">
                  <ul>
                    {albums.map(album => (
                      <li key={album.id}>
                        <Link to={`/edit-album/${album.id}`} className="btn btn-lg btn-basic">Editar</Link>
                        <button onClick={() => handleDeleteAlbum(album.id)} className="btn btn-lg btn-theme mr-2">Excluir</button>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="about" id="team">
        <div className="container">
          <div className="default-heading">
            <h2>Sobre a dupla</h2>
          </div>
          <div className="about-what-we">
            <div className="row">
              <div className="col-md-4 col-sm-4">
                <div className="what-we-item">
                  <h3><i className="fa fa-heartbeat"></i> O que são?</h3>
                  <p>Tião Carreiro e Pardinho foram uma das duplas mais emblemáticas da música sertaneja raiz no Brasil. Juntos, eles deixaram um legado musical que perdura até os dias de hoje, influenciando gerações de artistas e conquistando o coração de milhões de fãs.</p>
                </div>
              </div>
              <div className="col-md-4 col-sm-4">
                <div className="what-we-item">
                  <h3><i className="fa fa-hand-o-up"></i> O que fazem?</h3>
                  <p>A dupla Tião Carreiro e Pardinho era conhecida principalmente por sua música. Eles eram cantores e compositores de música sertaneja raiz, um gênero que retrata as tradições e a vida no campo, com suas letras frequentemente abordando temas como amor, saudade, trabalho rural e festividades típicas.</p>
                </div>
              </div>
              <div className="col-md-4 col-sm-4">
                <div className="what-we-item">
                  <h3><i className="fa fa-map-marker"></i> De onde vieram?</h3>
                  <p>Tião Carreiro, cujo nome real era José Dias Nunes, nasceu em Monte Santo, um distrito de Monte Carmelo, no estado de Minas Gerais, em 13 de dezembro de 1934. Já Pardinho, cujo nome era Antônio Henrique de Lima, nasceu em São Carlos, interior de São Paulo, em 20 de agosto de 1932.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="team">
          <div className="container">
            <div className="team-content">
              <div className="row">
                <div className="col-md-3 col-sm-6"></div>
                <div className="col-md-3 col-sm-6">
                  <div className="team-member delay-two">
                    <div className="member-img">
                      <img className="img-responsive" src="img/user/tiao-carreiro.jpeg" alt="" />
                    </div>
                    <h3>Tião Carreiro</h3>
                    <span className="designation">Sertanejo</span>
                  </div>
                </div>
                <div className="col-md-3 col-sm-6">
                  <div className="team-member delay-three">
                    <div className="member-img">
                      <img className="img-responsive" src="img/user/pardinho.jpeg" alt="" />
                    </div>
                    <h3>Pardinho</h3>
                    <span className="designation">Sertanejo</span>
                  </div>
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

export default AlbumList;
