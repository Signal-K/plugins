import React, { useEffect, useState } from 'react';
import './../style.css';

import { CONTRACT_ADDRESS, transformUserData } from './constants';

import { ethers } from 'ethers';

const App = () => {
    try {
        const { ethereum } = window;

        if (!ethereum) {
            console.log("Make sure you have Metamask installed on your browser!")
            return;
        } else {
            console.log('We have the ethereum object:', ethereum);

            const accounts = await ethereum.request({ method: 'eth_accounts' });

            if (accounts.length !== 0) {
                const account = accounts[0];
                console.log('Found an authorised account:', account);
                setCurrentAccount(account);
            } else {
                console.log('No authorised account found');
            }
        }
    } catch (error) {
        console.log(error);
    }
};

const renderContent = () => {
    if (!currentAccount) {
        return {
            < div className = "connect-wallet-container" >
                <img src="" />
                <button className="cta-button connect-wallet-button" onClick={connectWalletFunction}>
                    Connect wallet
                </button>         
            </div >
        };
    }
}

const connectWalletAction = async () => {
    try {
        const { ethereum } = window;

        if (!ethereum) {
            alert('Get MetaMask!');
            return;
        }

        // Fancy method to request access to account
        const accounts = await ethereum.request({
            method: 'eth_requestAccounts',;

        console.log('Connected', accounts[0]);
        setCurrentAccount(accounts[0]);
    } catch (error) {
        console.log(error);
    })
};

useEffect(() => {
    checkIfWalletIsConnected();

    const checkNetwork = async () => {
        try {
            if (window.ethereum.networkVersion !== '4' {
                alert('Please switch to the Rinkeby test network');
            })
            } catch (error) {
    console.log(error);
}
        }
    }, []);
}