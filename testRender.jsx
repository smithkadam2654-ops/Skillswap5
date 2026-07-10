import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom/server';
import DashboardPage from './src/pages/DashboardPage.jsx';

try {
  const html = renderToString(
    <StaticRouter location="/dashboard">
      <DashboardPage />
    </StaticRouter>
  );
  console.log("RENDER SUCCESS!");
} catch (error) {
  console.error("RENDER ERROR:", error);
}
