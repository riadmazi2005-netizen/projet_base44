import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { createPageUrl } from '@/utils';
<<<<<<< HEAD
import { base44 } from '@/api/base44Client';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, User, Bell, FileText, Save, Loader2, CheckCircle, Info } from 'lucide-react';
import { motion } from 'framer-motion';
import toast, { Toaster } from 'react-hot-toast';

export default function TutorProfile() {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState(null);
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('currentUser'));
    if (!user || user.type !== 'tutor') {
      navigate(createPageUrl('TutorLogin'));
      return;
    }
    setCurrentUser(user);
    setFormData({
      firstName: user.firstName || '',
      lastName: user.lastName || '',
      email: user.email || '',
      phone: user.phone || '',
      address: user.address || '',
      cin: user.cin || ''
    });
    setLoading(false);
  }, []);

  const handleSave = async () => {
    setSaving(true);
    try {
      await base44.entities.Tutor.update(currentUser.id, formData);
      
      const updatedUser = { ...currentUser, ...formData };
      localStorage.setItem('currentUser', JSON.stringify(updatedUser));
      setCurrentUser(updatedUser);
      setSaved(true);
      toast.success('✅ Enregistrement avec succès', {
        duration: 3000,
        style: {
          background: '#10b981',
          color: '#fff',
          fontWeight: '600',
          padding: '16px',
          borderRadius: '12px'
        }
      });
      setTimeout(() => setSaved(false), 3000);
    } catch (error) {
      console.error('Error updating profile:', error);
      toast.error('Erreur lors de l\'enregistrement');
    } finally {
      setSaving(false);
=======
import { mockData } from '@/services/mockDataService';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  ShieldCheck, Users, Bus, MapPin, CreditCard, AlertTriangle,
  Bell, FileText, UserCog, Loader2, CheckCircle, Trash2, BarChart3
} from 'lucide-react';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';

export default function AdminNotifications() {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState(null);
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('currentUser'));
    if (!user || user.type !== 'admin') {
      navigate(createPageUrl('AdminLogin'));
      return;
    }
    setCurrentUser(user);
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const notifs = await mockData.entities.Notification.filter({ recipientType: 'admin' });
      setNotifications(notifs.sort((a, b) => new Date(b.created_date) - new Date(a.created_date)));
    } catch (error) {
      console.error('Error loading notifications:', error);
    } finally {
      setLoading(false);
    }
  };

  const markAsRead = async (notificationId) => {
    try {
      await mockData.entities.Notification.update(notificationId, { read: true });
      loadData();
    } catch (error) {
      console.error('Error marking notification as read:', error);
    }
  };

  const deleteNotification = async (notificationId) => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer cette notification ?')) return;
    try {
      await mockData.entities.Notification.delete(notificationId);
      loadData();
    } catch (error) {
      console.error('Error deleting notification:', error);
    }
  };

  const markAllAsRead = async () => {
    try {
      const unreadNotifs = notifications.filter(n => !n.read);
      await Promise.all(unreadNotifs.map(n => mockData.entities.Notification.update(n.id, { read: true })));
      loadData();
    } catch (error) {
      console.error('Error marking all as read:', error);
>>>>>>> fa70c49 (Ajout de la structure du projet)
    }
  };

  const menuItems = [
<<<<<<< HEAD
    { label: 'Tableau de bord', path: 'TutorDashboard', icon: Users },
    { label: 'Mes Élèves', path: 'TutorStudents', icon: User },
    { label: 'Notifications', path: 'TutorNotifications', icon: Bell },
    { label: 'Mon Profil', path: 'TutorProfile', icon: FileText, active: true },
=======
    { label: 'Tableau de bord', path: 'AdminDashboard', icon: ShieldCheck },
    { label: 'Inscriptions', path: 'AdminRegistrations', icon: FileText },
    { label: 'Élèves', path: 'AdminStudents', icon: Users },
    { label: 'Bus', path: 'AdminBuses', icon: Bus },
    { label: 'Trajets', path: 'AdminRoutes', icon: MapPin },
    { label: 'Chauffeurs', path: 'AdminDrivers', icon: UserCog },
    { label: 'Responsables', path: 'AdminSupervisors', icon: UserCog },
    { label: 'Paiements', path: 'AdminPayments', icon: CreditCard },
    { label: 'Accidents', path: 'AdminAccidents', icon: AlertTriangle },
    { label: 'Notifications', path: 'AdminNotifications', icon: Bell, active: true },
    { label: 'Statistiques', path: 'AdminStats', icon: BarChart3 },
>>>>>>> fa70c49 (Ajout de la structure du projet)
  ];

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-amber-50 to-yellow-50">
        <Loader2 className="w-8 h-8 animate-spin text-amber-500" />
      </div>
    );
  }

<<<<<<< HEAD
  return (
    <DashboardLayout
      userType="Espace Tuteur"
      userName={currentUser ? `${currentUser.firstName} ${currentUser.lastName}` : ''}
      menuItems={menuItems}
      notifications={[]}
    >
      <Toaster position="top-center" />
      <div className="max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6">Mon Profil</h1>

          <Card className="border-amber-100 shadow-lg">
            <CardHeader className="border-b border-amber-100 bg-gradient-to-r from-amber-50 to-yellow-50">
              <CardTitle className="flex items-center gap-2">
                <User className="w-5 h-5 text-amber-600" />
                Informations personnelles
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Prénom</Label>
                  <Input
                    value={formData.firstName}
                    onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Nom</Label>
                  <Input
                    value={formData.lastName}
                    onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Email</Label>
                <Input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Téléphone</Label>
                  <Input
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label>CIN</Label>
                  <Input
                    value={formData.cin}
                    disabled
                    className="bg-gray-50"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Adresse</Label>
                <Input
                  value={formData.address}
                  onChange={(e) => setFormData({...formData, address: e.target.value})}
                />
              </div>

              <Button 
                onClick={handleSave}
                className="w-full bg-gradient-to-r from-amber-500 to-yellow-500"
                disabled={saving}
              >
                {saving ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Enregistrement...
                  </>
                ) : saved ? (
                  <>
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Enregistré !
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4 mr-2" />
                    Enregistrer les modifications
                  </>
                )}
              </Button>
            </CardContent>
          </Card>

          {/* Important Information */}
          <Card className="mt-6 border-blue-100 bg-blue-50/50">
            <CardContent className="p-6">
              <div className="flex items-start gap-3">
                <Info className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
                <div className="space-y-2 text-sm text-blue-800">
                  <p className="font-semibold text-blue-900">Informations importantes</p>
                  <ul className="space-y-1 list-disc list-inside">
                    <li>Les paiements s'effectuent directement à l'école</li>
                    <li>Vous serez notifié en cas de retard ou d'absence</li>
                    <li>Pour toute modification de groupe, contacter l'administration</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
=======
  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <DashboardLayout
      userType="Espace Administrateur"
      userName={currentUser?.fullName || 'Administrateur'}
      menuItems={menuItems}
      notifications={notifications}
    >
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Notifications</h1>
            <p className="text-gray-500 mt-1">{unreadCount} notification(s) non lue(s)</p>
          </div>
          {unreadCount > 0 && (
            <Button 
              onClick={markAllAsRead}
              variant="outline"
              className="border-amber-300"
            >
              <CheckCircle className="w-4 h-4 mr-2" />
              Tout marquer comme lu
            </Button>
          )}
        </div>

        {notifications.length > 0 ? (
          <div className="space-y-3">
            {notifications.map((notif) => (
              <Card 
                key={notif.id} 
                className={`border-amber-100 ${!notif.read ? 'bg-amber-50/30' : ''}`}
              >
                <CardContent className="p-4">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-start gap-3 flex-1">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                        notif.type === 'accident' ? 'bg-red-100' :
                        notif.type === 'validation' ? 'bg-green-100' :
                        notif.type === 'payment' ? 'bg-blue-100' :
                        'bg-amber-100'
                      }`}>
                        {notif.type === 'accident' ? <AlertTriangle className="w-5 h-5 text-red-600" /> :
                         notif.type === 'validation' ? <CheckCircle className="w-5 h-5 text-green-600" /> :
                         notif.type === 'payment' ? <CreditCard className="w-5 h-5 text-blue-600" /> :
                         <Bell className="w-5 h-5 text-amber-600" />}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-semibold text-gray-900">{notif.title}</h3>
                          {!notif.read && (
                            <Badge className="bg-amber-500 text-white text-xs">Nouveau</Badge>
                          )}
                        </div>
                        <p className="text-sm text-gray-600 mb-2">{notif.message}</p>
                        <p className="text-xs text-gray-400">
                          {format(new Date(notif.created_date), 'd MMMM yyyy à HH:mm', { locale: fr })}
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      {!notif.read && (
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => markAsRead(notif.id)}
                          className="border-green-300 text-green-600"
                        >
                          <CheckCircle className="w-4 h-4" />
                        </Button>
                      )}
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => deleteNotification(notif.id)}
                        className="border-red-300 text-red-600"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <Card className="border-amber-100">
            <CardContent className="p-12 text-center">
              <Bell className="w-16 h-16 mx-auto mb-4 text-gray-300" />
              <h3 className="text-lg font-semibold text-gray-600 mb-2">Aucune notification</h3>
              <p className="text-gray-500">Vous n'avez pas encore reçu de notifications</p>
            </CardContent>
          </Card>
        )}
>>>>>>> fa70c49 (Ajout de la structure du projet)
      </div>
    </DashboardLayout>
  );
}