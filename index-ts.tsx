import axios from 'axios';

const url = 'https://etherscan.io/token/generic-tokenholders2?a=0x6425c6be902d692ae2db752b3c268afadb099d3b&s=0&p=';
// Find an api endpoint (for above link) that returns a list of all the tokens

interface Tokens { // Different tokens available
    id: number;
    name: string;
    symbol: string;
    changePercentage: number;
    volume: number;
    circulatingCap: number;
    onChainCap: number;
    holders: number;
}

axios.get(url).then(response => {
    const token = response.data as Tokens;
    const id = token.id;
    const name = token.name;
    const symbol = token.symbol;
    const changePercentage = token.changePercentage;
    const volume = token.volume;
    const circulatingCap = token.circulatingCap;
    const onChainCap = token.onChainCap;
    const holders = token.holders;
});

const logToken = (id: number, name: string, symbol: string, changePercentage: number, volume: number, circulatingCap: number, onChainCap: number, holders: number) => {
    console.log(`
        The Token with ID: ${id}
        Has a name of: ${name}
        Has a symbol of: ${symbol}
        Has a changePercentage of: ${changePercentage}
        Has a volume of: ${volume}
        Has a circulatingCap of: ${circulatingCap}
        Has a onChainCap of: ${onChainCap}
        Has a holders of: ${holders}
    `);
}

const EventComponent: React.FC = () => {
    const onChange = (e) => {
        console.log(e);
    };

    return (
        <div>
            <input onChange={(e) => console.log(e)} />
        </div>
    );
};

export default EventComponent