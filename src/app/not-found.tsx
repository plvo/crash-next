export default function Page() {
  return (
    <main className=" justify-center h-full">
      <div>
        <h1>404 - Page not found</h1>
        <p>
          Sorry, the page you are looking for does not exist. You can always go back to the{' '}
          <a href="/" className="underline-offset-4 hover:underline text-primary">
            homepage
          </a>
          .
        </p>
      </div>
    </main>
  );
}
