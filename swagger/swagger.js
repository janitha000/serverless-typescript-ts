// this file was generated by serverless-auto-swagger
            module.exports = {
  "swagger": "2.0",
  "info": {
    "title": "serverless-step",
    "version": "1"
  },
  "paths": {
    "/hello": {
      "get": {
        "summary": "hello",
        "description": "",
        "operationId": "hello.get.hello",
        "consumes": [
          "application/json"
        ],
        "produces": [
          "application/json"
        ],
        "parameters": [],
        "responses": {
          "200": {
            "description": "this went well",
            "schema": {
              "$ref": "#/definitions/Success"
            }
          },
          "400": {
            "description": "failed Post"
          },
          "502": {
            "description": "server error"
          }
        },
        "security": [
          {
            "Authorization": []
          }
        ]
      },
      "post": {
        "summary": "validatedHello",
        "description": "",
        "operationId": "validatedHello.post.hello",
        "consumes": [
          "application/json"
        ],
        "produces": [
          "application/json"
        ],
        "parameters": [],
        "responses": {
          "200": {
            "description": "200 response"
          }
        },
        "security": [
          {
            "Authorization": []
          }
        ]
      }
    },
    "/hello/mhello": {
      "get": {
        "summary": "helloM",
        "description": "",
        "operationId": "helloM.get.hello/mhello",
        "consumes": [
          "application/json"
        ],
        "produces": [
          "application/json"
        ],
        "parameters": [],
        "responses": {
          "200": {
            "description": "200 response"
          }
        },
        "security": [
          {
            "Authorization": []
          }
        ]
      }
    },
    "/stepFunction": {
      "post": {
        "summary": "createStepFunction",
        "description": "",
        "operationId": "createStepFunction.post.stepFunction",
        "consumes": [
          "application/json"
        ],
        "produces": [
          "application/json"
        ],
        "parameters": [],
        "responses": {
          "200": {
            "description": "200 response"
          }
        },
        "security": [
          {
            "Authorization": []
          }
        ]
      }
    },
    "/stepFunction/{id}": {
      "delete": {
        "summary": "deleteStepFunction",
        "description": "",
        "operationId": "deleteStepFunction.delete.stepFunction/{id}",
        "consumes": [
          "application/json"
        ],
        "produces": [
          "application/json"
        ],
        "parameters": [
          {
            "name": "id",
            "in": "path",
            "required": true,
            "type": "string"
          }
        ],
        "responses": {
          "200": {
            "description": "200 response"
          }
        },
        "security": [
          {
            "Authorization": []
          }
        ]
      }
    },
    "/stepFunction/start": {
      "get": {
        "summary": "startStepFunction",
        "description": "",
        "operationId": "startStepFunction.get.stepFunction/start",
        "consumes": [
          "application/json"
        ],
        "produces": [
          "application/json"
        ],
        "parameters": [],
        "responses": {
          "200": {
            "description": "200 response"
          }
        },
        "security": [
          {
            "Authorization": []
          }
        ]
      }
    },
    "/users": {
      "any": {
        "summary": "mongoUsers",
        "description": "",
        "operationId": "mongoUsers.any.users",
        "consumes": [
          "application/json"
        ],
        "produces": [
          "application/json"
        ],
        "parameters": [],
        "responses": {
          "200": {
            "description": "200 response"
          }
        },
        "security": [
          {
            "Authorization": []
          }
        ]
      }
    },
    "/user/filter": {
      "get": {
        "summary": "getUsersByFilter",
        "description": "",
        "operationId": "getUsersByFilter.get.user/filter",
        "consumes": [
          "application/json"
        ],
        "produces": [
          "application/json"
        ],
        "parameters": [],
        "responses": {
          "200": {
            "description": "200 response"
          }
        },
        "security": [
          {
            "Authorization": []
          }
        ]
      }
    },
    "/users/{id}": {
      "get": {
        "summary": "getUserById",
        "description": "",
        "operationId": "getUserById.get.users/{id}",
        "consumes": [
          "application/json"
        ],
        "produces": [
          "application/json"
        ],
        "parameters": [
          {
            "name": "id",
            "in": "path",
            "required": true,
            "type": "string"
          }
        ],
        "responses": {
          "200": {
            "description": "200 response"
          }
        },
        "security": [
          {
            "Authorization": []
          }
        ]
      }
    },
    "/departments": {
      "any": {
        "summary": "departments",
        "description": "",
        "operationId": "departments.any.departments",
        "consumes": [
          "application/json"
        ],
        "produces": [
          "application/json"
        ],
        "parameters": [],
        "responses": {
          "200": {
            "description": "200 response"
          }
        },
        "security": [
          {
            "Authorization": []
          }
        ]
      },
      "get": {
        "summary": "departmentsM",
        "description": "",
        "operationId": "departmentsM.get.departments",
        "consumes": [
          "application/json"
        ],
        "produces": [
          "application/json"
        ],
        "parameters": [],
        "responses": {
          "200": {
            "description": "200 response"
          }
        },
        "security": [
          {
            "Authorization": []
          }
        ]
      }
    },
    "/aurora/users": {
      "get": {
        "summary": "getAuroraUsers",
        "description": "",
        "operationId": "getAuroraUsers.get.aurora/users",
        "consumes": [
          "application/json"
        ],
        "produces": [
          "application/json"
        ],
        "parameters": [],
        "responses": {
          "200": {
            "description": "200 response"
          }
        },
        "security": [
          {
            "Authorization": []
          }
        ]
      }
    },
    "/sentry": {
      "get": {
        "summary": "sentry",
        "description": "",
        "operationId": "sentry.get.sentry",
        "consumes": [
          "application/json"
        ],
        "produces": [
          "application/json"
        ],
        "parameters": [],
        "responses": {
          "200": {
            "description": "200 response"
          }
        },
        "security": [
          {
            "Authorization": []
          }
        ]
      }
    },
    "/service-users": {
      "get": {
        "summary": "users",
        "description": "",
        "operationId": "users.get.service-users",
        "consumes": [
          "application/json"
        ],
        "produces": [
          "application/json"
        ],
        "parameters": [],
        "responses": {
          "200": {
            "description": "200 response"
          }
        },
        "security": [
          {
            "Authorization": []
          }
        ]
      },
      "post": {
        "summary": "users",
        "description": "",
        "operationId": "users.post.service-users",
        "consumes": [
          "application/json"
        ],
        "produces": [
          "application/json"
        ],
        "parameters": [],
        "responses": {
          "200": {
            "description": "200 response"
          }
        },
        "security": [
          {
            "Authorization": []
          }
        ]
      }
    },
    "/service-users-multiple": {
      "get": {
        "summary": "usersMultiple",
        "description": "",
        "operationId": "usersMultiple.get.service-users-multiple",
        "consumes": [
          "application/json"
        ],
        "produces": [
          "application/json"
        ],
        "parameters": [],
        "responses": {
          "200": {
            "description": "200 response"
          }
        },
        "security": [
          {
            "Authorization": []
          }
        ]
      },
      "post": {
        "summary": "usersMultiple",
        "description": "",
        "operationId": "usersMultiple.post.service-users-multiple",
        "consumes": [
          "application/json"
        ],
        "produces": [
          "application/json"
        ],
        "parameters": [],
        "responses": {
          "200": {
            "description": "200 response"
          }
        },
        "security": [
          {
            "Authorization": []
          }
        ]
      }
    },
    "/countries": {
      "get": {
        "summary": "countries",
        "description": "",
        "operationId": "countries.get.countries",
        "consumes": [
          "application/json"
        ],
        "produces": [
          "application/json"
        ],
        "parameters": [],
        "responses": {
          "200": {
            "description": "200 response"
          }
        },
        "security": [
          {
            "Authorization": []
          }
        ]
      }
    },
    "/postcountry": {
      "get": {
        "summary": "addCoutries",
        "description": "",
        "operationId": "addCoutries.get.postcountry",
        "consumes": [
          "application/json"
        ],
        "produces": [
          "application/json"
        ],
        "parameters": [],
        "responses": {
          "200": {
            "description": "200 response"
          }
        },
        "security": [
          {
            "Authorization": []
          }
        ]
      }
    },
    "/countries/{id}": {
      "get": {
        "summary": "countriesById",
        "description": "",
        "operationId": "countriesById.get.countries/{id}",
        "consumes": [
          "application/json"
        ],
        "produces": [
          "application/json"
        ],
        "parameters": [
          {
            "name": "id",
            "in": "path",
            "required": true,
            "type": "string"
          }
        ],
        "responses": {
          "200": {
            "description": "200 response"
          }
        },
        "security": [
          {
            "Authorization": []
          }
        ]
      }
    },
    "/countries/country/name": {
      "get": {
        "summary": "countriesByName",
        "description": "",
        "operationId": "countriesByName.get.countries/country/name",
        "consumes": [
          "application/json"
        ],
        "produces": [
          "application/json"
        ],
        "parameters": [],
        "responses": {
          "200": {
            "description": "200 response"
          }
        },
        "security": [
          {
            "Authorization": []
          }
        ]
      }
    },
    "/countries/country/delete": {
      "get": {
        "summary": "countriesByNameDelete",
        "description": "",
        "operationId": "countriesByNameDelete.get.countries/country/delete",
        "consumes": [
          "application/json"
        ],
        "produces": [
          "application/json"
        ],
        "parameters": [],
        "responses": {
          "200": {
            "description": "200 response"
          }
        },
        "security": [
          {
            "Authorization": []
          }
        ]
      }
    },
    "/cityCodes": {
      "get": {
        "summary": "cityCodes",
        "description": "",
        "operationId": "cityCodes.get.cityCodes",
        "consumes": [
          "application/json"
        ],
        "produces": [
          "application/json"
        ],
        "parameters": [],
        "responses": {
          "200": {
            "description": "200 response"
          }
        },
        "security": [
          {
            "Authorization": []
          }
        ]
      }
    },
    "/cityCodes/insert": {
      "get": {
        "summary": "postCityCodes",
        "description": "",
        "operationId": "postCityCodes.get.cityCodes/insert",
        "consumes": [
          "application/json"
        ],
        "produces": [
          "application/json"
        ],
        "parameters": [],
        "responses": {
          "200": {
            "description": "200 response"
          }
        },
        "security": [
          {
            "Authorization": []
          }
        ]
      }
    },
    "/psUsers/insert": {
      "get": {
        "summary": "addUsers",
        "description": "",
        "operationId": "addUsers.get.psUsers/insert",
        "consumes": [
          "application/json"
        ],
        "produces": [
          "application/json"
        ],
        "parameters": [],
        "responses": {
          "200": {
            "description": "200 response"
          }
        },
        "security": [
          {
            "Authorization": []
          }
        ]
      }
    },
    "/psUsers": {
      "get": {
        "summary": "getUsers",
        "description": "",
        "operationId": "getUsers.get.psUsers",
        "consumes": [
          "application/json"
        ],
        "produces": [
          "application/json"
        ],
        "parameters": [],
        "responses": {
          "200": {
            "description": "200 response"
          }
        },
        "security": [
          {
            "Authorization": []
          }
        ]
      }
    },
    "/Tcities/insert": {
      "get": {
        "summary": "addCityT",
        "description": "",
        "operationId": "addCityT.get.Tcities/insert",
        "consumes": [
          "application/json"
        ],
        "produces": [
          "application/json"
        ],
        "parameters": [],
        "responses": {
          "200": {
            "description": "200 response"
          }
        },
        "security": [
          {
            "Authorization": []
          }
        ]
      }
    },
    "/Tcities": {
      "get": {
        "summary": "getCitiesT",
        "description": "",
        "operationId": "getCitiesT.get.Tcities",
        "consumes": [
          "application/json"
        ],
        "produces": [
          "application/json"
        ],
        "parameters": [],
        "responses": {
          "200": {
            "description": "200 response"
          }
        },
        "security": [
          {
            "Authorization": []
          }
        ]
      }
    },
    "/Tcountries": {
      "get": {
        "summary": "getCountriesT",
        "description": "",
        "operationId": "getCountriesT.get.Tcountries",
        "consumes": [
          "application/json"
        ],
        "produces": [
          "application/json"
        ],
        "parameters": [],
        "responses": {
          "200": {
            "description": "200 response"
          }
        },
        "security": [
          {
            "Authorization": []
          }
        ]
      }
    },
    "/Tcountries/insert": {
      "get": {
        "summary": "postCountryT",
        "description": "",
        "operationId": "postCountryT.get.Tcountries/insert",
        "consumes": [
          "application/json"
        ],
        "produces": [
          "application/json"
        ],
        "parameters": [],
        "responses": {
          "200": {
            "description": "200 response"
          }
        },
        "security": [
          {
            "Authorization": []
          }
        ]
      }
    },
    "/citypeople": {
      "get": {
        "summary": "AddCityAndPeopleT",
        "description": "",
        "operationId": "AddCityAndPeopleT.get.citypeople",
        "consumes": [
          "application/json"
        ],
        "produces": [
          "application/json"
        ],
        "parameters": [],
        "responses": {
          "200": {
            "description": "200 response"
          }
        },
        "security": [
          {
            "Authorization": []
          }
        ]
      }
    },
    "/citypeople/get": {
      "get": {
        "summary": "getCityAndPeopleT",
        "description": "",
        "operationId": "getCityAndPeopleT.get.citypeople/get",
        "consumes": [
          "application/json"
        ],
        "produces": [
          "application/json"
        ],
        "parameters": [],
        "responses": {
          "200": {
            "description": "200 response"
          }
        },
        "security": [
          {
            "Authorization": []
          }
        ]
      }
    }
  },
  "definitions": {
    "Success": {
      "properties": {
        "statusCodee": {
          "title": "Success.statusCodee",
          "type": "string"
        },
        "message": {
          "title": "Success.message",
          "type": "string"
        }
      },
      "required": [
        "statusCodee",
        "message"
      ],
      "additionalProperties": false,
      "title": "Success",
      "type": "object"
    }
  },
  "securityDefinitions": {
    "Authorization": {
      "type": "apiKey",
      "name": "Authorization",
      "in": "header"
    }
  },
  "basePath": "/dev"
};