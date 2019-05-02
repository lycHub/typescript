module.exports = sql => {
  sql.query(
    'SELECT 1 + 1 AS solution', (err, res) => {
      console.log('res', res);
      sql.query(`CREATE TABLE \`image\` (
                \`id\` INT NOT NULL AUTO_INCREMENT,
                \`file_key\` VARCHAR(45) NOT NULL,
                \`file_name\` VARCHAR(45) NOT NULL,
                PRIMARY KEY (\`id\`))`)
    }
  )
}