import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock } from 'lucide-react';
import Modal from 'react-modal';

Modal.setAppElement('#root');

// Animations & styles
const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(30px); }
  to { opacity: 1; transform: translateY(0); }
`;

const PageWrapper = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #dfe4ea, #f1f2f6);
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: 'Poppins', sans-serif;
`;

const FormContainer = styled.div`
  background: white;
  padding: 3rem;
  border-radius: 2rem;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
  animation: ${fadeIn} 0.6s ease-out;
  width: 100%;
  max-width: 450px;
`;

const Title = styled.h2`font-size: 2rem;color: #2f3542;text-align: center;margin-bottom: 0.5rem;`;
const Subtitle = styled.p`
  text-align: center;
  color: #57606f;
  font-size: 0.95rem;
  margin-bottom: 2rem;

  a {
    color: #1e90ff;
    text-decoration: none;
    margin-left: 4px;

    &:hover {
      text-decoration: underline;
    }
  }
`;

const InputGroup = styled.div`position: relative;`;
const Icon = styled.div`
  position: absolute;
  left: 14px;
  top: 50%;
  transform: translateY(-50%);
  color: #ced6e0;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.75rem 1rem 0.75rem 2.8rem;
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

const Divider = styled.p`
  text-align: center;
  color: #a4b0be;
  margin: 1.5rem 0 1rem;
  font-size: 0.9rem;
`;

const GoogleButton = styled.button`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.6rem;
  padding: 0.7rem;
  border: 1px solid #ccc;
  border-radius: 12px;
  background-color: white;
  cursor: pointer;
  font-weight: 500;

  &:hover {
    background-color: #f1f2f6;
  }

  img {
    width: 20px;
  }
`;

const ErrorText = styled.p`
  color: #e74c3c;
  text-align: center;
  margin-bottom: 1rem;
  font-size: 0.95rem;
`;

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [erreurConnexion, setErreurConnexion] = useState('');
  const [loading, setLoading] = useState(false);
  const [fakeGoogleEmail, setFakeGoogleEmail] = useState('');
  const [showGoogleModal, setShowGoogleModal] = useState(false);
  const [fakeGoogleSuccess, setFakeGoogleSuccess] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setErreurConnexion('');
    setLoading(true);

    try {
      const res = await fetch("http://localhost:5000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      setLoading(false);

      if (res.ok) {
        localStorage.setItem("token", data.token);
        navigate("/train");
      } else {
        setErreurConnexion(data.error || "Email ou mot de passe incorrect.");
      }
    } catch (err) {
      setLoading(false);
      setErreurConnexion("Erreur serveur. Veuillez réessayer.");
    }
  };

  return (
    <PageWrapper>
      <FormContainer>
        <Title>Se connecter à SmartDeck</Title>
        <Subtitle>
          Tu n’as pas de compte ?
          <Link to="/register">Inscris-toi</Link>
        </Subtitle>

        {erreurConnexion && <ErrorText>{erreurConnexion}</ErrorText>}

        <form onSubmit={handleLogin}>
          <InputGroup>
            <Icon><Mail size={18} /></Icon>
            <Input
              type="email"
              placeholder="Adresse email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </InputGroup>

          <InputGroup>
            <Icon><Lock size={18} /></Icon>
            <Input
              type="password"
              placeholder="Mot de passe"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </InputGroup>

          <Button type="submit">
            {loading ? "Connexion..." : "Se connecter"}
          </Button>
        </form>

        <p style={{ textAlign: "right", marginTop: "1rem" }}>
          <Link to="/forgot-password">Mot de passe oublié ?</Link>
        </p>

        <Divider>ou continue avec</Divider>

        {/* ✅ Bouton Google */}
        <GoogleButton onClick={() => setShowGoogleModal(true)}>
          <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" />
          Connexion avec Google
        </GoogleButton>

        {/* ✅ Notification affichée dans la page */}
        {fakeGoogleSuccess && (
          <p style={{ textAlign: "center", marginTop: "1rem", color: "#2ecc71", fontWeight: "bold" }}>
            {fakeGoogleSuccess}
          </p>
        )}

        {/* ✅ Modale Google simulée */}
        <Modal
          isOpen={showGoogleModal}
          onRequestClose={() => setShowGoogleModal(false)}
          style={{
            content: {
              maxWidth: '400px',
              margin: 'auto',
              padding: '2rem',
              borderRadius: '20px',
              boxShadow: '0 15px 35px rgba(0,0,0,0.2)',
              textAlign: 'center',
            }
          }}
        >
          <h2>Connexion Google</h2>
          <p>Entrez votre adresse Gmail pour continuer :</p>
          <Input
            type="email"
            placeholder="Adresse Gmail"
            value={fakeGoogleEmail}
            onChange={(e) => setFakeGoogleEmail(e.target.value)}
            required
          />
          <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginTop: '1rem' }}>
            <Button onClick={() => {
              setFakeGoogleSuccess(`Bienvenue ${fakeGoogleEmail} (connexion Google simulée)`);
              setShowGoogleModal(false);
              setTimeout(() => setFakeGoogleSuccess(''), 4000);
            }}>
              Continuer
            </Button>
            <Button style={{ backgroundColor: "#ccc", color: "#333" }} onClick={() => setShowGoogleModal(false)}>
              Annuler
            </Button>
          </div>
        </Modal>
      </FormContainer>
    </PageWrapper>
  );
};

export default LoginPage;



