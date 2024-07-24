// app/book-appointment/page.tsx

import BookAppointmentClient from './BookAppointmentClient';
import getCurrentUser from '@/actions/getCurrentUser';
import getNutritionists from '@/actions/getNutritionists';

const BookAppointmentPage = async () => {
  const currentUser = await getCurrentUser();
  const nutritionists = await getNutritionists();

  if (!currentUser) {
    // Handle case where the user is not authenticated
    return <div>Please log in to book an appointment.</div>;
  }

  return (
    <BookAppointmentClient 
      nutritionists={nutritionists}
      userId={currentUser.id}  // Pass userId here
    />
  );
};

export default BookAppointmentPage;
