import { isRouteErrorResponse, useRouteError } from 'react-router-dom';
import React from 'react';

const ErrorPage = () => {
  const error = useRouteError();

  if (isRouteErrorResponse(error)) {
    return (
      <div>
        <h1>Oops! something is wrong</h1>
        <h2>{error.status}</h2>
        <p>{error.statusText}</p>
        {error.data?.message && <p>{error.data.message}</p>}
      </div>
    );
  } else {
    return <h1>Oops! something is wrong</h1>;
  }
};

export default ErrorPage;
