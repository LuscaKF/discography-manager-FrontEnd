/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';

const AddTrackForm = () => {
  const { albumId } = useParams();
  const [title, setTitle] = useState('');
  const [duration, setDuration] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      await axios.post(`http://127.0.0.1:8000/api/albums/${albumId}/tracks`, {
        title: title,
        duration: duration,
      });
      setSuccessMessage('Faixa adicionada com sucesso!');
      setTimeout(() => {
        setSuccessMessage('');
      }, 5000); // Remover mensagem de sucesso após 5 segundos
      // Limpa os campos após adicionar com sucesso
      setTitle('');
      setDuration('');
    } catch (error) {
      console.error('Erro ao adicionar faixa:', error);
    }
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

      <div className="nav-animate"></div>

      <div className="contact pad" id="contact">
        <div className="container">
          <div className="default-heading">
            <h2>Adicionar Faixa</h2>
          </div>
          <div className="form-content">
            <p>Adicione uma nova Faixa:</p>
            <form onSubmit={handleSubmit}>
              <div className="row">
                <div className="col-md-6 col-sm-6">
                  <div className="form-group">
                    <label htmlFor="name">Nome da Faixa</label>
                    <input type="text" className="form-control" id="name" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Digite o nome da faixa" required />
                  </div>
                  <div className="form-group">
                    <label htmlFor="duration">Duração da Faixa</label>
                    <input type="number" className="form-control" id="duration" value={duration} onChange={(e) => setDuration(e.target.value)} placeholder="Digite a duração da faixa (em segundos)" required />
                  </div>
                </div>
                <div className="col-md-6 col-sm-6">
                  <div className="form-group">
                    <label htmlFor="message">Curiosidade: </label>
                    <p>Tião Carreiro, por exemplo, era um grande admirador de músicos de jazz e blues. Ele incorporava técnicas desses estilos em sua forma de tocar viola, o que conferia uma sonoridade única e diferenciada às músicas da dupla. Essa fusão de elementos de diferentes gêneros musicais contribuiu para a originalidade e o sucesso de Tião Carreiro e Pardinho.</p>
                  </div>
                </div>
              </div>
              <div className="text-center">
                <button type="submit" className="btn btn-lg btn-theme">Adicionar faixa</button>
              </div>
            </form>
            {successMessage && <p className="mt-3 text-success text-center">{successMessage}</p>}
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

export default AddTrackForm;
