module.exports = {
  /**
  * @lang - ES
  * @desc 
  * 1.- Agrega una versión de compilador correcta para 2_Owner.sol
  * 2.- Agrega una versión de compilador diferente a 0.4.11 y 0.5.2 pero que sea compatible con el pragma de 1_Owner.sol
  * 3.- Agrega un override para 3_Owner.sol para que lo compile con una versión 0.6.0 
  */
  /**
  * @desc 
  * 1.- Add a correct compiler version for 2_Owner.sol
  * 2.- Add a compiler version different from 0.4.11 and 0.5.2 but compatible with the pragma of 1_Owner.sol.
  * 3.- Add an override for 3_Owner.sol to compile it with a 0.6.0 version. 
  */
  solidity: {
    compilers: [
      {
        version: "0.7.1",
      },
      {
        version: "0.4.12",
      }
    ],
    overrides: {
      "contracts/3_Owner.sol": {
        version: "0.6.0",
        settings: {}
      }
    }

  }

};
