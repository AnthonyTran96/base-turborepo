import SamplePagePage from '@/screens/authentication/sample-page';
import content from '@/utils/content';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: content.sample_screen.title,
  description: content.sample_screen.description
};

const SamplePage = () => {
  return <SamplePagePage />;
};

export default SamplePage;
