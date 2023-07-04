Application CRUD API on noodejs

## Preparing for cross-check

#### Clone repo

```
git clone https://github.com/istairina/nodejs-crud-api.git
```

#### Change folder

```
cd nodejs-crud-api
```

#### Install dependencies

```
npm install
```

#### Create .env file in root folder (you can choose any number)

```
PORT=3000
```

#### Start server

```
npm run server
```

---

## Opportunities

#### Get all users

```
method: get
address: 127.0.0.1:3500/api/users
```

#### Add one user

```
method: post
address: 127.0.0.1:3500/api/users
body: {
    "username": "test name",
    "age": 99,
    hobbies: ["chess"]
}
```

#### Get user

```
method: get
address: 127.0.0.1:3500/api/users/${userID}
```

#### Update user

```
method: put
address: 127.0.0.1:3500/api/users/${userID}
body: {
    "username": "test name2",
    "age": 100,
    hobbies: ["chess"]
}
```

#### Delete user

```
method: delete
address: 127.0.0.1:3500/api/users/${userID}
```
