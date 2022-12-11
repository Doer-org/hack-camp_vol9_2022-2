CREATE TABLE `members` (
  `user_id`          varchar(255) COLLATE utf8mb4_bin NOT NULL,
  `user_name`        varchar(255) COLLATE utf8mb4_bin NOT NULL,
  `room_id`     varchar(255) COLLATE utf8mb4_bin NOT NULL,
  FOREIGN KEY (room_id) REFERENCES rooms(room_id) ON DELETE CASCADE,
  PRIMARY KEY (user_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;