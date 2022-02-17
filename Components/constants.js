const CONTRACT_ADDRESS = "";

const transformUserData = (userData) => {
    return {
        address: userData.address,
        chain: userData.chain,
    };
};

export { CONTRACT_ADDRESS, transformUserData }