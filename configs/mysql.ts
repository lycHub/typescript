const isDev = process.env.NODE_ENV === 'development';
const devConf = {
  host: 'localhost',
  user: 'root',
  password: '123456',
  database: 'ts'
};
const prodConf = {
  host : 'xxx.xxx',
  user : 'root',
  password: '123456',
  database: 'ts'
};

module.exports = isDev ? devConf : prodConf;