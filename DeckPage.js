/*
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, PlusCircle } from 'lucide-react';

const Container = styled.div`
  padding: 3rem 1rem;
  max-width: 800px;
  margin: auto;
  background-color: #ffffff;
  border-radius: 20px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h2`
  text-align: center;
  font-size: 2rem;
  margin-bottom: 2rem;
  color: #2f3542;
`;

const Input = styled.input`
  width: 100%;
  padding: 1rem;
  margin-bottom: 1rem;
  font-size: 1rem;
  border: 1px solid #ddd;
  border-radius: 12px;
  background: #f9f9f9;
  transition: border 0.2s;

  &:focus {
    border-color: #1e90ff;
    outline: none;
  }
`;

const Button = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background-color: #1e90ff;
  color: white;
  padding: 0.9rem 1.6rem;
  font-size: 1rem;
  border: none;
  border-radius: 12px;
  cursor: pointer;
  transition: background-color 0.3s;
  margin-top: 0.5rem;

  &:hover {
    background-color: #1c86ee;
  }

  &:disabled {
    background-color: #a0c4ff;
    cursor: not-allowed;
  }
`;

const CardList = styled.ul`
  margin-top: 2rem;
  list-style: none;
  padding: 0;
`;

const CardItem = styled(motion.li)`
  background: #f1f2f6;
  padding: 1.2rem;
  border-radius: 12px;
  margin-bottom: 1rem;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 1rem;
  color: #2f3542;
`;

const CardContent = styled.div`
  text-align: left;

  strong {
    display: block;
    margin-bottom: 0.2rem;
    color: #1e90ff;
  }
`;

const DeckPage = () => {
  const [front, setFront] = useState('');
  const [back, setBack] = useState('');
  const [cards, setCards] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/api/cards')
      .then(res => res.json())
      .then(data => setCards(data))
      .catch(err => console.error('Fetch error:', err));
  }, []);
  
  const addCard = () => {
    if (front.trim() && back.trim()) {
      const newCard = { front, back };
      fetch('http://localhost:5000/api/cards', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newCard),
      })
        .then(res => res.json())
        .then(savedCard => {
          setCards([...cards, savedCard]);
          setFront('');
          setBack('');
        })
        .catch(err => console.error('Add error:', err));
    }
  };

  return (
    <Container>
      <Title>Create Your Flashcard Deck</Title>
      <Input
        type="text"
        placeholder="Front side (question)"
        value={front}
        onChange={(e) => setFront(e.target.value)}
      />
      <Input
        type="text"
        placeholder="Back side (answer)"
        value={back}
        onChange={(e) => setBack(e.target.value)}
      />
      <Button onClick={addCard} disabled={!front.trim() || !back.trim()}>
        <PlusCircle size={20} /> Add Card
      </Button>

      <CardList>
        <AnimatePresence>
          {cards.map((card, index) => (
            <CardItem
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <CardContent>
                <strong>Q:</strong> {card.front}
                <strong>A:</strong> {card.back}
              </CardContent>
              <CheckCircle size={20} color="#2ed573" />
            </CardItem>
          ))}
        </AnimatePresence>
      </CardList>
    </Container>
  );
};

export default DeckPage;

*/

import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, PlusCircle } from 'lucide-react';

const PageWrapper = styled.div`
  min-height: 100vh;
  background: linear-gradient(to right, #e6c8ff, #f5e6c8);
  padding: 3rem 1rem;
`;

const Container = styled.div`
  max-width: 800px;
  margin: auto;
  background-color: #ffffff;
  border-radius: 24px;
  padding: 3rem 2rem;
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.08);
  font-family: 'Poppins', sans-serif;
`;

const Title = styled.h2`
  text-align: center;
  font-size: 2.5rem;
  color: #a064c8;
  margin-bottom: 2.5rem;
`;

const Input = styled.input`
  width: 100%;
  padding: 1rem;
  margin-bottom: 1rem;
  font-size: 1rem;
  border: 2px solid #c8a0ff;
  border-radius: 12px;
  background: #fafafa;
  transition: border 0.2s;

  &:focus {
    border-color: #a064c8;
    outline: none;
  }
`;

const Button = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.6rem;
  background-color: #e63296;
  color: white;
  padding: 0.9rem 1.6rem;
  font-size: 1.05rem;
  border: none;
  border-radius: 12px;
  cursor: pointer;
  transition: background-color 0.3s, transform 0.2s;
  width: 100%;

  &:hover {
    background-color: #c82864;
    transform: translateY(-1px);
  }

  &:disabled {
    background-color: #f5c7e4;
    cursor: not-allowed;
  }
`;

const CardList = styled.ul`
  margin-top: 2.5rem;
  list-style: none;
  padding: 0;
`;

const CardItem = styled(motion.li)`
  background: #ffffff;
  border: 2px solid #f1f2f6;
  padding: 1.2rem;
  border-radius: 16px;
  margin-bottom: 1rem;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const CardContent = styled.div`
  text-align: left;
  color: #505a64;

  strong {
    display: block;
    color: #a064c8;
    margin-bottom: 0.3rem;
  }
`;

const DeckPage = () => {
  const [front, setFront] = useState('');
  const [back, setBack] = useState('');
  const [cards, setCards] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/api/cards')
      .then(res => res.json())
      .then(data => setCards(data))
      .catch(err => console.error('Fetch error:', err));
  }, []);
  
  const addCard = () => {
    if (front.trim() && back.trim()) {
      const newCard = { front, back };
      fetch('http://localhost:5000/api/cards', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newCard),
      })
        .then(res => res.json())
        .then(savedCard => {
          setCards([...cards, savedCard]);
          setFront('');
          setBack('');
        })
        .catch(err => console.error('Add error:', err));
    }
  };

  return (
    <PageWrapper>
      <Container>
        <Title>Create Your Flashcard Deck</Title>
        <Input
          type="text"
          placeholder="Front side (question)"
          value={front}
          onChange={(e) => setFront(e.target.value)}
        />
        <Input
          type="text"
          placeholder="Back side (answer)"
          value={back}
          onChange={(e) => setBack(e.target.value)}
        />
        <Button onClick={addCard} disabled={!front.trim() || !back.trim()}>
          <PlusCircle size={20} /> Add Card
        </Button>

        <CardList>
          <AnimatePresence>
            {cards.map((card, index) => (
              <CardItem
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <CardContent>
                  <strong>Q:</strong> {card.front}
                  <strong>A:</strong> {card.back}
                </CardContent>
                <CheckCircle size={24} color="#b4ffb4" />
              </CardItem>
            ))}
          </AnimatePresence>
        </CardList>
      </Container>
    </PageWrapper>
  );
};

export default DeckPage;
