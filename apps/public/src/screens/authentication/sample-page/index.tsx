import { DebugUtils } from '@repo/utils/debug-utils';
import NameText from './components/NameText';
import PostList from './components/PostList';

const SamplePagePage = () => {
  DebugUtils.logS('test sample page server render');
  return (
    <section className="size-full p-16">
      <NameText />
      <PostList />
    </section>
  );
};
export default SamplePagePage;
