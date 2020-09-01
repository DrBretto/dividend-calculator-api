INSERT INTO strategy (id, title, stocks, date_published)
VALUES 
  (1, 'strategy numero uno', array [1,2,3,4,5], '2016-01-16 12:00:00'),
  (2, 'Second Attempt at a strategy', array [6,3,2,4], '2016-01-16 12:00:00'),
  (3, 'third times a charm', array [4,3,5,6,7], '2016-01-16 12:00:00' );




INSERT INTO stock ( id, ticker, industry, shares, price, EPS1, EPS5, yield, date_published)
VALUES
  (1, 'MSFT', 'Technology', 40, 280.51, 1.15, 0.06, 5.18, '2016-01-16 12:00:00'),
  (2, 'TRQ', 'Materials', 1000, 4.54, 5.76, 0.15, 0.90, '2016-01-16 12:00:00'),
  (3, 'TSLA', 'Automotive', 20, 480.94, 8.82, 0.02, 3.61, '2016-01-16 12:00:00'), 
  (4, 'APL', 'Fruit', 20, 500, 2.13, 0.03, 3.31, '2016-01-16 12:00:00'),  
  (5, 'BUTT', 'Technology', 10, 60.90, 2.28, 0.05, 1.76, '2016-01-16 12:00:00'), 
  (6, 'STUFF', 'Materials', 35, 90.60, 1.64, -0.05, 6.98, '2016-01-16 12:00:00'), 
  (7, 'STONK', 'Technology', 37, 3.14, -4.71, -0.01, 3.02, '2016-01-16 12:00:00');

