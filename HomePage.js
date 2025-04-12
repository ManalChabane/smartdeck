/*
import React from 'react';
import styled, { keyframes } from 'styled-components';
import { Link } from 'react-router-dom';

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const PageWrapper = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #dfe4ea, #f1f2f6);
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: 'Poppins', sans-serif;
`;

const Container = styled.div`
  background: white;
  padding: 4rem 3rem;
  text-align: center;
  border-radius: 2rem;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
  animation: ${fadeIn} 0.8s ease-out;
  max-width: 700px;
  width: 100%;
`;

const Title = styled.h2`
  font-size: 2.75rem;
  color: #2f3542;
  margin-bottom: 1rem;
`;

const Description = styled.p`
  font-size: 1.2rem;
  color: #57606f;
  max-width: 600px;
  margin: 0 auto 2rem;
  line-height: 1.6;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
`;

const CTAButton = styled.button`
  background-color: #1e90ff;
  color: white;
  padding: 0.75rem 2rem;
  font-size: 1.1rem;
  border: none;
  border-radius: 12px;
  cursor: pointer;
  transition: background 0.3s ease, transform 0.2s ease;

  &:hover {
    background-color: #3742fa;
    transform: translateY(-2px);
  }
`;

const HomePage = () => (
  <PageWrapper>
    <Container>
      <Title>Welcome to SmartDeck!</Title>
      <Description>
        Create, train, and master your flashcards with smart repetition and
        progress tracking. Stay sharp, stay smart.
      </Description>
      <div style={{ display: "flex", justifyContent: "center", gap: "1rem" }}>
        <StyledLink to="/login">
          <CTAButton>Connexion</CTAButton>
        </StyledLink>
        <StyledLink to="/train">
          <CTAButton>Commencer</CTAButton>
        </StyledLink>
      </div>

      
    </Container>
  </PageWrapper>
);

export default HomePage;
*/
import React from 'react';
import styled, { keyframes } from 'styled-components';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaSignInAlt, FaPlay } from 'react-icons/fa';

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

// Floating background bubble
const BackgroundShape = styled.div`
  position: absolute;
  width: ${props => props.size || '100px'};
  height: ${props => props.size || '100px'};
  border-radius: 50%;
  background: ${props => props.color};
  top: ${props => props.top};
  left: ${props => props.left};
  opacity: 0.2;
  filter: blur(30px);
  z-index: 0;
`;

const PageWrapper = styled.div`
  position: relative;
  overflow: hidden;
  min-height: 100vh;
  background: #e6c8ff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: 'Poppins', sans-serif;
  padding: 2rem;
`;

const Container = styled(motion.div)`
  background: #ffffff;
  padding: 4rem 3rem;
  text-align: center;
  border-radius: 2rem;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
  max-width: 700px;
  width: 100%;
  border: 2px solid #a064c8;
  z-index: 1;
`;

const Title = styled.h2`
  font-size: 2.75rem;
  color: #a064c8;
  margin-bottom: 1rem;
`;

const Description = styled.p`
  font-size: 1.2rem;
  color: #505a64;
  max-width: 600px;
  margin: 0 auto 2rem;
  line-height: 1.6;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
`;

const CTAButton = styled(motion.button)`
  background-color: ${props => props.secondary ? '#c8a0ff' : '#e63296'};
  color: white;
  padding: 0.75rem 2rem;
  font-size: 1.1rem;
  border: none;
  border-radius: 12px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.3s ease;

  &:hover {
    background-color: #c82864;
    transform: scale(1.05);
    box-shadow: 0 0 10px rgba(200, 40, 100, 0.3);
  }
`;

const OnboardingMessage = styled(motion.div)`
  background: #ffffb4;
  color: #505a64;
  padding: 1rem 1.5rem;
  border-radius: 10px;
  position: absolute;
  top: 5%;
  right: 5%;
  font-size: 1rem;
  box-shadow: 0 8px 20px rgba(0,0,0,0.1);
  z-index: 2;
`;

const HomePage = () => (
  <PageWrapper>
    {/* Background shapes */}
    <BackgroundShape color="#96c8ff" size="150px" top="10%" left="10%" />
    <BackgroundShape color="#f5e6c8" size="200px" top="70%" left="70%" />
    <BackgroundShape color="#b4ffb4" size="120px" top="40%" left="80%" />

    {/* Onboarding */}
    <OnboardingMessage
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1, duration: 0.6 }}
    >
      🎉 Astuce : Commencez par “Commencer” pour vous entraîner directement !
    </OnboardingMessage>

    {/* Main Container */}
    <Container
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6 }}
    >
      <Title>Bienvenue sur SmartDeck !</Title>
      <Description>
        Créez, révisez et maîtrisez vos fiches intelligemment grâce à la répétition espacée
        et au suivi de progression. Restez affûté, restez smart.
      </Description>

      <div style={{ display: "flex", justifyContent: "center", gap: "1rem", flexWrap: "wrap" }}>
        <StyledLink to="/login">
          <CTAButton
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <FaSignInAlt />
            Connexion
          </CTAButton>
        </StyledLink>
        <StyledLink to="/train">
          <CTAButton
            secondary
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <FaPlay />
            Commencer
          </CTAButton>
        </StyledLink>
      </div>
    </Container>
  </PageWrapper>
);

export default HomePage;
