CREATE TABLE `members` (
  `id`          int          COLLATE utf8mb4_bin NOT NULL AUTO_INCREMENT,
  `name`        varchar(255) COLLATE utf8mb4_bin NOT NULL,
  `room_id`     varchar(255) COLLATE utf8mb4_bin NOT NULL,
  FOREIGN KEY (room_id) REFERENCES rooms(id) ON DELETE CASCADE,
  PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;
