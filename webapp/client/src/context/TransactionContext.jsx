import React, { useEffect, useState } from 'react';
import { ethers } from 'ethers';

import { contractABI, contractAddress } from '../utils/constants';

export const TransactionContext = React.createContext();
const { ethereum } = window; // Get access to the ethereum object

const getEthereumContract = () => {
    const provider = new ethers.providers.Web3Provider(ethereum);
    const signer = provider.getSigner();
    const transactionContract = new ethers.Contract(contractAddress, contractABI, signer);

    return transactionContract;
}

export const TransactionsProvider = ({ children }) => {
    const [currentAccount, setCurrentAccount] = useState("");
    const [formData, setFormData] = useState({ addressTo: "", amount: '', keyword: "", message: "" });
    const [transactionCount, setTransactionCount] = useState(localStorage.getItem('transactionCount'));

    // loading state
    const [isLoading, setIsLoading] = useState(false);

    const handleChange = (e, name) => {
        setFormData((prevState) => ({ ...prevState, [name]: e.target.value }));
    }

    const checkIfWalletIsConnected = async () => {
        try {
            if (!ethereum) return alert("Please install Metamask");

            const accounts = await ethereum.request({ method: 'eth_accounts' });
            console.log(accounts);

            if (accounts.length) {
                setCurrentAccount(accounts[0]);

                // Get a list of all transactions
                //getAllTransactions();
            } else {
                console.log("No accounts found");
            }
        } catch {
            console.log(error);

            throw new Error("Error while trying to connect to the wallet - no accounts found, no ethereum object found");
        }
    }

    const connectWallet = async () => {
        try {
            if (!ethereum) return alert("Please install Metamask");

            const accounts = await ethereum.request({ method: 'eth_requestAccounts' });

            setCurrentAccount(accounts[0]);
        } catch (error) {
            console.log(error);

            throw new Error("No Ethereum object");
        }
    }

    const sendTransaction = async () => {
        try {
            if (!ethereum) return alert("Please install Metamask");

            // get the data from the form
            const { addressTo, amount, keyword, message } = formData;
            const transactionContract = getEthereumContract();
            const parsedAmount = ethers.utils.parseEther(amount);

            // Send transaction
            await ethereum.request({ method: 'eth_sendTransaction', params: [{ from: currentAccount, to: addressTo, gas: '0x5208', value: parsedAmount._hex, }] });
            const transactionHash = await transactionContract.addToBlockchain(addressTo, parsedAmount, message, keyword);

            setIsLoading(true);
            console.log(`Loading - ${transactionHash.transactionHash}`)
            await transactionHash.wait();
            setIsLoading(false);
            console.log(`Success - ${transactionHash.transactionHash}`)

            const transactionCount = await transactionContract.getTransactionCount
            setTransactionCount(transactionCount.toNumber());
        } catch {
            console.log(error)
            throw new Error("Error while trying to send transaction");
        }
    }

    useEffect(() => {
        checkIfWalletIsConnected();
    }, [])

    return (
        <TransactionContext.Provider value={{ connectWallet, currentAccount, formData, setFormData, handleChange, sendTransaction }}>
            {children}
        </TransactionContext.Provider>
    )
}