import express from 'express';
import fs from 'fs';

export default async function(
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) {
  res.writeHead(200, { 'Content-Type': 'text/html' });
  const html = fs.readFileSync(
    `C:/Users/Visiteur/Documents/Lifee/tests/Templates/index.html`,
  );
  return res.end(html);
}
