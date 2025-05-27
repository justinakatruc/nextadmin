import { redirect } from 'next/navigation';

const Homepage = () => {
  redirect('/login');
  return null; // This component will never render because of the redirect
}

export default Homepage