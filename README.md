## Version Details
- NodeJs - v20.12.2
- nvm - v0.39.7
- React - v18.3.1

## To run the application 
Note: To run this application you have to run the [Backend application](https://github.com/siddhesh494/bank-details-server) first and then run [Frontend application](https://github.com/siddhesh494/bank-details-web).

Befor running both the application use `npm install` or `yarn install` to install the dependent packages.

### To run the Backend application use command
```
npm start
```
Along with that past below variable in `.env` file
```
PORT=4000
mongoUser=siddheshss26
mongoPassword=TUS5gDAzMrEALxpe
mongoDatabase=bank-details
mongoPort="27017"
```

### To run the Frontend application
```
npm start
```

### I have use firebase for authentication

## API cURL
- To get active customer
  ```
  curl --location 'localhost:4000/api/v1/bank/getConsumer' \
  --header 'Content-Type: application/json' \
  --data '{}'
  ```

- To get transaction buy account id
  ```
  curl --location 'localhost:4000/api/v1/bank/getTransactions' \
  --header 'Content-Type: application/json' \
  --data '{
      "accountID": 443178
  }'
  ```

### To list down a distinct list of products available in your MongoDB collection, you can use the distinct method.
  ```
  db.accounts.distinct("products")
  ```

### Create a Mongo query to list down account IDs which has made at least one transaction below the amount of 5000
  ```
  db.transactions.distinct("account_id", { "transactions.amount": { $lt: 5000 } })
  ```
