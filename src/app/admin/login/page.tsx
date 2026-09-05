import { login } from "./actions";

export default async function AdminLoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const { error } = await searchParams;

  return (
    <div className="flex min-h-screen items-center justify-center px-6">
      <form
        action={login}
        className="w-full max-w-sm rounded-2xl bg-white p-8 shadow-sm"
      >
        <h1 className="text-xl font-black text-petrol">
          The Blvck Stone Admin
        </h1>
        <div className="mt-6 space-y-4">
          <div>
            <label htmlFor="username" className="block text-sm font-bold">
              Usuario
            </label>
            <input
              id="username"
              name="username"
              type="text"
              required
              className="mt-1 w-full rounded-lg border border-stone/30 px-4 py-2 focus:border-turquoise focus:outline-none"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-bold">
              Contraseña
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              className="mt-1 w-full rounded-lg border border-stone/30 px-4 py-2 focus:border-turquoise focus:outline-none"
            />
          </div>
        </div>

        {error && (
          <p className="mt-4 text-sm text-coral">
            Usuario o contraseña incorrectos.
          </p>
        )}

        <button
          type="submit"
          className="mt-6 w-full rounded-full bg-amber px-6 py-3 font-bold text-petrol hover:opacity-90"
        >
          Entrar
        </button>
      </form>
    </div>
  );
}
