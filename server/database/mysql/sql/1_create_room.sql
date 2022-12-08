CREATE TABLE `rooms` (
  `id`              varchar(255) COLLATE utf8mb4_bin NOT NULL,
  `name`            varchar(255) COLLATE utf8mb4_bin NOT NULL,
  `max_member`      int          COLLATE utf8mb4_bin NOT NULL,
  `member_count`    int          COLLATE utf8mb4_bin NOT NULL,
  PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;
