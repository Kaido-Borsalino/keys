
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../hooks/useUser';

export default function Signup() {
  const { save } = useUser();
  const nav = useNavigate();
  const [form, setForm] = useState({
    email: '', password: '', firstName: '', lastName: '',
    phone: '', address: '', city: '', zip: '', country: ''
  });

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Basic required fields check
    if (!form.email || !form.password || !form.firstName || !form.lastName) return;
    save(form as any);
    nav('/?welcome=1');
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-12 max-w-2xl">
        <h1 className="text-3xl font-bold mb-6">Créer un compte</h1>
        <form className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-gray-50 p-6 rounded-xl dark:bg-neutral-900" onSubmit={onSubmit}>
          <label className="text-sm">Prénom *<input name="firstName" placeholder="Prénom *" className="p-3 rounded w-full" onChange={onChange} required /></label>
          <label className="text-sm">Nom *<input name="lastName" placeholder="Nom *" className="p-3 rounded w-full" onChange={onChange} required /></label>
          <label className="text-sm md:col-span-2">Email *<input name="email" type="email" placeholder="Email *" className="p-3 rounded w-full" onChange={onChange} required /></label>
          <label className="text-sm md:col-span-2">Mot de passe *<input name="password" type="password" placeholder="Mot de passe *" className="p-3 rounded w-full" onChange={onChange} required /></label>
          <label className="text-sm md:col-span-2">Téléphone<input name="phone" placeholder="Téléphone" className="p-3 rounded w-full" onChange={onChange} /></label>
          <label className="text-sm md:col-span-2">Adresse<input name="address" placeholder="Adresse" className="p-3 rounded w-full" onChange={onChange} /></label>
          <label className="text-sm">Ville<input name="city" placeholder="Ville" className="p-3 rounded w-full" onChange={onChange} /></label>
          <label className="text-sm">Code postal<input name="zip" placeholder="Code postal" className="p-3 rounded w-full" onChange={onChange} /></label>
          <label className="text-sm md:col-span-2">Pays<input name="country" placeholder="Pays" className="p-3 rounded w-full" onChange={onChange} /></label>
          <button className="bg-blue-900 text-white py-3 rounded-lg hover:bg-blue-800 md:col-span-2">Créer mon compte</button>
        </form>
      </div>
    </div>
  );
}
