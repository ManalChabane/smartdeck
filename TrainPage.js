import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Confetti from 'react-confetti';
import useWindowSize from 'react-use/lib/useWindowSize';
import { useNavigate } from 'react-router-dom';
import { getDecks } from '../api';

// Styles
const Container = styled.div`max-width: 700px;margin: 0 auto;padding: 2rem;`;
const Heading = styled.h2`font-size: 2rem;font-weight: bold;margin-bottom: 1rem;`;
const Selector = styled.select`width: 100%;padding: 0.75rem;margin-bottom: 2rem;font-size: 1rem;border: 1px solid #ccc;border-radius: 8px;`;
const FlashcardWrapper = styled.div`perspective: 1000px;width: 100%;height: 250px;`;
const Flashcard = styled.div`position: relative;width: 100%;height: 100%;transform-style: preserve-3d;transition: transform 0.6s;cursor: pointer;border-radius: 12px;box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);background-color: #fff;`;
const CardFace = styled.div`position: absolute;width: 100%;height: 100%;backface-visibility: hidden;display: flex;align-items: center;justify-content: center;font-size: 1.25rem;padding: 1rem;border-radius: 12px;`;
const Front = styled(CardFace)`background: #e0f7fa;`;
const Back = styled(CardFace)`background: #ffe0b2;transform: rotateY(180deg);`;
const Buttons = styled.div`display: flex;justify-content: space-around;margin-top: 1.5rem;flex-wrap: wrap;gap: 1rem;`;
const ActionButton = styled.button`padding: 0.75rem 1.25rem;font-size: 1rem;background-color: #4caf50;color: white;border: none;border-radius: 8px;cursor: pointer;&:hover {background-color: #43a047;}`;
const ProgressText = styled.div`text-align: center;margin-top: 1rem;font-size: 1rem;`;
const ProgressBar = styled.div`width: 100%;height: 10px;background-color: #ddd;border-radius: 5px;margin-top: 0.5rem;`;
const ProgressFill = styled.div`height: 100%;background-color: #4caf50;border-radius: 5px;width: ${props => props.percent}%;`;
const SummaryCard = styled.div`background: #f0fdf4;border: 1px solid #c8e6c9;border-radius: 16px;padding: 2rem;text-align: center;box-shadow: 0 0 12px rgba(0,0,0,0.05);margin-top: 1rem;`;

// Composant principal
const TrainPage = () => {
  const [decks, setDecks] = useState({});
  const [deckNames, setDeckNames] = useState([]);
  const [selectedDeck, setSelectedDeck] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);
  const [wrongCount, setWrongCount] = useState(0);
  const [completed, setCompleted] = useState(false);
  const { width, height } = useWindowSize();
  const navigate = useNavigate();

  // 🔒 Vérifie l'authentification
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
    }
  }, [navigate]);

  // 📦 Charge les decks
  useEffect(() => {
    async function fetchDecks() {
      try {
        const { data } = await getDecks();
        const deckObj = {};
        data.forEach(deck => deckObj[deck.name] = deck.cards);
        setDecks(deckObj);
        setDeckNames(Object.keys(deckObj));
      } catch (err) {
        console.error('Failed to load decks:', err);
        navigate('/login'); // si token expiré ou erreur 401
      }
    }
    fetchDecks();
  }, [navigate]);

  const handleDeckSelect = (e) => {
    setSelectedDeck(e.target.value);
    setCurrentIndex(0);
    setFlipped(false);
    setCorrectCount(0);
    setWrongCount(0);
    setCompleted(false);
  };

  const handleFlip = () => setFlipped(!flipped);

  const handleNext = (isCorrect) => {
    if (isCorrect) setCorrectCount(prev => prev + 1);
    else setWrongCount(prev => prev + 1);

    if (currentIndex < decks[selectedDeck]?.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setFlipped(false);
    } else {
      setCompleted(true);
    }
  };

  const handleRestart = () => {
    setCurrentIndex(0);
    setCorrectCount(0);
    setWrongCount(0);
    setCompleted(false);
    setFlipped(false);
  };

  const currentCard = decks[selectedDeck]?.[currentIndex];
  const totalCards = decks[selectedDeck]?.length || 0;
  const progressPercent = ((currentIndex + 1) / totalCards) * 100;
  const correctRate = totalCards ? Math.round((correctCount / totalCards) * 100) : 0;

  return (
    <Container>
      <Heading>Train with your Deck</Heading>
      <Selector onChange={handleDeckSelect} value={selectedDeck}>
        <option value="">Select a Deck</option>
        {deckNames.map((name) => (
          <option key={name} value={name}>{name}</option>
        ))}
      </Selector>

      {completed && (
        <>
          <Confetti width={width} height={height} numberOfPieces={250} />
          <SummaryCard>
            <h3>🎉 You’ve completed the deck!</h3>
            <p>✅ Correct: {correctCount}</p>
            <p>❌ Wrong: {wrongCount}</p>
            <p>🎯 Accuracy: {correctRate}%</p>
            <Buttons>
              <ActionButton onClick={handleRestart}>🔁 Restart this deck</ActionButton>
              <ActionButton onClick={() => setSelectedDeck('')}>🔙 Back to deck selection</ActionButton>
            </Buttons>
          </SummaryCard>
        </>
      )}

      {!completed && currentCard && (
        <>
          <FlashcardWrapper onClick={handleFlip}>
            <Flashcard style={{ transform: flipped ? 'rotateY(180deg)' : 'rotateY(0)' }}>
              <Front>{currentCard.question}</Front>
              <Back>{currentCard.answer}</Back>
            </Flashcard>
          </FlashcardWrapper>

          <Buttons>
            <ActionButton onClick={() => handleNext(true)}>✅ I got it right</ActionButton>
            <ActionButton onClick={() => handleNext(false)}>❌ I got it wrong</ActionButton>
          </Buttons>

          <ProgressText>
            Card {currentIndex + 1} of {totalCards} — ✅ {correctCount} / ❌ {wrongCount}
          </ProgressText>

          <ProgressBar>
            <ProgressFill percent={progressPercent} />
          </ProgressBar>
        </>
      )}
    </Container>
  );
};

export default TrainPage;

