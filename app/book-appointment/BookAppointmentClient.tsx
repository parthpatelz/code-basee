// app/book-appointment/BookAppointmentClient.tsx

"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './BookAppointment.module.css';

interface Nutritionist {
  id: string;
  name: string;
  specialization: string;
  experience: string;
}

interface BookAppointmentClientProps {
  nutritionists: Nutritionist[];
  userId: string;
}

const BookAppointmentClient = ({ nutritionists, userId }: BookAppointmentClientProps) => {
  const [form, setForm] = useState({
    date: '',
    nutritionistId: '',
    details: '',
  });
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await fetch('/api/bookings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...form, userId }),
      });
      alert('Booking submitted successfully!');
      router.push('/nutritionists');
    } catch (error) {
      console.error('Error booking appointment:', error);
    }
  };

  return (
    <div className={styles.container}>
      <h1 className="text-2xl font-bold mb-4">Book an Appointment</h1>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.formGroup}>
          <label htmlFor="date" className={styles.label}>Date:</label>
          <input
            id="date"
            type="date"
            value={form.date}
            onChange={(e) => setForm({ ...form, date: e.target.value })}
            className={styles.input}
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="nutritionist" className={styles.label}>Select Nutritionist:</label>
          <select
            id="nutritionist"
            value={form.nutritionistId}
            onChange={(e) => setForm({ ...form, nutritionistId: e.target.value })}
            className={styles.input}
          >
            <option value="">Select a nutritionist</option>
            {nutritionists.map((nutritionist) => (
              <option key={nutritionist.id} value={nutritionist.id}>
                {nutritionist.name}
              </option>
            ))}
          </select>
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="details" className={styles.label}>Details:</label>
          <textarea
            id="details"
            value={form.details}
            onChange={(e) => setForm({ ...form, details: e.target.value })}
            className={styles.input}
          />
        </div>
        <button type="submit" className={styles.button}>
          Submit
        </button>
      </form>
    </div>
  );
};

export default BookAppointmentClient;
