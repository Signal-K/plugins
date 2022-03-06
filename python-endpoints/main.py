import json 
import time 
import requests
import pandas as pd

# We get 1 call every 10 seconds with calls up to 10000 instances long with this 
# API key
eth_api_key = 'QNB7WTVMDT1M6KFVRN2458GFUGIHEIKBX1'

def get_last_block():
    """Self explanatory"""
    return int(json.loads(requests.get(
        f"https://api.etherscan.io/api?module=block&action=getblocknobytime&timestamp={round(time.time())}&closest=before&apikey={eth_api_key}"
    ).text)["result"])

def get_last_txs(address, no_of_transactions):
    """generate list of last transactions from address according to no_of_transactions"""
    return json.loads(requests.get(
        f"https://api.etherscan.io/api?module=account&action=txlist&address={address}&startblock={get_last_block() - no_of_transactions}&sort=asc&apikey={eth_api_key}"
    ).text)["result"] 
    

def main(address = '0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D', no_of_transactions = 2): 
    txs = get_last_txs(address, no_of_transactions)
    return pd.DataFrame(txs)

if __name__ == "__main__":
    main()