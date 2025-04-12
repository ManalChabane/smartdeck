import React, { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Container = styled.div`
  max-width: 800px;
  margin: 2rem auto;
  padding: 2rem;
  text-align: center;
`;

const Title = styled.h2`
  font-size: 1.8rem;
  margin-bottom: 1.5rem;
`;

const CardForm = styled.div`
  background: #f9f9f9;
  border: 1px solid #ccc;
  border-radius: 12px;
  padding: 1rem;
  margin: 1rem 0;
  text-align: left;
`;

const Label = styled.label`
  display: block;
  font-weight: bold;
  margin: 0.5rem 0 0.25rem;
`;

const Input = styled.textarea`
  width: 100%;
  padding: 0.5rem;
  font-size: 1rem;
  resize: vertical;
  margin-bottom: 0.5rem;
`;

const Button = styled.button`
  background-color: #1e90ff;
  color: white;
  border: none;
  padding: 0.6rem 1.2rem;
  border-radius: 8px;
  cursor: pointer;
  font-size: 1rem;
  margin: 1rem 0.5rem;

  &:hover {
    background-color: #3742fa;
  }
`;

const DangerButton = styled(Button)`
  background-color: #e74c3c;

  &:hover {
    background-color: #c0392b;
  }
`;

const SuccessMessage = styled.p`
  color: #2ecc71;
  font-weight: bold;
  margin-top: 1.5rem;
`;

const GeneratePreviewPage = () => {
  const [flashcards, setFlashcards] = useState([
    { question: '', answer: '' }
  ]);
  const [deckName, setDeckName] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleCardChange = (index, field, value) => {
    const updated = [...flashcards];
    updated[index][field] = value;
    setFlashcards(updated);
  };

  const addCard = () => {
    setFlashcards([...flashcards, { question: '', answer: '' }]);
  };

  const removeCard = (index) => {
    const updated = [...flashcards];
    updated.splice(index, 1);
    setFlashcards(updated);
  };

  const handleSave = async () => {
    if (!deckName || flashcards.length === 0) return;

    try {
      const res = await axios.post("http://localhost:5000/save-deck", {
        name: deckName,
        cards: flashcards,
      });

      setMessage(`✅ ${res.data.message}`);
      if (res.data.deck_id) {
        setTimeout(() => navigate(`/deck/${res.data.deck_id}`), 2000);
      }
    } catch (err) {
      console.error(err);
      setMessage("❌ Échec de l’enregistrement du deck.");
    }
  };

  return (
    <Container>
      <Title>✍️ Modifier vos Flashcards avant l’enregistrement</Title>

      <Label>Nom du deck :</Label>
      <Input
        rows="1"
        value={deckName}
        onChange={(e) => setDeckName(e.target.value)}
        placeholder="Ex. Chapitre 1 - Biochimie"
      />

      {flashcards.map((card, index) => (
        <CardForm key={index}>
          <Label>Question {index + 1}</Label>
          <Input
            rows="2"
            value={card.question}
            onChange={(e) => handleCardChange(index, 'question', e.target.value)}
          />
          <Label>Réponse</Label>
          <Input
            rows="2"
            value={card.answer}
            onChange={(e) => handleCardChange(index, 'answer', e.target.value)}
          />
          <DangerButton onClick={() => removeCard(index)}>❌ Supprimer</DangerButton>
        </CardForm>
      ))}

      <Button onClick={addCard}>➕ Ajouter une carte</Button>
      <Button onClick={handleSave}>💾 Enregistrer ce deck</Button>

      {message && <SuccessMessage>{message}</SuccessMessage>}
    </Container>
  );
};

export default GeneratePreviewPage;
