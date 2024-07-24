import getCurrentUser from '@/actions/getCurrentUser';
import getNutritionists from '@/actions/getNutritionists';
import Container from '../components/Container';
import NutritionistsClient from './NutritionistsClient';

const NutritionistsPage = async () => {
  const currentUser = await getCurrentUser();
  const nutritionists = await getNutritionists();

  return (
    <div className="pt-8">
      <Container>
        <NutritionistsClient currentUser={currentUser} nutritionists={nutritionists} />
      </Container>
    </div>
  );
};

export default NutritionistsPage;
