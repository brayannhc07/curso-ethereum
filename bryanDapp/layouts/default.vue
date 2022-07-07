<template>
  <v-app dark>
    <v-navigation-drawer v-model="drawer" :mini-variant="miniVariant" :clipped="clipped" fixed app>

    </v-navigation-drawer>
    <v-app-bar :clipped-left="clipped" fixed app>

      <v-spacer />
      <v-toolbar-title v-if="currentAddress">Current account:
        {{
            currentAddress ? currentAddress : "No account detected"
        }}</v-toolbar-title>
      <v-spacer />
      <v-btn light @click="connectWallet()"> Conectar Wallet </v-btn>
    </v-app-bar>
    <v-main>
      <v-container>
        <v-col cols="12" align="middle" text-align="center" justify="center" mx-auto>

          <v-card>
            <v-card-title primary-title> NFT Minting !!! </v-card-title>

            <v-text-field v-model="TokenUri" solo label="Ingres aqui el token URI" clearable></v-text-field>
            <v-card-actions>
              <v-btn color="success" @click="callGreeter">Mintear</v-btn>
            </v-card-actions>
          </v-card>
          <br />
          <v-card>
            <v-card-title>Obtener NFT</v-card-title>
            <v-text-field v-model="tokenID" solo label="Ingres aqui el ID del NFT" clearable></v-text-field>
            <v-card-actions>
              <v-btn color="red" @click="getNFts">Obterner NFTS</v-btn>
            </v-card-actions>
          </v-card>
          <br>
          <v-card>
            <v-card-title v-if="!uri"> Nothing to show yet!</v-card-title>
            <v-card-title v-if="uri"> {{ this.uri.name }}</v-card-title>
            <v-card-subtitle v-if="uri"> {{ this.uri.description }}</v-card-subtitle>
            <v-img v-if="uri" width="400" :src="uri.image.href"></v-img>
          </v-card>
        </v-col>
      </v-container>
    </v-main>
    <v-navigation-drawer v-model="rightDrawer" :right="right" temporary fixed>
      <v-list>
        <v-list-item @click.native="right = !right">
          <v-list-item-action>
            <v-icon light> mdi-repeat </v-icon>
          </v-list-item-action>
          <v-list-item-title>Switch drawer (click me)</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-footer :absolute="!fixed" app>
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>
 
<script>
import detectEthereumProvider from "@metamask/detect-provider";
import { ethers } from "ethers";
import faces from "@/solidity/artifacts/contracts/Faces.sol/Faces.json";

export default {
  name: "DefaultLayout",
  data() {
    return {
      clipped: false,
      tokenID: null,
      uri: null,
      signer: null,
      TokenUri: null,
      currentAddress: null,
      provider: null,
      drawer: false,
      fixed: false,
      items: [
        {
          icon: "mdi-apps",
          title: "Welcome",
          to: "/",
        },
        {
          icon: "mdi-chart-bubble",
          title: "Inspire",
          to: "/inspire",
        },
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: "Vuetify.js",
    };
  },
  async mounted() {
    const res = ethereum.on("accountsChanged", this.handleAccountsChanged);
    console.log("eventos eth");
    console.log(res);
  },
  methods: {
    handleAccountsChanged(accounts) {
      console.log("Changed!!!!!!");
    },
    async getNFts() {
      let a = await this.signer.getAddress();
      let FacesCollectionInstance = new ethers.Contract(
        "0x8B75b8568A2A06B74Ab7E47ED8C529D9249e67ff",
        faces.abi,
        this.signer
      );
      const r = await FacesCollectionInstance.tokenURI(this.tokenID);
      fetch(r)
        .then((result) => result.json())
        .then((output) => {
          console.log("Output: ", output);
          this.uri = output;
        })
        .catch((err) => console.error(err));
    },
    async callGreeter() {
      let a = await this.signer.getAddress();
      let FacesCollectionInstance = new ethers.Contract(
        "0x8B75b8568A2A06B74Ab7E47ED8C529D9249e67ff",
        faces.abi,
        this.signer
      );

      const res = await FacesCollectionInstance.mintFace(
        this.signer.getAddress(),
        this.TokenUri
      );
      console.log(res);
    },
    async connectWallet() {
      const provider = new ethers.providers.Web3Provider(
        window.ethereum,
        "any"
      );
      // Prompt user for account connections
      await provider.send("eth_requestAccounts", []);
      const signer = provider.getSigner();
      this.currentAddress = await signer.getAddress();
      console.log("Account:", await signer.getAddress());
      this.signer = signer;
    },
  },
};
</script>
