const { expect } = require("chai");
const { ethers } = require("hardhat");

// describe("Greeter", function () {
//   it("Should return the new greeting once it's changed", async function () {
//     const Greeter = await ethers.getContractFactory("Greeter");
//     const greeter = await Greeter.deploy("Hello, world!");
//     await greeter.deployed();

//     expect(await greeter.greet()).to.equal("Hello, world!");

//     const setGreetingTx = await greeter.setGreeting("Hola, mundo!");

//     // wait until the transaction is mined
//     await setGreetingTx.wait();

//     expect(await greeter.greet()).to.equal("Hola, mundo!");
//   });
// });


describe("PueblaCoin", function () {
  let pedro, juan, alicia;
  let PueblaCoin, pueblaCoinInstance;

  beforeEach(async () => {
    [pedro, juan, alicia] = await ethers.getSigners();
    PueblaCoin = await ethers.getContractFactory("PueblaCoin", juan);
    pueblaCoinInstance = await PueblaCoin.deploy();
    await pueblaCoinInstance.deployed();
  });

  describe("Despliegue", function () {
    it("Oferta total de 80 millones de PC (PueblaCoins).", async function () {
      const total_supply = ethers.utils.formatEther(await pueblaCoinInstance.totalSupply());

      expect(total_supply).equal("80000000.0");
      expect(await pueblaCoinInstance.name()).equal("Puebla Coin");
    });

    it("Verificar que Juan es el owner (PueblaCoins).", async function () {

      expect(ethers.utils.formatEther(await pueblaCoinInstance.balanceOf(juan.address))).equal("80000000.0");
    });

    it("Alicia tiene 0 PueblaCoins", async function () {
      expect(ethers.utils.formatEther(await pueblaCoinInstance.balanceOf(alicia.address))).equal("0.0");
    });

    it("Juan transfiere 20 mil PC", async function () {
      await pueblaCoinInstance.connect(juan).transfer(alicia.address, ethers.utils.parseUnits("20000.0"));
      expect(ethers.utils.formatEther(await pueblaCoinInstance.balanceOf(juan.address))).equal("79980000.0");
    })
  });
});
