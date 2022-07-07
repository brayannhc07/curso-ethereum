//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract PueblaCoin is ERC20 {
    uint256 constant supply = 80000000e18;

    constructor() ERC20("Puebla Coin", "PC") {
        _mint(msg.sender, supply);
    }
}
