export const Error404 = () => {
  return (
    <>
      <div className="grid min-h-full place-items-center px-6 py-24 sm:py-32 lg:px-8">
        <div className="text-center">
          <p className="text-base font-semibold text-orange-400">404</p>
          <h1 className="mt-4 text-3xl font-bold tracking-tight text-white sm:text-5xl">
            Pagina no encontrada
          </h1>
          <p className="mt-6 text-base leading-7 text-gray-300">
            Lo siento, la pagina que estas buscando no existe!
          </p>
        </div>
      </div>
    </>
  );
};
