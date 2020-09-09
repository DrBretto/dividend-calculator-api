TRUNCATE TABLE users, strategy, stock ;

INSERT INTO users (id, user_name, full_name, password, nickname, date_created)
VALUES
  (26,'drbretto','Brett Westerlund','$2a$12$lbG0Y4lpgmrT83oDg4HELuVAA7FNdwyMUUqXVjcvI/jW942lvKR/m',NULL,'2020-09-04 16:44:43'),
  (27,'drbretto2','Test Full Name','$2a$12$bRUxowdxGefsLvVZZEa9Gugf7srbIePKAmPEJL6mdjAJ/OJuzdz0.','Test Nickname','2020-09-04 19:02:53');


INSERT INTO strategy (id, title, date_published, author_id)
VALUES 
  (1, 'strategy numero uno', '2016-01-16 12:00:00', '$2a$12$lbG0Y4lpgmrT83oDg4HELuVAA7FNdwyMUUqXVjcvI/jW942lvKR/m'),
  (2, 'Second Attempt at a strategy', '2016-01-16 12:00:00', '$2a$12$bRUxowdxGefsLvVZZEa9Gugf7srbIePKAmPEJL6mdjAJ/OJuzdz0.'),
  (3, 'third times a charm', '2016-01-16 12:00:00', '$2a$12$lbG0Y4lpgmrT83oDg4HELuVAA7FNdwyMUUqXVjcvI/jW942lvKR/m');

INSERT INTO stock ( id, ticker, industry, shares, price, eps1, eps5, yield, author_id, strategy_id, date_published)
VALUES
  (1, 'MSFT', 'Technology', 40, 280.51, 1.15, 0.06, 5.18, '$2a$12$lbG0Y4lpgmrT83oDg4HELuVAA7FNdwyMUUqXVjcvI/jW942lvKR/m', 1, '2016-01-16 12:00:00'),
  (2, 'TRQ', 'Materials', 1000, 4.54, 5.76, 0.15, 0.90, '$2a$12$lbG0Y4lpgmrT83oDg4HELuVAA7FNdwyMUUqXVjcvI/jW942lvKR/m', 1, '2016-01-16 12:00:00'),
  (3, 'TSLA', 'Automotive', 20, 480.94, 8.82, 0.02, 3.61, '$2a$12$lbG0Y4lpgmrT83oDg4HELuVAA7FNdwyMUUqXVjcvI/jW942lvKR/m', 3, '2016-01-16 12:00:00'), 
  (4, 'APL', 'Fruit', 20, 500, 2.13, 0.03, 3.31, '$2a$12$lbG0Y4lpgmrT83oDg4HELuVAA7FNdwyMUUqXVjcvI/jW942lvKR/m', 3, '2016-01-16 12:00:00'),  
  (5, 'BUTT', 'Technology', 10, 60.90, 2.28, 0.05, 1.76, '$2a$12$bRUxowdxGefsLvVZZEa9Gugf7srbIePKAmPEJL6mdjAJ/OJuzdz0.', 2, '2016-01-16 12:00:00'), 
  (6, 'STUFF', 'Materials', 35, 90.60, 1.64, -0.05, 6.98, '$2a$12$bRUxowdxGefsLvVZZEa9Gugf7srbIePKAmPEJL6mdjAJ/OJuzdz0.', 2, '2016-01-16 12:00:00'), 
  (7, 'STONK', 'Technology', 37, 3.14, -4.71, -0.01, 3.02, '$2a$12$bRUxowdxGefsLvVZZEa9Gugf7srbIePKAmPEJL6mdjAJ/OJuzdz0.', 2, '2016-01-16 12:00:00');

