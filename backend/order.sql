CREATE TABLE IF NOT EXISTS orders (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nama VARCHAR(100) NOT NULL,
  menu VARCHAR(100) NOT NULL,
  jumlah INT NOT NULL
); 