import requests

params = {
    'collection': 'the-wanderers',
    'limit': 1
}

r = requests.get("https://api.opensea.io/api/v1/assets", params=parems)

print(json.dumps(r.json()))