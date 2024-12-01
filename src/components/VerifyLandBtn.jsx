import Button from "./Button";
import web3Service from "../Web3/web3Service";

const verifyland = async (_id) => {
  try {
    await web3Service.verifyLand(_id);
  } catch (error) {
    console.log(error);
  }
};

export default function VerifyLandBtn(_id) {
  return <div className="btn">
    <Button className="font-bold px-3 py-2 w-32 bg-blue-500 text-white rounded-md hover:text-yellow-400 hover:shadow-xl"  onclick={verifyland(_id)}>Verify Land</Button>
  </div>;
}
