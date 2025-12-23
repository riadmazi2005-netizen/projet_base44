import React from 'react';
import { useNavigate } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { UserCog } from 'lucide-react';
import LoginForm from '@/components/auth/LoginForm';
<<<<<<< HEAD
import { base44 } from '@/api/base44Client';
=======
import { mockApi } from '@/services/mockData';
>>>>>>> fa70c49 (Ajout de la structure du projet)

export default function SupervisorLogin() {
  const navigate = useNavigate();

  const handleLogin = async ({ identifier, password }) => {
<<<<<<< HEAD
    const supervisors = await base44.entities.Supervisor.list();
=======
    const supervisors = await mockApi.entities.Supervisor.list();
>>>>>>> fa70c49 (Ajout de la structure du projet)
    
    const supervisor = supervisors.find(s => 
      (s.email === identifier || s.phone === identifier) && s.password === password
    );

    if (!supervisor) {
      throw new Error('Email/téléphone ou mot de passe incorrect');
    }

    localStorage.setItem('currentUser', JSON.stringify({ ...supervisor, type: 'supervisor' }));
    navigate(createPageUrl('SupervisorDashboard'));
  };

  return (
    <LoginForm
      title="Espace Responsable Bus"
      description="Connectez-vous pour gérer votre bus et vos élèves"
      icon={UserCog}
      onSubmit={handleLogin}
    />
  );
}