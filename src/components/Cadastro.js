import React, { useState } from 'react';
import axios from 'axios';

const Cadastro = () => {
  const [formData, setFormData] = useState({
    nome_completo: '',
    usuario_acesso: '',
    senha: '',
    email_aluno: '',
    observacao: ''
  });
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const validate = () => {
    const newErrors = {};
    
    if (!formData.nome_completo) newErrors.nome_completo = 'Nome completo é obrigatório';
    if (!formData.usuario_acesso) newErrors.usuario_acesso = 'Usuário é obrigatório';
    if (!formData.senha) newErrors.senha = 'Senha é obrigatória';
    if (!formData.email_aluno) {
      newErrors.email_aluno = 'E-mail é obrigatório';
    } else if (!/\S+@\S+\.\S+/.test(formData.email_aluno)) {
      newErrors.email_aluno = 'E-mail inválido';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validate()) return;
    
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/alunos`, formData);

      setMessage('Aluno cadastrado com sucesso!');
      setFormData({
        nome_completo: '',
        usuario_acesso: '',
        senha: '',
        email_aluno: '',
        observacao: ''
      });
    } catch (error) {
      setMessage(error.response?.data?.error || 'Erro ao cadastrar aluno');
    }
  };

  return (
    <div className="container">
      <h2>Cadastro de Aluno</h2>
      {message && <div className="alert">{message}</div>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Nome Completo</label>
          <input
            type="text"
            name="nome_completo"
            value={formData.nome_completo}
            onChange={handleChange}
          />
          {errors.nome_completo && <span className="error">{errors.nome_completo}</span>}
        </div>
        
        <div className="form-group">
          <label>Usuário de Acesso</label>
          <input
            type="text"
            name="usuario_acesso"
            value={formData.usuario_acesso}
            onChange={handleChange}
          />
          {errors.usuario_acesso && <span className="error">{errors.usuario_acesso}</span>}
        </div>
        
        <div className="form-group">
          <label>Senha</label>
          <input
            type="password"
            name="senha"
            value={formData.senha}
            onChange={handleChange}
          />
          {errors.senha && <span className="error">{errors.senha}</span>}
        </div>
        
        <div className="form-group">
          <label>E-mail</label>
          <input
            type="email"
            name="email_aluno"
            value={formData.email_aluno}
            onChange={handleChange}
          />
          {errors.email_aluno && <span className="error">{errors.email_aluno}</span>}
        </div>
        
        <div className="form-group">
          <label>Observação (Opcional)</label>
          <textarea
            name="observacao"
            value={formData.observacao}
            onChange={handleChange}
          />
        </div>
        
        <button type="submit">Cadastrar</button>
      </form>
    </div>
  );
};

export default Cadastro;