import { Web3 } from "web3";
import abi from "./LandAppAbi.json";
import db from "./Database.json";
import getWeb3 from "./getWeb3";

class Web3Service {
  myContract;
  database;
  defaultAccount;

  constructor() {
    (async () => {
      try {
        // console.log(import.meta.env.VITE_CONTRACT_ADDRESS);
        // console.log(import.meta.env.VITE_DATABASE_ADDRESS);

        const web3 = new Web3(import.meta.env.VITE_RPC_SERVER);
        // const web3 = await getWeb3();

        this.myContract = new web3.eth.Contract(
          abi,
          import.meta.env.VITE_CONTRACT_ADDRESS
        );
        this.myContract.handleRevert = true;

        this.database = new web3.eth.Contract(
          db,
          import.meta.env.VITE_DATABASE_ADDRESS
        );
        this.database.handleRevert = true;

        // Get accounts
        const accounts = await web3.eth.getAccounts();
        if (!accounts || accounts.length === 0) {
          throw new Error(
            "No accounts found. Ensure your blockchain node is running and accessible."
          );
        }

        // Set default account
        this.defaultAccount = accounts[0];
        console.log(this.isLandInspector(this.defaultAccount));
        console.log(this.defaultAccount);
        // this.isInspector = this.isLandIns(this.defaultAccount);
      } catch (error) {
        console.error("Error initializing Web3 or contract:", error);
      }
    })();
  }

  async registerLand({
    _area,
    _location,
    _city,
    _state,
    _price,
    _pid,
    _phySurNo,
    _image,
    _document,
  }) {
    try {
      const response = await this.myContract.methods
        .registerLand(
          this.defaultAccount,
          _area,
          _location,
          _city,
          _state,
          _price,
          _pid,
          _phySurNo,
          _image,
          _document
        )
        .send({
          from: this.defaultAccount,
          gas: 1000000,
          gasPrice: "10000000000",
        });
      console.log(response);
      return response;
    } catch (error) {
      console.log(error);
    }
  }

  async updateLand({
    _id,
    _owner,
    _area,
    _location,
    _city,
    _state,
    _price,
    _pid,
    _phySurNo,
    _image,
    _document,
  }) {
    await this.myContract.methods
      .updateLand(
        _id,
        _owner,
        _area,
        _location,
        _city,
        _state,
        _price,
        _pid,
        _phySurNo,
        _image,
        _document
      )
      .send({
        from: this.defaultAccount,
        gas: 1000000,
        gasPrice: "10000000000",
      });
  }

  // async updateLandPrice(_id, _price) {
  //   await this.myContract.methods.updateLandPrice(_id, _price).send({
  //     from: this.defaultAccount,
  //     gas: 1000000,
  //     gasPrice: "10000000000",
  //   });
  // }

  async registerUser({ _name, _age, _email, _location, _mobileNo, _aadharNo }) {
    try {
      console.log(this.defaultAccount);
      const response = await this.myContract.methods
        .registerUser(_name, _age, _email, _location, _mobileNo, _aadharNo)
        .send({
          from: this.defaultAccount,
          gas: 1000000,
          gasPrice: "10000000000",
        });
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  }

  async updateUser({
    _id,
    _name,
    _age,
    _email,
    _location,
    _mobileNo,
    _aadharNo,
  }) {
    try {
      const response = await this.myContract.methods
        .updateUser(_id, _name, _age, _email, _location, _mobileNo, _aadharNo)
        .send({
          from: this.defaultAccount,
          gas: 1000000,
          gasPrice: "10000000000",
        });
      return response;
    } catch (error) {
      console.log(error);
    }
  }

  async landCount() {
    const response = await this.myContract.methods.landCnt().call();
    return response;
  }

  async userCount() {
    const response = await this.myContract.methods.userCnt().call();
    return response;
  }

  async getLandDetail(_id) {
    const response = await this.myContract.methods.getLandDetails(_id).call();
    return response;
  }

  async getUserDetail(_address) {
    const response = await this.myContract.methods
      .getUserDetails(_address)
      .call();
    return response;
  }

  async verifyLand(_id) {
    await this.myContract.methods.verifyLand(_id).send({
      from: this.defaultAccount,
      gas: 1000000,
      gasPrice: "10000000000",
    });
  }

  async verifyUser(_address) {
    try {
      const response = await this.myContract.methods.verifyUser(_address).send({
        from: this.defaultAccount,
        gas: 1000000,
        gasPrice: "10000000000",
      });
      console.log(response);
      return response;
    } catch (error) {
      console.log(error);
    }
  }

  async getAllLands() {
    try {
      const response = await this.myContract.methods.getAllLands().call();
      // console.log(response);
      return response;
    } catch (error) {
      console.log(error);
    }
  }

  async getAllUsers() {
    try {
      const response = await this.myContract.methods.getAllUsers().call();
      console.log(response);
      return response;
    } catch (error) {
      console.log(error);
    }
  }

  async transferwonership(_newOwner, _landId) {
    await this.myContract.methods.transferOwnership(_newOwner, _landId).send({
      from: this.defaultAccount,
      gas: 1000000,
      gasPrice: "10000000000",
    });
  }

  async isLandIns(_id) {
    try {
      const response = await this.myContract.methods
        .isLandInspector(_id)
        .call();
      console.log(response);
      return response;
    } catch (error) {
      console.log(error);
    }
  }

  // async isLandVerify(_id) {
  //   try {
  //     const response = await this.myContract.methods.isLandVerify().call();
  //     console.log(response);
  //     return response;
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }

  // async isUserVerify(_ad) {
  //   try {
  //     const response = await this.myContract.methods.isUserVerified().call();
  //     console.log(response);
  //     return response;
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }

  async sendLandRequest(_id, _sellerAd) {
    try {
      const response = await this.myContract.methods
        .sendLandRequest(_id, _sellerAd)
        .send({
          from: this.defaultAccount,
          gas: 1000000,
          gasPrice: "10000000000",
        });
      console.log(response);
      console.log("Request send Successfully!");
    } catch (error) {
      console.log(error);
    }
  }

  async getRequestDetail(_requestid) {
    try {
      const response = await this.myContract.methods
        .getRequestDetails(_requestid)
        .call();
      console.log(response);
      return response;
    } catch (error) {
      console.log(error);
    }
  }

  async approveLandRequest(_id) {
    try {
      const response = await this.myContract.methods
        .approveLandRequest(_id)
        .send({
          from: this.defaultAccount,
          gas: 1000000,
          gasPrice: "10000000000",
        });
      console.log(response);
      console.log("Request Approved!");
    } catch (error) {
      console.log(error);
    }
  }

  async isRequested(_id) {
    try {
      const response = await this.myContract.methods.isRequested(_id).call();
      console.log("Is Requested: ", response);
      return response;
    } catch (error) {
      console.log(error);
    }
  }

  async getUserAddress(_id) {
    try {
      const response = await this.myContract.methods.getUserAddress(_id).call();
      console.log(response);
      return response;
    } catch (error) {
      console.log(error);
    }
  }

  async UserLands(_ad) {
    try {
      if (web3Service.defaultAccount) {
        const response = await this.myContract.methods.getUserLands(_ad).call();
        console.log(response);
        return response;
      } else {
        console.log("default Account not found!");
      }
    } catch (error) {
      console.log(error);
    }
  }
  async getLandRequests(_landId) {
    try {
      const response = await this.myContract.methods
        .getLandRequestDetail(_landId)
        .call();
      console.log(response);
      // return array of landrequests
      return response;
    } catch (error) {
      console.log(error);
    }
  }

  async addApprovedRequest(requestId) {
    try {
      const res = await this.database.methods.addRequest(requestId).send({
        from: this.defaultAccount,
        gas: 1000000,
        gasPrice: "10000000000",
      });
      console.log("Id Added Successfully", res);
    } catch (error) {
      console.log("Error: ", error);
    }
  }

  async removeRequest(requestId) {
    try {
      const res = await this.database.methods.removeRequest(requestId).send({
        from: this.defaultAccount,
        gas: 1000000,
        gasPrice: "10000000000",
      });
      console.log("Id Removed Successfully", res);
    } catch (error) {
      console.log("Error: ", error);
    }
  }

  async getrequestList() {
    try {
      const response = await this.database.methods.getApprovedList().call();
      if (Array.isArray(response)) {
        console.log(response);
        return response;
      } else {
        console.log("No request found");
      }
    } catch (error) {
      console.log("Error:", error);
    }
  }
}

// Initialize and export the instance
const web3Service = new Web3Service();
export default web3Service;
