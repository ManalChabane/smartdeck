import React, { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const Wrapper = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #dfe4ea, #f1f2f6);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Box = styled.div`
  background: white;
  padding: 3rem;
  border-radius: 1.5rem;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
  max-width: 450px;
  width: 100%;
  font-family: 'Poppins', sans-serif;
`;

const Title = styled.h2`
  text-align: center;
  color: #2f3542;
  margin-bottom: 1rem;
`;

const Text = styled.p`
  text-align: center;
  font-size: 0.95rem;
  color: #57606f;
  margin-bottom: 2rem;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.75rem;
  margin-bottom: 1rem;
  border-radius: 10px;
  border: 1px solid #ccc;

  &:focus {
    border-color: #1e90ff;
    outline: none;
  }
`;

const Button = styled.button`
  width: 100%;
  background: #1e90ff;
  color: white;
  padding: 0.75rem;
  border: none;
  border-radius: 10px;
  font-size: 1.1rem;
  cursor: pointer;
  transition: 0.3s;

  &:hover {
    background: #3742fa;
  }
`;

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleReset = (e) => {
    e.preventDefault();
    // Tu peux appeler un backend ici plus tard
    setSubmitted(true);
  };

  return (
    <Wrapper>
      <Box>
        <Title>Mot de passe oublié</Title>
        <Text>
          Entre ton adresse email. Si elle existe, tu recevras un lien de réinitialisation.
        </Text>

        {!submitted ? (
          <form onSubmit={handleReset}>
            <Input
              type="email"
              placeholder="Adresse email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <Button type="submit">Réinitialiser</Button>
          </form>
        ) : (
          <Text style={{ color: 'green' }}>
            ✅ Si l'email est valide, un lien a été envoyé.
          </Text>
        )}

        <Text>
          <Link to="/login">← Retour à la connexion</Link>
        </Text>
      </Box>
    </Wrapper>
  );
};

export default ForgotPasswordPage;
