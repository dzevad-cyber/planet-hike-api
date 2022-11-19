import mongoose from 'mongoose';

const connect = async (
  connectionString: string = '',
  password: string = '',
  user: string = ''
) => {
  try {
    let url = '';
    if (!password || !user) url = connectionString;
    if (password && user) {
      url = connectionString
        .replace('<password>', password)
        .replace('<user>', user);
    }

    await mongoose.connect(url);
    console.log('Successfully connected to database');
  } catch (err: any) {
    console.log(err);
  }
};

const db = {
  connect,
};

export default db;
