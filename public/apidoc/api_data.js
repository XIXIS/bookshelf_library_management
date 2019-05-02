define({ "api": [
  {
    "type": "post",
    "url": "/api/auth/login",
    "title": "Login",
    "group": "Auth",
    "version": "1.0.0",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>Email of user.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>Password of user.</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n \"success\": true,\n \"user\": {\n     \"_id\": \"78987809897898\",\n     \"firstName\": \"Finn\",\n     \"lastName\": \"Bale\",\n     ...\n  },\n \"token\": \"a long token\",\n \"message\": \"Success message\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 422 Unprocessable Entity\n{\n  \"success\": false,\n  \"message\": \"fail description\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "app/controllers/auth.js",
    "groupTitle": "Auth",
    "name": "PostApiAuthLogin"
  },
  {
    "type": "get",
    "url": "/api/books",
    "title": "List books",
    "description": "<p>List all books</p>",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "x-access-token",
            "description": "<p>Access token of authorized user</p>"
          }
        ]
      }
    },
    "group": "Books",
    "version": "1.0.0",
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n \"success\": true,\n \"message\": \"success message.\",\n \"books\" : [{ _id: 'adfmakln38709ojimkd0', title: 'title', ... },..]\n}",
          "type": "json"
        }
      ]
    },
    "filename": "app/controllers/books.js",
    "groupTitle": "Books",
    "name": "GetApiBooks"
  },
  {
    "type": "get",
    "url": "/api/books",
    "title": "List books",
    "description": "<p>List all books</p>",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "x-access-token",
            "description": "<p>Access token of authorized user</p>"
          }
        ]
      }
    },
    "group": "Books",
    "version": "1.0.0",
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n \"success\": true,\n \"message\": \"success message.\",\n \"books\" : [{ _id: 'adfmakln38709ojimkd0', title: 'title', ... },..]\n}",
          "type": "json"
        }
      ]
    },
    "filename": "app/controllers/books.js",
    "groupTitle": "Books",
    "name": "GetApiBooks"
  },
  {
    "type": "get",
    "url": "/api/books",
    "title": "List books",
    "description": "<p>List all books</p>",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "x-access-token",
            "description": "<p>Access token of authorized user</p>"
          }
        ]
      }
    },
    "group": "Books",
    "version": "1.0.0",
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n \"success\": true,\n \"message\": \"success message.\",\n \"books\" : [{ _id: 'adfmakln38709ojimkd0', title: 'title', ... },..]\n}",
          "type": "json"
        }
      ]
    },
    "filename": "app/controllers/books.js",
    "groupTitle": "Books",
    "name": "GetApiBooks"
  },
  {
    "type": "post",
    "url": "/api/books",
    "title": "Add book",
    "description": "<p>Create book</p>",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "x-access-token",
            "description": "<p>Access token of authorized user</p>"
          }
        ]
      }
    },
    "group": "Books",
    "version": "1.0.0",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "title",
            "description": "<p>title of book</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "author",
            "description": "<p>author book</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "genre",
            "description": "<p>genre of book</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "summary",
            "description": "<p>book summary</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n \"success\": true,\n \"message\": \"success message.\",\n \"book\" : { _id: 'adfmakln38709ojimkd0', title: 'title', ... }\n}",
          "type": "json"
        }
      ]
    },
    "filename": "app/controllers/books.js",
    "groupTitle": "Books",
    "name": "PostApiBooks"
  },
  {
    "type": "post",
    "url": "/api/users",
    "title": "Register user",
    "description": "<p>Create user</p>",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "x-access-token",
            "description": "<p>Access token of authorized user</p>"
          }
        ]
      }
    },
    "group": "Users",
    "version": "1.0.0",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "firstName",
            "description": "<p>first name of user</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "lastName",
            "description": "<p>last name of user</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>email of user</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>password of user</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n \"success\": true,\n \"message\": \"success message.\",\n \"user\" : { _id: 'adfmakln38709ojimkd0', firstName: 'first name', ... }\n}",
          "type": "json"
        }
      ]
    },
    "filename": "app/controllers/users.js",
    "groupTitle": "Users",
    "name": "PostApiUsers"
  }
] });
