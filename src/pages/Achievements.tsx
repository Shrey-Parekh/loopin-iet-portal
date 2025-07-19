import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Header from '../components/Header';
import { Trophy, Trash2, Plus } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { useNavigate } from 'react-router-dom';
import { AlertDialog, AlertDialogTrigger, AlertDialogContent, AlertDialogHeader, AlertDialogFooter, AlertDialogTitle, AlertDialogDescription, AlertDialogAction, AlertDialogCancel } from '@/components/ui/alert-dialog';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0
  }
};

const Achievements = () => {
  const [achievements, setAchievements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [deleteMode, setDeleteMode] = useState(false);
  const [adding, setAdding] = useState(false);
  const [deletingId, setDeletingId] = useState(null);
  const { toast } = useToast ? useToast() : { toast: () => {} };
  const isLoggedIn = typeof window !== 'undefined' && localStorage.getItem('isLoggedIn') === 'true';
  const navigate = useNavigate();
  const [form, setForm] = useState({
    image: '',
    name: '',
    discription: '',
    achievement_type: '',
    date: '',
    department: '',
    Position: '',
    Year: '',
    Course: '',
  });
  const [showDialog, setShowDialog] = useState(false);
  const [selectedToDelete, setSelectedToDelete] = useState(null);

  const API_BASE = 'https://loopin-iet-portal-1.onrender.com/api/achievements';

  const fetchAchievements = () => {
    setLoading(true);
    fetch(API_BASE)
      .then(res => res.json())
      .then(data => {
        setAchievements(data);
        setLoading(false);
      })
      .catch(err => {
        setError('Failed to load achievements.');
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchAchievements();
  }, []);

  const handleAdd = async (e) => {
    e.preventDefault();
    setAdding(true);
    try {
      const res = await fetch(API_BASE, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error('Failed to add achievement');
      setShowAddModal(false);
      setForm({ image: '', name: '', discription: '', achievement_type: '', date: '', department: '', Position: '', Year: '', Course: '' });
      fetchAchievements();
      toast && toast({ title: 'Achievement Added', description: 'Achievement was added successfully.' });
    } catch (err) {
      toast && toast({ title: 'Error', description: 'Failed to add achievement', variant: 'destructive' });
    } finally {
      setAdding(false);
    }
  };

  const handleDeleteClick = (id) => {
    setSelectedToDelete(id);
    setShowDialog(true);
  };
  const handleDeleteConfirm = async () => {
    if (!selectedToDelete) return;
    setDeletingId(selectedToDelete);
    try {
      const res = await fetch(`${API_BASE}/${selectedToDelete}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Failed to delete achievement');
      fetchAchievements();
      toast && toast({ title: 'Achievement Deleted', description: 'Achievement was deleted.' });
    } catch (err) {
      toast && toast({ title: 'Error', description: 'Failed to delete achievement', variant: 'destructive' });
    } finally {
      setDeletingId(null);
      setShowDialog(false);
      setSelectedToDelete(null);
    }
  };

  return (
    <div className="min-h-screen relative overflow-x-hidden" style={{ background: 'linear-gradient(120deg, #f8f6ff 0%, #f3e8ff 40%, #e0c3fc 70%, #fff 100%)' }}>
      {/* Animated background elements */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 0.13, scale: 1 }} transition={{ duration: 2, ease: 'easeOut' }} className="absolute top-[-12%] left-[-10%] w-[65vw] h-[65vw] rounded-full bg-gradient-to-br from-[#a259c6] via-[#f3e8ff] to-[#4f1b59] blur-3xl" />
        <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 0.09, scale: 1 }} transition={{ duration: 2, delay: 0.5, ease: 'easeOut' }} className="absolute bottom-[-10%] right-[-10%] w-[55vw] h-[55vw] rounded-full bg-gradient-to-br from-[#4f1b59] via-[#f3e8ff] to-[#fff] blur-3xl" />
        <motion.div initial={{ opacity: 0, scale: 0.7 }} animate={{ opacity: 0.07, scale: 1 }} transition={{ duration: 2.2, delay: 0.8, ease: 'easeOut' }} className="absolute top-[30%] left-[-15%] w-[40vw] h-[40vw] rounded-full bg-gradient-to-br from-[#f9e7ff] via-[#ffe6fa] to-[#fff] blur-3xl" />
        <motion.div initial={{ opacity: 0, scale: 0.7 }} animate={{ opacity: 0.06, scale: 1 }} transition={{ duration: 2.2, delay: 1.1, ease: 'easeOut' }} className="absolute bottom-[10%] right-[-18%] w-[38vw] h-[38vw] rounded-full bg-gradient-to-br from-[#fff] via-[#e0c3fc] to-[#f3e8ff] blur-3xl" />
        <div className="absolute bottom-0 left-0 w-full h-40 bg-gradient-to-t from-white/80 via-white/0 to-transparent" />
      </div>
      <Header />
      <div className="relative z-10 py-20">
        <div className="container mx-auto px-4">
          {/* Section Heading */}
          <motion.div className="text-center mb-16" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: "easeOut" }}>
            <motion.span className="inline-block px-6 py-3 bg-gradient-to-r from-[#a259c6] to-[#4f1b59] text-white rounded-full text-sm font-semibold mb-6 shadow-lg" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6, delay: 0.2 }}>
              <Trophy className="inline-block w-4 h-4 mr-2" />
              Achievements
            </motion.span>
            <motion.h1 className="text-5xl md:text-6xl font-extrabold text-[#2d1b3d] mb-6 tracking-tight font-['Abril Fatface','Doto',cursive,serif]" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.3 }}>
              Celebrate Our Successes
            </motion.h1>
            <motion.p className="text-xl text-gray-700 max-w-4xl mx-auto leading-relaxed" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.4 }}>
              Discover the outstanding achievements and milestones of our members and teams. We take pride in every accomplishment!
            </motion.p>
          </motion.div>
          {isLoggedIn && (
            <div className="flex flex-col md:flex-row gap-3 mb-8 items-center justify-end">
              <button
                className="px-5 py-2 border border-[#4f1b59] text-[#4f1b59] font-semibold rounded-full shadow bg-white hover:bg-[#4f1b59] hover:text-white transition-all text-sm"
                onClick={() => navigate('/add-achievement')}
              >
                <Plus className="w-4 h-4 mr-1 inline" /> Add Achievement
              </button>
              <button
                className={`px-5 py-2 border font-semibold rounded-full shadow bg-white transition-all text-sm flex items-center gap-2 ${deleteMode ? 'border-red-600 text-red-600 bg-red-50 scale-105 ring-2 ring-red-200' : 'border-[#a259c6] text-[#a259c6] hover:bg-red-600 hover:text-white'}`}
                onClick={() => setDeleteMode(dm => !dm)}
                style={{ transition: 'all 0.2s cubic-bezier(0.4,0,0.2,1)' }}
              >
                <Trash2 className="w-4 h-4 mr-1" /> Delete Achievement
              </button>
            </div>
          )}
          {/* Achievements Cards */}
          {loading ? (
            <div className="flex justify-center items-center min-h-[200px] text-lg text-gray-500">Loading achievements...</div>
          ) : error ? (
            <div className="flex justify-center items-center min-h-[200px] text-lg text-red-500">{error}</div>
          ) : achievements.length === 0 ? (
            <div className="flex justify-center items-center min-h-[200px] text-lg text-gray-500">No achievements found.</div>
          ) : (
            <motion.div className="grid grid-cols-1 gap-12 max-w-4xl mx-auto" variants={containerVariants} initial="hidden" animate="visible">
              {achievements.map((ach, i) => (
                <motion.div key={ach.id} className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 p-0 flex flex-col md:flex-row items-stretch transition-all duration-300 overflow-hidden" variants={itemVariants} whileHover={{ scale: 1.03, y: -6 }} style={{ background: 'linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(248,246,255,0.8) 100%)', boxShadow: '0 20px 40px rgba(0,0,0,0.1), 0 0 0 1px rgba(255,255,255,0.2)' }}>
                  {/* Left: Image */}
                  <div className="w-full md:w-1/3 flex items-center justify-center bg-gradient-to-br from-[#a259c6] to-[#4f1b59] p-6 md:p-8 relative min-h-[140px]">
                    <img src={ach.image} alt={ach.name} className="w-24 h-24 md:w-32 md:h-32 rounded-2xl object-cover border-4 border-white shadow-lg" onError={e => { e.currentTarget.src = '/placeholder.svg'; }} />
                    {ach.Position && (
                      <span className="absolute top-2 left-2 md:top-4 md:left-4 px-3 py-1 md:px-4 md:py-1 rounded-full bg-gradient-to-r from-purple-500 to-purple-800 text-white font-bold text-xs md:text-sm shadow-lg z-10 whitespace-nowrap">
                        {ach.Position}
                      </span>
                    )}
                  </div>
                  {/* Right: Details */}
                  <div className="flex-1 flex flex-col justify-center p-4 md:p-8 items-center text-center">
                    <h3 className="text-lg md:text-2xl font-bold text-[#2d1b3d] mb-2 font-['Doto',sans-serif]">{ach.name}</h3>
                    {ach.department && (
                      <span className="inline-block px-4 py-1 rounded-full bg-gradient-to-r from-purple-500 to-purple-700 text-white font-bold text-xs mb-2">
                        {ach.department}
                      </span>
                    )}
                    <div className="mb-2 text-xs md:text-sm text-gray-700 dark:text-gray-300 flex flex-wrap justify-center gap-x-2 gap-y-1">
                      {ach.Course && <span className="font-semibold">{ach.Course}</span>}
                      {ach.Year && <span>&middot; {ach.Year}{ach.Year === 1 ? 'st' : ach.Year === 2 ? 'nd' : ach.Year === 3 ? 'rd' : 'th'} year</span>}
                    </div>
                    <span className={`inline-block px-3 md:px-4 py-1 rounded-full text-xs font-bold mt-2 mb-1
                      ${ach.achievement_type === 'SUPER CORE' ? 'bg-gradient-to-r from-red-500 to-red-600 text-white' :
                        ach.achievement_type === 'CORE' ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white' :
                        'bg-gradient-to-r from-gray-500 to-gray-600 text-white'}`}
                    >
                      {ach.achievement_type?.toUpperCase()}
                    </span>
                  </div>
                  {/* Description below both */}
                  <motion.div className="bg-white/90 dark:bg-gray-900/80 rounded-b-3xl px-4 md:px-8 py-4 md:py-6 text-gray-700 dark:text-gray-200 text-xs md:text-base leading-relaxed shadow-inner border-t border-gray-200/40 w-full" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }}>
                    {ach.discription}
                  </motion.div>
                  {deleteMode && isLoggedIn && (
                    <button
                      className="absolute top-4 right-4 bg-red-600 hover:bg-red-700 text-white rounded-full p-2 shadow-lg z-20"
                      onClick={() => handleDeleteClick(ach.id)}
                      disabled={deletingId === ach.id}
                      title="Delete Achievement"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  )}
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>
      </div>
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-lg relative">
            <button className="absolute top-3 right-3 text-gray-400 hover:text-gray-700 text-xl" onClick={() => setShowAddModal(false)}>&times;</button>
            <h2 className="text-2xl font-bold mb-6 text-center">Add Achievement</h2>
            <form onSubmit={handleAdd} className="flex flex-col gap-4">
              <input type="text" name="name" placeholder="Name" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} required className="border rounded-lg px-4 py-2" />
              <input type="text" name="achievement_type" placeholder="Achievement Type" value={form.achievement_type} onChange={e => setForm(f => ({ ...f, achievement_type: e.target.value }))} required className="border rounded-lg px-4 py-2" />
              <input type="date" name="date" placeholder="Date" value={form.date} onChange={e => setForm(f => ({ ...f, date: e.target.value }))} required className="border rounded-lg px-4 py-2" />
              <input type="text" name="department" placeholder="Department" value={form.department} onChange={e => setForm(f => ({ ...f, department: e.target.value }))} className="border rounded-lg px-4 py-2" />
              <input type="text" name="Position" placeholder="Position" value={form.Position} onChange={e => setForm(f => ({ ...f, Position: e.target.value }))} className="border rounded-lg px-4 py-2" />
              <input type="number" name="Year" placeholder="Year" value={form.Year} onChange={e => setForm(f => ({ ...f, Year: e.target.value }))} className="border rounded-lg px-4 py-2" />
              <input type="text" name="Course" placeholder="Course" value={form.Course} onChange={e => setForm(f => ({ ...f, Course: e.target.value }))} className="border rounded-lg px-4 py-2" />
              <textarea name="discription" placeholder="Description" value={form.discription} onChange={e => setForm(f => ({ ...f, discription: e.target.value }))} required className="border rounded-lg px-4 py-2 min-h-[80px]" />
              <input type="text" name="image" placeholder="Image URL or base64" value={form.image} onChange={e => setForm(f => ({ ...f, image: e.target.value }))} className="border rounded-lg px-4 py-2" />
              <button type="submit" className="bg-gradient-to-r from-[#a259c6] to-[#4f1b59] text-white font-semibold rounded-lg px-6 py-3 mt-2" disabled={adding}>{adding ? 'Adding...' : 'Add Achievement'}</button>
            </form>
          </div>
        </div>
      )}
      {/* Confirmation Dialog for Delete */}
      <AlertDialog open={showDialog} onOpenChange={setShowDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Achievement?</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this achievement? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setShowDialog(false)}>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteConfirm}>Yes, Delete</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default Achievements; 