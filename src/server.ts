import app from './app.js';
import db from './db/db.js';

db.connect(process.env.DB_URL, process.env.DB_PASS, process.env.DB_USER);

const PORT = process.env.PORT ?? 5000;
app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
