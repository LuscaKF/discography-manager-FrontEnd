/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';

const EditTrackForm = () => {
  const [title, setTitle] = useState('');
  const [duration, setDuration] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const { trackId, albumId } = useParams();

  useEffect(() => {
    axios.get(`http://127.0.0.1:8000/api/albums/${albumId}/tracks/${trackId}`)
      .then(response => {
        const track = response.data;
        setTitle(track.title);
        setDuration(track.duration);
      })
      .catch(error => {
        console.error('Erro ao buscar detalhes da faixa:', error);
      });
  }, [trackId, albumId]);

  const handleSubmit = event => {
    event.preventDefault();
    const formData = { title, duration };
    axios.put(`http://127.0.0.1:8000/api/albums/${albumId}/tracks/${trackId}`, formData)
      .then(response => {
        console.log('Faixa atualizada:', response.data);
        setSuccessMessage('Faixa atualizada com sucesso!');
        setTimeout(() => {
          setSuccessMessage('');
        }, 5000); // Remover mensagem de sucesso após 5 segundos
      })
      .catch(error => {
        console.error('Erro ao atualizar faixa:', error);
        setErrorMessage('Erro ao atualizar faixa. Por favor, tente novamente.');
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
            <strong>Retornar</strong>:&nbsp; <Link to={`/albums/${albumId}/tracks`}>Voltar para listagem de Faixas</Link>
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
            <h2>Editar Faixa</h2>
          </div>
          <div className="form-content ">
            <p>Edite sua faixa:</p>
            <form onSubmit={handleSubmit}>
              <div className="row">
                <div className="col-md-6 col-sm-6">
                  <div className="form-group">
                    <label htmlFor="name">Nome da Faixa</label>
                    <input type="text" className="form-control" id="name" name="name" value={title} onChange={e => setTitle(e.target.value)} placeholder="Digite o novo nome da faixa" />
                  </div>
                  <div className="form-group">
                    <label htmlFor="released_year">Duração da faixa</label>
                    <input type="number" className="form-control" id="duration" name="duration" value={duration} onChange={e => setDuration(e.target.value)} placeholder="Digite a nova duração da faixa (em segundos)" />
                  </div>
                </div>
                <div className="col-md-6 col-sm-6">
                  <div className="form-group">
                    <label htmlFor="message">Curiosidade: </label>
                    <p>Tião Carreiro começou a tocar viola e a cantar desde cedo, e Pardinho também cresceu em um ambiente musical. Eles se conheceram casualmente em 1956 em uma festa de aniversário em São Paulo. A partir dessa casualidade, iniciaram uma parceria musical que se tornaria lendária no mundo sertanejo.</p>
                  </div>
                </div>
              </div>
              <div className="text-center">
                <button type="submit" className="btn btn-lg btn-theme">Salvar alterações da faixa</button>
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

export default EditTrackForm;
