import React, { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Container = styled.div`
  max-width: 700px;
  margin: 0 auto;
  padding: 2rem;
  text-align: center;
`;

const Title = styled.h2`
  font-size: 2rem;
  margin-bottom: 1.5rem;
`;

const FileInput = styled.input`
  display: block;
  margin: 1rem auto;
`;

const Button = styled.button`
  background-color: #1e90ff;
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  cursor: pointer;
  font-size: 1rem;
  margin-top: 1rem;

  &:hover {
    background-color: #3742fa;
  }
`;

const Message = styled.p`
  margin-top: 1.5rem;
  color: #2ecc71;
  font-weight: bold;
`;

const CardPreview = styled.div`
  background: #f9f9f9;
  border: 1px solid #ccc;
  border-radius: 12px;
  padding: 1rem;
  margin: 1rem 0;
  text-align: left;
`;

const GeneratePage = () => {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState('');
  const [deckName, setDeckName] = useState('');
  const [deckId, setDeckId] = useState(null);
  const [flashcards, setFlashcards] = useState([]);
  const navigate = useNavigate();

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setMessage('');
    setFlashcards([]);
    setDeckName('');
    setDeckId(null);
  };

  const handleSubmit = async () => {
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await axios.post("http://localhost:5000/generate", formData);
      setMessage(res.data.message);
      setDeckName(res.data.deck_name);
      setDeckId(res.data.deck_id);
      setFlashcards(res.data.flashcards);
    } catch (err) {
      console.error(err);
      setMessage("❌ Échec de la génération des flashcards.");
    }
  };

  return (
    <Container>
      <Title>📄 Générer des Flashcards à partir d’un document</Title>
      <FileInput type="file" accept=".txt,.docx,.pdf" onChange={handleFileChange} />
      <Button onClick={handleSubmit}>Générer les flashcards</Button>

      {message && <Message>{message}</Message>}
      {deckName && <p>📘 Deck créé : <strong>{deckName}</strong></p>}

      {flashcards.length > 0 && (
        <div style={{ marginTop: '2rem' }}>
          <h3>🧠 Flashcards générées :</h3>
          {flashcards.map((card, index) => (
            <CardPreview key={index}>
              <p><strong>Q :</strong> {card.question}</p>
              <p><strong>R :</strong> {card.answer}</p>
            </CardPreview>
          ))}
        </div>
      )}

      {deckId && (
        <Button
          onClick={() => navigate(`/deck/${deckId}`)}
          style={{ backgroundColor: '#2ecc71', marginTop: '1.5rem' }}
        >
          📂 Aller voir ce deck
        </Button>
      )}
    </Container>
  );
};

export default GeneratePage;


