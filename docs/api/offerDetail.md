# OFFERS

## Path : `/api/offers`

----

## 1. Method: `GET`

### Response

* __Queries (Optional)__

    ```json
    {
      "query": "role",
      "path": "/api/offers/:id?role=caregiver",
    }
    ```

*__Params (Mandatory)__

    ```json
    {
      "param":"id",
      "path":"/api/offers/id"

    }
    ```

* __Content:__

    ```json
      {
        "id": 1,
        "startDate": "2023-11-18T05:00:00.000Z",
        "endDate": "2023-11-20T05:00:00.000Z",
        "pet": {
          "id": 1,
          "name": "peluche",
          "temperaments": "Tranquilo cariñoso y sobre todo sumiso",
          "manners": "Si te avisa cuando quiere ir al baño",
          "notes": "Le gusta que le acaricien la pancita",
          "species": {
            "name": "dog",
            "icon": "🐶"
          },
          "breed": "Husky Siberiano",
          "images": [
            "http://localhost:3001/pictures/pet1_01.png",
            "http://localhost:3001/pictures/pet1_02.png",
            "http://localhost:3001/pictures/pet1_03.png"
          ]
        },
        "owner": {
          "id": 1,
          "rating": "5.40",
          "name": "Anny",
          "role": "owner",
          "address": "Av los juarez",
          "cellPhone": "+51910999999",
          "profilePicture": "http://localhost:3001/pictures/anny.png",
          "reviews": [
            {
              "id": 1,
              "comment": "Anny fue muy correcta al describir su mascota, me gusto tenerlo en mi casa, no causa problemas y avisa cuando tiene que ir al baño.",
              "date": "2023-11-23T15:31:27.268Z",
              "caregiver": {
                "id": 1,
                "name": "Jhonatan",
                "profilePicture": "http://localhost:3001https://cdn.pixabay.com/photo/2016/09/14/19/53/person-1670247_1280.jpg"
              }
            },
            {
              "id": 2,
              "comment": "Ese perro es muy problematico, me saca la lengua a cada rato, me babea el mueble, cero recomendado",
              "date": "2023-11-23T15:31:27.268Z",
              "caregiver": {
                "id": 2,
                "name": "Gaby",
                "profilePicture": "http://localhost:3001https://images.unsplash.com/photo-1671973833358-5a817b220e95?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDEyfHx8ZW58MHx8fHx8&w=1000&q=80"
              }
            }
          ]
        }
      }
    ```
