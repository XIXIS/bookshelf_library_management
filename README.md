# bookshelf_library_management
An app that performs CRUD operations on a bookshelf/library.

## Screenshot
![Image](https://github.com/XIXIS/bookshelf_library_management/blob/master/public/images/Screenshot.png)

## 1. Clone Repository
```bash 
git clone https://github.com/XIXIS/bookshelf_library_management.git
```

## 2. Install Nodejs packages
This will install all node packages for the project
```bash
npm install
```

## 3. Set up .env
Copy and rename **.env.example** to **.env**. Pass in the appropriate values.
```.env
DB_HOST=
DB_USER=
DB_PASSWORD=
DB_NAME=
DB_PORT=
SERVER_PORT=
JWT_SECRET=
```

## 4. Start API
```bash
npm start 
```
Visit http://localhost:[SERVER_PORT]


Visit http://localhost:[SERVER_PORT]/apidoc for the apidoc

Run tests
```bash
npm run test 
```