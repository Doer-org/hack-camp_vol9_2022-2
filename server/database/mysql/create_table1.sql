-- DB切り替え
\c "hoge"

--テーブルを作成

CREATE TABLE "rooms" (
  "Id"         SERIAL NOT NULL PRIMARY KEY,
  "Name"       VARCHAR(255) NOT NULL,
);
