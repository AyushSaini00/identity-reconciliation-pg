# endpoint

- /identify : https://identity-reconciliation-web-service.onrender.com/identify

# example curl

```bash
curl --location 'https://identity-reconciliation-web-service.onrender.com/identify' \
--header 'Content-Type: application/json' \
--data-raw '{
    "email": "example@provider.com",
    "phoneNumber": "989898"
}'
```

# Notes

problem statement derived flow chart :

- search for existing contacts using provided email or number

  - if not found
    -> create new primary contact
    -> return contact payload

  - if found 1 -> create new secondary contact
    note : this can either be a primary or secondary contact.

    - with fields as :
      -> linkedId = id of primary contact
      -> linkPrecedence = "secondary"
    - return contact payload

  - if found multiple

    - oldest contact will stay primary and will not be modifed
    - lastest contact will be update to a secondary contact

abstractions :

func => findPrimaryAndReturnAllPrimaryAndSecondaries
