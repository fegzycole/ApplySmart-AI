import { useRouteError, isRouteErrorResponse, Link } from "react-router";

export function ErrorBoundary() {
  const error = useRouteError();

  if (isRouteErrorResponse(error)) {
    if (error.status === 404) {
      return (
        <div className="min-h-screen bg-gradient-to-br from-slate-950 via-violet-950/50 to-slate-950 flex items-center justify-center p-4">
          <div className="text-center">
            <h1 className="text-6xl font-bold text-white mb-4">404</h1>
            <p className="text-xl text-slate-300 mb-8">Page not found</p>
            <Link 
              to="/" 
              className="px-6 py-3 bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white rounded-lg hover:from-violet-600 hover:to-fuchsia-600 transition-all"
            >
              Go back home
            </Link>
          </div>
        </div>
      );
    }

    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-violet-950/50 to-slate-950 flex items-center justify-center p-4">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white mb-4">{error.status}</h1>
          <p className="text-xl text-slate-300 mb-8">{error.statusText}</p>
          <Link 
            to="/" 
            className="px-6 py-3 bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white rounded-lg hover:from-violet-600 hover:to-fuchsia-600 transition-all"
          >
            Go back home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-violet-950/50 to-slate-950 flex items-center justify-center p-4">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-white mb-4">Oops!</h1>
        <p className="text-xl text-slate-300 mb-8">Something went wrong</p>
        <Link 
          to="/" 
          className="px-6 py-3 bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white rounded-lg hover:from-violet-600 hover:to-fuchsia-600 transition-all"
        >
          Go back home
        </Link>
      </div>
    </div>
  );
}
