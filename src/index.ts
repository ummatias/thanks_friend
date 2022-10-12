import express, { NextFunction } from 'express';
import morgan from 'morgan';
import './config/env';
import { auth } from './middlewares/auth';
import authUser from './routes/authUser';
import card from './routes/card';
import deck from './routes/deck';
import cardPublic from './routes/public/cardPublic';
import deckPublic from './routes/public/deckPublic';
import user from './routes/user';

const app = express();

app.use(morgan('dev'));
app.use(express.json());

app.use((req: express.Request, res: express.Response, next: NextFunction) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  );
  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
    return res.status(200).json({});
  }
  next();
});

app.get('/', (req: express.Request, res: express.Response) => {
  res.send("I'M ALIVE");
});

app.use(authUser);
app.use(deckPublic);
app.use(cardPublic);
app.use(auth);
app.use('/', deck);
app.use('/', card);
app.use('/', user);

app.use((req: express.Request, res: express.Response, next: NextFunction) => {
  const error = new Error('Page Not Found!');
  return res.status(404).json({
    message: error.message
  });
});

app.use(
  (
    err: Error,
    req: express.Request,
    res: express.Response,
    next: NextFunction
  ) => {
    console.log(err);
    return res.status(500).json({
      message: 'Something went wrong!'
    });
  }
);

const PORT: any = process.env.PORT ?? 8080;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
