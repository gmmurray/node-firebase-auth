import dotenv from 'dotenv';
import app from './app';

dotenv.config();

app.listen(app.get('port'), () =>
    console.log(`Listening on port ${app.get('port')}`),
);
