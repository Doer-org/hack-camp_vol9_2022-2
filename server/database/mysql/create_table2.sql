-- DB切り替え
\c "hoge"

--テーブルを作成

CREATE TABLE "question" (
  "Code"       SERIAL NOT NULL PRIMARY KEY,
  "Tips"       SERIAL NOT NULL PRIMARY KEY,
  "Language"   VARCHAR(255) NOT NULL,
);