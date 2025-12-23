import React from 'react';
import { useNavigate } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { Users } from 'lucide-react';
import LoginForm from '@/components/auth/LoginForm';
<<<<<<< HEAD
import { base44 } from '@/api/base44Client';
=======

const STORAGE_PREFIX = 'schoolbus_';

const getTutors = () => {
  const data = localStorage.getItem(`${STORAGE_PREFIX}tutors`);
  return data ? JSON.parse(data) : [];
};
>>>>>>> fa70c49 (Ajout de la structure du projet)

export default function TutorLogin() {
  const navigate = useNavigate();

  const handleLogin = async ({ identifier, password }) => {
    // Get all tutors
<<<<<<< HEAD
    const tutors = await base44.entities.Tutor.list();
=======
    const tutors = getTutors();
>>>>>>> fa70c49 (Ajout de la structure du projet)
    
    // Find tutor by email or phone
    const tutor = tutors.find(t => 
      (t.email === identifier || t.phone === identifier) && t.password === password
    );

    if (!tutor) {
      throw new Error('Email/téléphone ou mot de passe incorrect');
    }

    // Store session
    localStorage.setItem('currentUser', JSON.stringify({ ...tutor, type: 'tutor' }));
    navigate(createPageUrl('TutorDashboard'));
  };

  return (
    <LoginForm
      title="Espace Tuteur"
      description="Connectez-vous pour gérer le transport de vos enfants"
      icon={Users}
      onSubmit={handleLogin}
      showRegister={true}
      registerPath="TutorRegister"
    />
  );
}