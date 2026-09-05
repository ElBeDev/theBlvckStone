import { db } from "@/db";
import { siteSettings } from "@/db/schema";
import { saveSettings } from "./actions";
import { SETTINGS_KEYS } from "./keys";

export default async function AdminSettingsPage() {
  if (!db) {
    return (
      <p className="text-stone">
        Base de datos no configurada. Define <code>DATABASE_URL</code> para
        activar esta sección.
      </p>
    );
  }

  const rows = await db.select().from(siteSettings);
  const values = Object.fromEntries(rows.map((row) => [row.key, row.value]));

  return (
    <div>
      <h1 className="text-2xl font-black text-petrol">Configuración</h1>
      <form action={saveSettings} className="mt-6 max-w-xl space-y-5">
        {SETTINGS_KEYS.map(({ key, label }) => (
          <div key={key}>
            <label htmlFor={key} className="block text-sm font-bold">
              {label}
            </label>
            <input
              id={key}
              name={key}
              type="text"
              defaultValue={values[key] ?? ""}
              className="mt-1 w-full rounded-lg border border-stone/30 px-4 py-2 focus:border-turquoise focus:outline-none"
            />
          </div>
        ))}
        <button
          type="submit"
          className="rounded-full bg-amber px-6 py-3 font-bold text-petrol hover:opacity-90"
        >
          Guardar cambios
        </button>
      </form>
    </div>
  );
}
