/*
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { getUserInfo } from "../api";



const Container = styled.div`
  max-width: 600px;
  margin: 3rem auto;
  padding: 2rem;
  background: #fff;
  border-radius: 1rem;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h2`
  text-align: center;
  margin-bottom: 1.5rem;
`;

const Info = styled.p`
  font-size: 1.1rem;
  margin-bottom: 1rem;

  span {
    font-weight: bold;
  }
`;

const ProfilePage = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    getUserInfo()
      .then(data => setUser(data))
      .catch(err => console.error("Erreur profil :", err));
  }, []);

  if (!user) return <Container>Chargement...</Container>;

  return (
    <Container>
      <Title>Mon profil</Title>
      <Info><span>Nom :</span> {user.username}</Info>
      <Info><span>Email :</span> {user.email}</Info>
      <Info><span>Decks :</span> {user.deckCount}</Info>
      <Info><span>Flashcards :</span> {user.flashcardCount}</Info>
    </Container>
  );
};

export default ProfilePage;
*/

import React, { useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";
import { getUserInfo } from "../api";

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(15px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const PageWrapper = styled.div`
  min-height: 100vh;
  background: linear-gradient(to bottom right, #e6c8ff, #f5e6c8);
  padding: 3rem 1rem;
  font-family: 'Poppins', sans-serif;
`;

const Container = styled.div`
  max-width: 600px;
  margin: auto;
  padding: 2.5rem 2rem;
  background: #ffffff;
  border-radius: 1.5rem;
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.08);
  animation: ${fadeIn} 0.6s ease-out;
`;

const Title = styled.h2`
  text-align: center;
  font-size: 2.2rem;
  color: #a064c8;
  margin-bottom: 2rem;
`;

const Info = styled.p`
  font-size: 1.2rem;
  color: #505a64;
  margin-bottom: 1.2rem;

  span {
    color: #a064c8;
    font-weight: 600;
  }
`;

const ProfilePage = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    getUserInfo()
      .then(data => setUser(data))
      .catch(err => console.error("Erreur profil :", err));
  }, []);

  if (!user) {
    return (
      <PageWrapper>
        <Container>Chargement...</Container>
      </PageWrapper>
    );
  }

  return (
    <PageWrapper>
      <Container>
        <Title>Mon profil</Title>
        <Info><span>Nom :</span> {user.username}</Info>
        <Info><span>Email :</span> {user.email}</Info>
        <Info><span>Decks :</span> {user.deckCount}</Info>
        <Info><span>Flashcards :</span> {user.flashcardCount}</Info>
      </Container>
    </PageWrapper>
  );
};

export default ProfilePage;
