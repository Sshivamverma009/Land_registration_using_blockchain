import Button from "./Button";
import web3Service from "../Web3/web3Service";

const verifyUser = async (_ad) => {
  try {
    await web3Service.verifyUser(_ad);
  } catch (error) {
    console.log(error);
  }
};

export default function VerifyUserBtn(_id) {
  return (
    <div className="btn">
      <Button
        className="font-bold px-3 py-2 w-32 bg-blue-500 text-white rounded-md hover:text-yellow-400 hover:shadow-xl"
        onClick={verifyUser(_id)}
      >
        Verify User
      </Button>
    </div>
  );
}
