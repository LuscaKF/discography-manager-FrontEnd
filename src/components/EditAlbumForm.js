/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const EditAlbumForm = () => {
  const [title, setTitle] = useState('');
  const [releaseYear, setReleaseYear] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const { id } = useParams();

  useEffect(() => {
    axios.get(`http://127.0.0.1:8000/api/albums/${id}`)
      .then(response => {
        const album = response.data;
        setTitle(album.title);
        setReleaseYear(album.release_year);
      })
      .catch(error => {
        console.error('Erro ao buscar detalhes do álbum:', error);
      });
  }, [id]);

  const handleSubmit = event => {
    event.preventDefault();
    const formData = { title, release_year: releaseYear };
    axios.put(`http://127.0.0.1:8000/api/albums/${id}`, formData)
      .then(response => {
        console.log('Álbum atualizado:', response.data);
        setSuccessMessage('Álbum atualizado com sucesso!');
        setTimeout(() => {
          setSuccessMessage('');
        }, 5000); // Remover mensagem de sucesso após 5 segundos
      })
      .catch(error => {
        console.error('Erro ao atualizar álbum:', error);
        setErrorMessage('Erro ao atualizar álbum. Por favor, tente novamente.');
        setTimeout(() => {
          setErrorMessage('');
        }, 5000); // Remover mensagem de erro após 5 segundos
      });
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
          </div>
        </nav>
      </header>

      <div className="contact pad" id="contact">
        <div className="container">
          <div className="default-heading">
            <h2>Editar Álbum</h2>
          </div>
          <div className="form-content ">
            <p>Edite seu Álbum:</p>
            <form onSubmit={handleSubmit}>
              <div className="row">
                <div className="col-md-6 col-sm-6">
                  <div className="form-group">
                    <label htmlFor="name">Nome do Álbum</label>
                    <input type="text" className="form-control" id="name" name="name" value={title} onChange={e => setTitle(e.target.value)} placeholder="Digite o novo nome do álbum" />
                  </div>
                  <div className="form-group">
                    <label htmlFor="released_year">Ano de lançamento</label>
                    <input type="number" className="form-control" id="releaseYear" name="releaseYear" value={releaseYear} onChange={e => setReleaseYear(e.target.value)} placeholder="Digite o novo ano de lançamento do álbum" />
                  </div>
                </div>
                <div className="col-md-6 col-sm-6">
                  <div className="form-group">
                    <label htmlFor="message">Curiosidade: </label>
                    <p>O nome "Carreiro" foi adotado por Tião Carreiro por conta de sua origem e atividade profissional de seus pais. Seu pai era carreiro, ou seja, um condutor de carros de bois, uma profissão muito comum em áreas rurais do Brasil na época. Assim, o nome "Carreiro" não apenas refletia a identidade e a história pessoal de Tião, mas também homenageava a tradição familiar ligada ao trabalho no campo.</p>
                  </div>
                </div>
              </div>
              <div className="text-center">
                <button type="submit" className="btn btn-lg btn-theme">Salvar alterações do álbum</button>
              </div>
            </form>
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

      {/* Mensagens de sucesso e erro */}
      {successMessage && <div className="alert alert-success">{successMessage}</div>}
      {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
    </div>
  );
};

export default EditAlbumForm;
