CREATE TABLE `rooms` (
  `room_id`              varchar(255) COLLATE utf8mb4_bin NOT NULL,
  `room_name`            varchar(255) COLLATE utf8mb4_bin NOT NULL,
  `max_count`      int          COLLATE utf8mb4_bin NOT NULL,
  PRIMARY KEY (room_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;