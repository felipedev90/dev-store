export default function Newsletter() {
  return (
    <section className="bg-blue-950 py-12">
      <div className="container w-full m-auto px-4 flex flex-col items-center md:flex-row md:justify-between">
        <div className="text-center flex-1 mb-8 md:mb-0">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-300 mb-4">
            Inscreva-se na nossa Newsletter
          </h2>
          <p className="mb-1 md:mb-6 text-gray-400">
            Assine para receber as últimas novidades e ofertas exclusivas.
          </p>
        </div>

        <form className="container  flex-1  m-auto px-4">
          <div className="flex flex-col md:flex-row items-center">
            <input
              type="text"
              placeholder="Digite seu nome"
              className="w-full md:w-auto px-4 py-2 mb-4 md:mb-0 md:mr-4 rounded border border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-500"
              required
            />
            <input
              type="email"
              placeholder="Digite seu email"
              className="w-full md:w-auto px-4 py-2 mb-4 md:mb-0 md:mr-4 rounded border border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-500"
              required
            />
            <button
              type="submit"
              className="px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors duration-300"
            >
              Inscrever-se
            </button>
          </div>

          <div className="mt-4 flex items-center md:justify-start">
            <input type="checkbox" id="privacy" className="mr-2" required />
            <label htmlFor="privacy" className="text-sm text-gray-300">
              Eu concordo com a{" "}
              <a href="#" className="text-blue-500 hover:underline">
                Política de Privacidade
              </a>
              .
            </label>
          </div>
        </form>
      </div>
    </section>
  );
}
