/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from 'react';
import axios from 'axios';

const AddAlbumForm = () => {
  const [name, setName] = useState('');
  const [releasedYear, setReleasedYear] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post('http://127.0.0.1:8000/api/albums', {
        title: name,
        release_year: releasedYear,
      });

      if (response.status === 201) {
        setSuccessMessage('Álbum adicionado com sucesso!');
        setName('');
        setReleasedYear('');
        setTimeout(() => {
          setSuccessMessage('');
        }, 5000); // Remover mensagem de sucesso após 5 segundos
      } else {
        setErrorMessage('Erro ao adicionar álbum. Por favor, tente novamente.');
      }
    } catch (error) {
      if (error.response) {
        // O servidor retornou um status de erro
        console.error('Erro ao adicionar álbum: Coloque um ano válido!');
        setErrorMessage('Erro ao adicionar álbum: Coloque um ano válido! ');
      } else if (error.request) {
        // A requisição foi feita, mas não houve resposta do servidor
        console.error('Erro ao adicionar álbum: Sem resposta do servidor');
        setErrorMessage('Erro ao adicionar álbum: Sem resposta do servidor');
      } else {
        // Um erro ocorreu durante a configuração da requisição
        console.error('Erro ao adicionar álbum:', error.message);
        setErrorMessage('Erro ao adicionar álbum: ' + error.message);
      }
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
          </div>
        </nav>
      </header>

      <div className="nav-animate"></div>

      <div className="contact pad" id="contact">
        <div className="container">
          <div className="default-heading">
            <h2>Adicionar Álbum</h2>
          </div>
          <div className="form-content">
            <p>Adicione um novo Álbum:</p>
            <form onSubmit={handleSubmit}>
              <div className="row">
                <div className="col-md-6 col-sm-6">
                  <div className="form-group">
                    <label htmlFor="name">Nome do Álbum</label>
                    <input type="text" className="form-control" id="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Digite o nome do álbum" required />
                  </div>
                  <div className="form-group">
                    <label htmlFor="released_year">Ano de Lançamento</label>
                    <input type="number" className="form-control" id="released_year" value={releasedYear} onChange={(e) => setReleasedYear(e.target.value)} placeholder="Digite o ano de lançamento" required />
                  </div>
                </div>
                <div className="col-md-6 col-sm-6">
                  <div className="form-group">
                    <label htmlFor="message">Curiosidade: </label>
                    <p>Antes de alcançarem a fama, Tião Carreiro e Pardinho trabalharam em diversas atividades rurais, desde serviços braçais até pequenos trabalhos em fazendas. A música era uma paixão compartilhada, mas inicialmente não era fonte de sustento para eles.</p>
                  </div>
                </div>
              </div>
              <div className="text-center">
                <button type="submit" className="btn btn-lg btn-theme">Adicionar Álbum</button>
              </div>
            </form>
            {successMessage && <p className="mt-3 text-success text-center">{successMessage}</p>}
            {errorMessage && <p className="mt-3 text-danger text-center">{errorMessage}</p>}
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

export default AddAlbumForm;
