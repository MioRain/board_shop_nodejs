# Welcome to Board_Shop_API_Server 👋

> 這是個人電商平台專案的 API 伺服器，單純用來處理資料庫的 CRUD 功能

## 專案開發環境
- ＭacBook Air M2 
- Visual Studio Code
- Node.js(v18.16.1) + Express(4.18.2)
- MySQL(8.0.31-arm64)

## 建立 MySQL 資料庫
請參照 config.json
```
create database forum
```

## 安裝套件

```sh
npm insatll
```

## 建立 Model & seeder

```sh
npx sequelize db:migrate
npx sequelize db:seed:all
```

## API 使用方法

| Action | Method | Route |
| --- | --- | --- |
| 送出註冊資料 | POST | /api/v1/signup |
| 送出登入資料 | POST | /api/v1/signin |
| 送出登出資料 | POST | /api/v1/logout |
| 取得所有商品資訊 | GET | /api/v1/products |
| 取得特定商品資訊 | GET | /api/v1/products/:id |
| 名稱篩選商品 | GET | /api/v1/products?filter[name]={name} |
| 種類篩選商品 | GET | /api/v1/products?filter[categoryId]={id} |
| 價格篩選商品 | GET | /api/v1/products?filter[minPrice]={number}&filter[maxPrice]={number} |
| 尺寸篩選商品 | GET | /api/v1/products?filter[minSize]={number}&filter[maxSize]={number} |
| 取得所有商品種類 | GET | /api/v1/categories |
| 送出訂單資料 | POST | /api/v1/buyer/orders |
| 取得特定賣家商品清單 | GET | /api/v1/seller/products |
| 上架商品 | POST | /api/v1/seller/products |
| 修改商品資訊 | PUT | /api/v1/seller/products/:id |
| 刪除商品 | DELETE | /api/v1/seller/products/:id |

## Author

👤 **MioRain**

* Github: [@MioRain](https://github.com/MioRain)

## Show your support

Give a ⭐️ if this project helped you!


***
_This README was generated with ❤️ by [readme-md-generator](https://github.com/kefranabg/readme-md-generator)_