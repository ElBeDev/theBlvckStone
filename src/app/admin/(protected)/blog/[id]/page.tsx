import { notFound } from "next/navigation";
import { eq } from "drizzle-orm";
import { db } from "@/db";
import { posts } from "@/db/schema";
import { PostForm } from "../PostForm";
import { updatePost } from "../actions";

export default async function EditPostPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  if (!db) {
    return (
      <p className="text-stone">
        Base de datos no configurada. Define <code>DATABASE_URL</code> para
        activar esta sección.
      </p>
    );
  }

  const [post] = await db
    .select()
    .from(posts)
    .where(eq(posts.id, Number(id)));

  if (!post) notFound();

  return (
    <div>
      <h1 className="text-2xl font-black text-petrol">Editar post</h1>
      <div className="mt-6">
        <PostForm
          action={updatePost.bind(null, post.id)}
          defaultValues={post}
          submitLabel="Guardar cambios"
        />
      </div>
    </div>
  );
}
