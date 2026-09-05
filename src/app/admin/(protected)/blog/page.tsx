import Link from "next/link";
import { db } from "@/db";
import { posts } from "@/db/schema";
import { deletePost } from "./actions";

export default async function AdminBlogPage() {
  if (!db) {
    return (
      <p className="text-carbon/75">
        Base de datos no configurada. Define <code>DATABASE_URL</code> para
        activar esta sección.
      </p>
    );
  }

  const items = await db.select().from(posts);

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-black text-petrol">Blog</h1>
        <Link
          href="/admin/blog/nuevo"
          className="rounded-full bg-amber px-4 py-2 text-sm font-bold text-petrol hover:opacity-90"
        >
          Nuevo post
        </Link>
      </div>

      <div className="mt-6 space-y-3">
        {items.length === 0 && (
          <p className="text-carbon/75">Todavía no hay posts publicados.</p>
        )}
        {items.map((post) => (
          <div
            key={post.id}
            className="flex items-center justify-between rounded-xl bg-white p-4 shadow-sm"
          >
            <div>
              <p className="font-bold text-carbon">
                {post.title}{" "}
                <span className="text-xs font-normal text-carbon/75">
                  /{post.locale}
                </span>
              </p>
              <p className="text-sm text-carbon/75">{post.slug}</p>
            </div>
            <div className="flex items-center gap-4 text-sm font-bold">
              <Link href={`/admin/blog/${post.id}`} className="text-turquoise">
                Editar
              </Link>
              <form action={deletePost.bind(null, post.id)}>
                <button type="submit" className="text-coral">
                  Eliminar
                </button>
              </form>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
