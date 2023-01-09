# Time Punch API

此專案提供 API 給[前台](https://steven4program.github.io/time-punch-vue)使用

# 功能
員工
- 員工可以登入及修改密碼
- 輸入密碼錯誤5次，帳號即會被鎖住
- 員工登入後可以打卡
- 打卡可使用一般按鈕進行打卡 --QRcode掃碼尚未實作

管理者
- 管理者有專用帳戶登入
- 只有管理者可以生成QRcode供員工打卡 --功能尚未實作


# 種子資料

```

  Admin: {
    id: 1,
    name: 'tiadmin',
    email: 'tiadmin@example.com',
    password: 'tiadmin',
  },
  Staff: {
    id: 2,
    name: 'titaner',
    email: 'titaner@example.com',
    password: 'titaner',
  }
  
```

# 建立專案

1. 使用 Terminal，Clone 專案到本地

```
https://github.com/steven4program/time_punch.git
```

2. 進入存放此專案的資料夾

```
cd time_punch
```

3. 安裝相關套件

```
npm install
```

4. 將.env.example 改為.env，並改為自己的設定

```
JWT_SECRET=SKIIP
PORT=3000

```

5. 修改 MySQL 相關資訊
   修改 ./config/config.json，裡面 development、test 的 password
   如要更改 database 的命名請於下一步一起更改

```
  "development": {
    "username": "root",
    "password": "<your_mysql_workbench_password>",
    "database": "time_punch",
    "host": "127.0.0.1",
    "dialect": "mysql"
  }
  
```

6. 建立 MySQL 資料庫
   打開 MySQL Workbench，並在登入且新增 SQL file 後，輸入

```
drop database if exists time_punch;
create database time_punch;
```

7. 建立資料庫及種子資料

```
npx sequelize db:migrate
npx sequelize db:seed:all
```

8. 啟動伺服器

```
npm run dev
```

9. 在終端機看到以下字串代表伺服器建立成功：

```
App is running on http://localhost:3000
```


## 開發前置需求

- [Visual Studio Code](https://code.visualstudio.com/)
- [Node.js](https://nodejs.org/en/)
- [Express](https://www.npmjs.com/package/express)
- [nodemon](https://www.npmjs.com/package/nodemon)
- [MySQL](https://www.mysql.com/)
- [MySQL Workbench](https://dev.mysql.com/downloads/mysql/)

## 開發人員

[steven4program](https://github.com/steven4program)
