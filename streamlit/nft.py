import streamlit as st

endpoint = st.selectbox("Endpoints", ['Assets', 'Evenets', 'Rarity'])
st.header(f"Opensea NFT API Explorer {endpoint}")

st.sidebar.subheader("Filters")
collection = st.sidebar.text_input("Collection")
owner = st.sidebar.text_input("Owner")

if endpoint == 'Assets':
    params = {}

    if collection: # Only filter by collection if the field is not empty
        params['collection'] = collection
    if owner:
        params['owner'] = owner

    r = requests.get("https://api.opensea.io/api/v1/assets", params=params)

    response = r.json()

    for asset in response["assets"]:
        if asset['name']:
            st.write(asset['name'])
        else:
            st.write(f"{asset['collection_name']['name']} #{asset('token_id')}") 
        
        if asset['image_url'].endswith('mp4') or asset['image_url'].endswith('mov'):
            st.video(asset['image_url'])
        else:
            st.image(asset['image_url'])
    st.write(r.json)

if endpoint == 'Events':
    collection = st.sidebat.text_input("Collection")
    asset_contract_address = st.sidebar.text_input("Contract address")
    token_id = st.sidebar.text_input("Token ID")
    event_type = st.sidebar.selectbox("Event Type", ['offer_entered', 'cancelled', 'bid_withdran', 'transfer', 'transfer', 'approve'])
    params = {}
    if collection:
        params['collection_slug'] = collection
    if asset_contract_address:
        params['asset_contract_address'] = asset_contract_address
    if token_id:
        params['token_id'] = token_id
    if event_type:
        params['event_type'] = event_type
    
    r = requests.get('https://api.opensea.io/api/v1/events', params=params)

    events = r.json()
    event_list = []
    for event in events['asset_events']:
        if event_type == 'offer_entered':
            if event['bid_amount']:
                bid_amount = Web3.fromWei(int(event['bid_amount']), 'ether')
            if event['from_account']['user']:
                bidder = event['from_account']['user']['username']
            else:
                bidder = event['from_account']['address']

            event_list.append([event['created_date'], bidder, float(bid_amount), event ['asset']['collection']['name'], event['asset']['token_id']])
    df = pd.DataFrame(event_list, columns=['time', 'bidder', 'bd_amount', 'collection', 'token_id'])
    st.write(df)

if endpoint == 'Assets':
    st.sidebar.header('Filters')
    owner = st.sidebar.text_input("Owner")
    collection = st.sidebar.text_input