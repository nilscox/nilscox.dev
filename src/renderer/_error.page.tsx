export { Page };

type PageProps = {
  is404: boolean;
  error?: string;
};

function Page({ is404, error }: PageProps) {
  if (is404) {
    return (
      <div className="my-8 mx-auto max-w-page">
        <h1>404 Page Not Found</h1>
        <p>{error ?? 'This page could not be found.'}</p>
      </div>
    );
  }

  return (
    <div className="my-8 mx-auto max-w-page">
      <h1>500 Internal Server Error</h1>
      <p>Something went wrong.</p>
    </div>
  );
}
