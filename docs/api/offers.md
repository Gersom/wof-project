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
        "id": 2,
        "address": "Av los juarez",
        "startDate": "2023-11-19T05:00:00.000Z",
        "endDate": "2023-11-23T05:00:00.000Z",
        "caregiverId": null,
        "pet": {
          "id": 2,
          "name": "simba",
          "imageUrl": "http://url"
        },
        "owner": {
          "userId": 1,
          "name": "Anny",
          "rating": "4.70"
        }
      }
    ]
    ```
