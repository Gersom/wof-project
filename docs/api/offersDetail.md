# OFFERS

## Path : `/api/offers`

----

## 1. Method: `GET`

### Response

* __Queries (Optional)__

    ```json
    {
      "query": "role",
      "path": "/api/offers?role=caregiver",
    }
    ```

* __Content:__

    ```json
    [
      {
        "id": 1,
        "startDate": "2023-11-18T05:00:00.000Z",
        "endDate": "2023-11-20T05:00:00.000Z",
        "caregiverId": null,
        "owner": {
          "userId": 1,
          "name": "Anny",
          "rating": "4.70",
          "address": "Av los juarez",
          "profile_image": "http://url",
          "reviews": [
            {
              "comment": "Fue muy correcta al describir su mascota",
              "caregiver": {
                "id": 1,
                "name": "Gabriel",
                "date": "2023-11-20T05:00:00.000Z",
                "profile_image": "http://url",
              }
            }
          ]
        },
        "pet": {
          "id": 2,
          "name": "simba",
          "specie": "perro",
          "breed": "Pastor aleman",
          "temperaments": "Mordelon",
          "manners": "Si esta de buen humor se va a hacer sus cosas a fuera",
          "notes": "Simba no te mira te juzga",
          "images": [
            "http://url", "http://url"
          ]
        },
      }
    ]
    ```
