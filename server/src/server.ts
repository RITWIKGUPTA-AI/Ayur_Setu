import express from 'express';
import cors from 'cors';
import path from 'path';
import fs from 'fs';
import dotenv from 'dotenv';
import apiRouter from './routes/index.js';

dotenv.config();

// NOTE: this file is compiled to CommonJS (see server/tsconfig.json), where
// __filename/__dirname are provided natively by Node — no ESM import.meta
// polyfill needed. (Using `import.meta.url` here previously caused the
// compiled output to contain invalid syntax for a CommonJS module, which
// crashed the server immediately on deploy.)

const app = express();
const PORT = process.env.PORT || 5001;

// Middleware
app.use(cors({
  origin: true, // Allow frontend dev server and external hosted domains
  credentials: true
}));
app.use(express.json());

// API Routes
app.use('/api', apiRouter);

// In production, serve the built Vite frontend
const clientDistPath = path.resolve(__dirname, '../../dist');
if (fs.existsSync(clientDistPath)) {
  console.log(`Serving static client files from ${clientDistPath}`);
  app.use(express.static(clientDistPath));

  // SPA fallback for HTML5 History routing
  app.get('*', (req, res, next) => {
    if (req.path.startsWith('/api')) {
      return next();
    }
    res.sendFile(path.join(clientDistPath, 'index.html'));
  });
}

// Error handling middleware
app.use((err: any, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
  console.error('Unhandled server error:', err);
  res.status(500).json({
    error: 'Internal Server Error',
    message: err.message || 'An unexpected error occurred'
  });
});

app.listen(Number(PORT), '0.0.0.0', () => {
  console.log(`=========================================`);
  console.log(` AyurSetu Backend API Server running!`);
  console.log(` Port:    http://localhost:${PORT}`);
  console.log(` Health:  http://localhost:${PORT}/api/health`);
  console.log(` Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`=========================================`);
});

export default app;
