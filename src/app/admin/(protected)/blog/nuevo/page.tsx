import { PostForm } from "../PostForm";
import { createPost } from "../actions";

export default function NewPostPage() {
  return (
    <div>
      <h1 className="text-2xl font-black text-petrol">Nuevo post</h1>
      <div className="mt-6">
        <PostForm action={createPost} submitLabel="Publicar post" />
      </div>
    </div>
  );
}
