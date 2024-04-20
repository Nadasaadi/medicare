import React, { useState } from 'react';


function AdminForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Ici, vous pouvez ajouter la logique de traitement des données
    console.log('Email:', email);
    console.log('Password:', password);
    // Réinitialiser les champs après la soumission
    setEmail('');
    setPassword('');
  };

  return (
    <section className="admin-formulair">
    <h1> Admin signup</h1>
    <p >Ce formulaire est réservé aux administrateurs du site uniquement!</p>
    <form className="admin-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="email">Email :</label>
        <input className='adminforminput'
          type="email"
          id="email"
          value={email}
          onChange={handleEmailChange}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="password">Mot de passe :</label>
        <input className='adminforminput'
          type="password"
          id="password"
          value={password}
          onChange={handlePasswordChange}
          required
        />
      </div>
      <button className='bouton_admin' type="submit">Soumettre</button>
    </form>
    </section>
  );
}

export default AdminForm;
