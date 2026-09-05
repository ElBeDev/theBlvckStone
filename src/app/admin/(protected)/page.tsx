import { db } from "@/db";
import { leads, products, posts, testimonials } from "@/db/schema";
import { count } from "drizzle-orm";

async function getCounts() {
  if (!db) return null;

  const [leadCount, productCount, postCount, testimonialCount] =
    await Promise.all([
      db.select({ value: count() }).from(leads),
      db.select({ value: count() }).from(products),
      db.select({ value: count() }).from(posts),
      db.select({ value: count() }).from(testimonials),
    ]);

  return {
    leads: leadCount[0]?.value ?? 0,
    products: productCount[0]?.value ?? 0,
    posts: postCount[0]?.value ?? 0,
    testimonials: testimonialCount[0]?.value ?? 0,
  };
}

export default async function AdminDashboardPage() {
  const counts = await getCounts();

  if (!counts) {
    return (
      <div className="rounded-2xl bg-amber/20 p-6 text-petrol">
        <p className="font-bold">Base de datos no configurada.</p>
        <p className="mt-1 text-sm">
          Define <code>DATABASE_URL</code> (Supabase por ahora) en las
          variables de entorno para activar el contenido del panel.
        </p>
      </div>
    );
  }

  const cards = [
    { label: "Leads", value: counts.leads },
    { label: "Productos", value: counts.products },
    { label: "Posts de blog", value: counts.posts },
    { label: "Testimonios", value: counts.testimonials },
  ];

  return (
    <div>
      <h1 className="text-2xl font-black text-petrol">Dashboard</h1>
      <div className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-4">
        {cards.map((card) => (
          <div key={card.label} className="rounded-2xl bg-white p-6 shadow-sm">
            <p className="text-3xl font-black text-turquoise">
              {card.value}
            </p>
            <p className="mt-1 text-sm text-stone">{card.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
