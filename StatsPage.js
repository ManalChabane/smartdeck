import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import axios from 'axios';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const Container = styled(motion.div)`
  padding: 2rem;
  max-width: 800px;
  margin: 0 auto;
`;

const Heading = styled.h2`
  font-size: 2rem;
  margin-bottom: 1.25rem;
  text-align: center;
`;

const Subtext = styled.p`
  font-size: 1.1rem;
  color: #666;
  text-align: center;
`;

const Card = styled.div`
  background-color: #f1f5f9;
  border-radius: 12px;
  padding: 1.5rem;
  margin-bottom: 1.5rem;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.08);
`;

const Select = styled.select`
  margin: 1rem auto 2rem auto;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  font-size: 1rem;
  display: block;
`;

const StatsPage = () => {
  const userId = 1;
  const [deckId, setDeckId] = useState(3);
  const [decks, setDecks] = useState([]);
  const [score, setScore] = useState(null);
  const [history, setHistory] = useState([]);
  const [filteredHistory, setFilteredHistory] = useState([]);
  const [toReview, setToReview] = useState([]);

  useEffect(() => {
    // Charger les decks
    axios.get("http://localhost:5000/decks")
      .then(res => setDecks(res.data))
      .catch(err => console.error("Erreur chargement decks", err));

    // Charger les cartes à réviser aujourd'hui
    axios.get(`http://localhost:5000/users/${userId}/spaced-review`)
      .then(res => setToReview(res.data))
      .catch(() => setToReview([]));
  }, []);

  useEffect(() => {
    if (!deckId) return;

    // Charger le score
    axios.get(`http://localhost:5000/decks/${deckId}/score`)
      .then(res => setScore(res.data))
      .catch(() => setScore(null));

    // Charger l’historique de révision
    axios.get(`http://localhost:5000/users/${userId}/review-history`)
      .then(res => {
        setHistory(res.data);
        const filtered = res.data
          .filter(card => card.deck_id === parseInt(deckId))
          .sort((a, b) => new Date(b.last_reviewed) - new Date(a.last_reviewed));
        setFilteredHistory(filtered);
      })
      .catch(() => {
        setHistory([]);
        setFilteredHistory([]);
      });
  }, [deckId]);

  return (
    <Container
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Heading>📊 Statistiques</Heading>
      <Subtext>Choisis un deck pour voir tes statistiques de révision</Subtext>

      <Select onChange={(e) => setDeckId(e.target.value)} value={deckId}>
        <option value="">-- Choisir un deck --</option>
        {decks.map(deck => (
          <option key={deck.id} value={deck.id}>
            {deck.name}
          </option>
        ))}
      </Select>

      {score && (
        <>
          <Card>
            <h3>Deck : {score.deck_id}</h3>
            <p>✅ Bonnes réponses : {score.correct_answers}</p>
            <p>📋 Total de cartes : {score.total_flashcards}</p>
            <p>📈 Pourcentage : {score.score_percentage}%</p>
          </Card>

          <Card>
            <h4>📊 Graphique des bonnes réponses</h4>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={[{ name: 'Score', score: score.score_percentage }]}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="score" fill="#00b894" />
              </BarChart>
            </ResponsiveContainer>
          </Card>
        </>
      )}

      <h3>🕓 Historique de Révision (Deck sélectionné)</h3>
      {filteredHistory.length > 0 ? filteredHistory.map(card => (
        <Card key={card.id}>
          <p><strong>📌 Question :</strong> {card.question}</p>
          <p><strong>✅ Réponse :</strong> {card.answer}</p>
          <p><strong>📅 Dernière révision :</strong> {card.last_reviewed}</p>
          <p><strong>🎯 Correct ?</strong> {card.is_correct ? "Oui" : "Non"}</p>
        </Card>
      )) : <p>Aucune révision pour ce deck.</p>}

      <h3>⏰ À réviser aujourd’hui</h3>
      {toReview.length > 0 ? toReview.map(card => (
        <Card key={card.id}>
          <p><strong>📌 Question :</strong> {card.question}</p>
          <p><strong>✅ Réponse :</strong> {card.answer}</p>
          <p><strong>📆 Prochaine révision :</strong> {card.next_review}</p>
        </Card>
      )) : <p>🎉 Rien à revoir aujourd’hui !</p>}
    </Container>
  );
};

export default StatsPage;




