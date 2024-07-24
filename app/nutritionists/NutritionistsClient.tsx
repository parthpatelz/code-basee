"use client";

import { useState } from 'react';
import styles from './Nutritionists.module.css';
import { useRouter } from 'next/navigation'; // Import useRouter for navigation

interface Nutritionist {
  id: string;
  name: string;
  specialization: string;
  experience: string;
}

interface NutritionistsClientProps {
  currentUser: any; // Replace `any` with the appropriate type for your user
  nutritionists: Nutritionist[];
}

const NutritionistsClient: React.FC<NutritionistsClientProps> = ({ currentUser, nutritionists }) => {
  const [view, setView] = useState<'list' | 'card'>('list');
  const router = useRouter(); // Initialize useRouter

  const handleBookAppointment = () => {
    router.push('/book-appointment'); // Redirect to the booking form
  };

  return (
    <div>
      <div className={styles.viewToggle}>
        <button onClick={() => setView('list')}>List View</button>
        <button onClick={() => setView('card')}>Card View</button>
      </div>
      <button onClick={handleBookAppointment} className={styles.bookButton}>Book an Appointment</button>
      <br></br>
      <br></br>
      <div className={view === 'list' ? styles.listView : styles.cardView}>
        {nutritionists.map((nutritionist) => (
          <div key={nutritionist.id} className={styles.nutritionistItem}>
            <h2>{nutritionist.name}</h2>
            <p>Specialization: {nutritionist.specialization}</p>
            <p>Experience: {nutritionist.experience}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NutritionistsClient;
