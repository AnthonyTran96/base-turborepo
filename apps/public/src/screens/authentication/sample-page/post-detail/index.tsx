import { refreshPosts, refreshPostWithId } from '@/data/post/server';
import { Post } from '@/model/post';
import BackPage from '@repo/ui/backpage';
import ButtonBase from '@repo/ui/button';
import { TextBase } from '@repo/ui/text';

interface Props {
  data: Post;
}
const PostDetailPage = (props: Props) => {
  const { data } = props;
  return (
    <div>
      <BackPage />
      <ButtonBase
        type="primary"
        text={`Refresh post with Id ${data.id}`}
        className="mt-12"
        onClick={async () => {
          'use server';
          refreshPostWithId(data.id);
          refreshPosts();
        }}
      />
      <div className="flex flex-col gap-8 p-12">
        <TextBase preset="title3" text={data.title} />
        <TextBase preset="title4" text={'user: ' + data.userId} />
        <TextBase preset="body1" text={data.body} />
      </div>
    </div>
  );
};

export default PostDetailPage;
