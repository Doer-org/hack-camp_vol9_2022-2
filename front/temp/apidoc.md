# 練習問題取得用API

``` 
$ GET /questions 
```

#### JsonValue 
- n(問題数) **必須** 

<br>

(例)reponse
```
{
    "data": [
        {
            "code": "2 |> fun x -> x * 2",
            "tips": "2*2=4",
            "language": "F#",
        },
    ]
}
```

<br><br>

# room作成用API

```
$ POST /room/new
```

#### JsonValue

- room_name(ルーム名) **必須**
- max_count(部屋の最大人数) **必須**

<br>

(例)reponse
```
{
    "data": {
        "room_id": "649e9506c8b069296e6f",
        "room_name": "doer",
        "max_count": 3,
        "status": "created",
    }
}
```

<br><br>

# 新規メンバー追加

```
$ POST /member/new?room=roomID
```


#### JsonValue

- user_name(メンバー名) **必須**


#### QueryParam

- room_id **必須**

<br>

(例)
```
$ POST http://localhost:8080/member/new?room=0302f979e03b23eea
```

```
{
    "data": {
        "user_id": 8,
        "room_name": "doer", 
        "room_id": "0302f979e03b23eea"
    }
}
```

<br><br>


# WebSocket API (待機)
<!--  
## 参加(Client)
```
{   
    "type" : "client_join"
    "data": { 
        "user_name": "aoki",
        "user_id" : 3
    } 
}
```

<br>  -->


## メンバー追加通知(Server)
```
{   
    "type" : "server_join"
    "data": [
        { "user_name": "kai", "user_id" : 1 },
        { "user_name": "kota", "user_id" : 2 },
        { "user_name": "aoki", "user_id" : 3 },
    ]         
}
```

<br><br>



# WebSocket API (ゲーム)

## 進捗(Client)
```
{   
    "type" : "client_key_input"
    "data": { 
        "user_id" : "1"
        "Q_n": "2"
        "Q_n_i" : "17"
        "typo" : "false"
    } 
}
```

<br> 

## アクション(Client)
```
{   
    "type" : "client_action"
    "data": { 
        "user_id" : "1"
        "attack": "CapsLock" 
        // "attack_to": "2" // じかんなさそ 
    } 
}
```

<br> 

## 終了(Client)
```
{   
    "type" : "client_finish"
    "data": { 
        "user_id" : "1"
    } 
}
```

<br> 

## ランキング更新(Server)
```
{   
    "type" : "server_current_ranking"
    "data": { 
        "ranking" : [            
            { "user_name": "kai", "user_id": 1,   "rank": 1},
            { "user_name": "kota", "user_id": 2 , "rank": 2},
            { "user_name": "aoki", "user_id": 3 , "rank": 3},
        ]
    } 
}
```

<br> 

## ユーザーの進捗状況(Server)
```
{   
    "type" : "server_user_progress"
    "data": { 
        "ranking" : [            
            { "user_name": "kai", "user_id": 1,  "進捗とかいろいろ"},
            {...}
        ]
    } 
}
```

<br> 

## ゲーム終了(Server)
```
{   
    "type" : "server_finish"
    "data": { 
        // ランキングとか，結果画面に表示する情報
    } 
}
```

<br> 