import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate, Link } from 'react-router-dom';

const Container = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #dfe4ea, #f1f2f6);
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: 'Poppins', sans-serif;
`;

const Form = styled.div`
  background: white;
  padding: 3rem;
  border-radius: 2rem;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 500px;
`;

const Title = styled.h2`
  font-size: 2rem;
  margin-bottom: 1rem;
  text-align: center;
  color: #2f3542;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.75rem 1rem;
  margin: 0.5rem 0 1rem;
  border-radius: 10px;
  border: 1px solid #ccc;
  font-size: 1rem;

  &:focus {
    border-color: #1e90ff;
    outline: none;
  }
`;

const Button = styled.button`
  width: 100%;
  padding: 0.8rem;
  background-color: #1e90ff;
  color: white;
  border: none;
  border-radius: 12px;
  font-size: 1.1rem;
  cursor: pointer;
  transition: 0.3s;

  &:hover {
    background-color: #3742fa;
  }
`;

const Text = styled.p`
  text-align: center;
  font-size: 0.9rem;
  color: #57606f;
  margin-top: 1rem;

  a {
    color: #1e90ff;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }
`;

const RegisterPage = () => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:5000/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        alert("Inscription réussie 🎉");
        navigate("/login");
      } else {
        alert(data.error || "Erreur d'inscription.");
      }
    } catch (err) {
      alert("Erreur serveur");
    }
  };

  return (
    <Container>
      <Form>
        <Title>Créer un compte</Title>
        <form onSubmit={handleRegister}>
          <Input
            type="text"
            placeholder="Nom d'utilisateur"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <Input
            type="email"
            placeholder="Adresse email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <Input
            type="password"
            placeholder="Mot de passe"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <Button type="submit">S'inscrire</Button>
        </form>
        <Text>
          Tu as déjà un compte ? <Link to="/login">Connecte-toi</Link>
        </Text>
      </Form>
    </Container>
  );
};

export default RegisterPage;
