// https://eth-ropsten.alchemyapi.io/v2/0H2K7M9DNk6n7SM6Up-0037fhabc1-mU

require('@nomiclabs/hardhat-waffle')

module.exports = {
  solidity: '0.8.0',
  networks: {
    ropsten: {
      url: 'https://eth-ropsten.alchemyapi.io/v2/0H2K7M9DNk6n7SM6Up-0037fhabc1-mU',
      accounts: ['a7a2f59191ce8477761f043f9da63a40ced24f803fd6a423930585e981ef5554']
    }
  }
}