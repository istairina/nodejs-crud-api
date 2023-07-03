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

#### Start server

```
npm run server
```

---

## Opportinities

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
    username: 'test name',
    age: 99,
    hobbies: ['chess']
}
```
