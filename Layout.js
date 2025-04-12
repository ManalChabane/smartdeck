import React from 'react';
import styled from 'styled-components';
import { NavLink, useNavigate } from 'react-router-dom';
import { LogOut, FileText, BarChart2, User, Play, PlusSquare } from 'lucide-react';

const Sidebar = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 230px;
  background-color: #2f3542;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 2rem 1rem;
  box-shadow: 2px 0 10px rgba(0, 0, 0, 0.1);
`;

const Logo = styled.h1`
  color: #fff;
  font-size: 1.6rem;
  text-align: center;
  margin-bottom: 2rem;
`;

const NavLinks = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.2rem;

  a {
    color: #f1f2f6;
    text-decoration: none;
    display: flex;
    align-items: center;
    font-size: 1rem;
    padding: 0.6rem 1rem;
    border-radius: 8px;
    transition: 0.2s ease;

    &.active {
      background-color: #ffa502;
      color: #2f3542;
      font-weight: bold;
    }

    &:hover {
      background-color: #57606f;
    }

    svg {
      margin-right: 10px;
    }
  }
`;

const BottomSection = styled.div`
  padding: 1rem;
  border-top: 1px solid #57606f;

  button {
    background: none;
    border: none;
    color: #f1f2f6;
    font-size: 1rem;
    display: flex;
    align-items: center;
    cursor: pointer;
    width: 100%;

    &:hover {
      color: #ffa502;
    }

    svg {
      margin-right: 10px;
    }
  }
`;

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user_id");
    navigate("/login");
  };

  const isLoggedIn = !!localStorage.getItem("token");

  return (
    <Sidebar>
      <div>
        <Logo>SmartDeck</Logo>

        {isLoggedIn && (
          <NavLinks>
            <NavLink to="/train"><Play size={18} /> S’entraîner</NavLink>
            <NavLink to="/stats"><BarChart2 size={18} /> Statistiques</NavLink>
            <NavLink to="/generate"><FileText size={18} /> Génération</NavLink>
            <NavLink to="/profile"><User size={18} /> Profil</NavLink>
          </NavLinks>
        )}
      </div>

      {isLoggedIn && (
        <BottomSection>
          <button onClick={handleLogout}>
            <LogOut size={18} /> Se déconnecter
          </button>
        </BottomSection>
      )}
    </Sidebar>
  );
};

export default Navbar;

