// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract LandApp {
    // struct
    struct Land {
        uint256 id;
        address owner;
        uint256 area;
        string location; // Renamed from Address to location
        string city;
        string state;
        uint256 price;
        uint256 PID;
        uint256 physicalSurverNo;
        string image;
        string document;
        bool isVerified;
    }

    struct User {
        uint256 id;
        string name;
        uint256 age;
        string email;
        string location; // Renamed from Address to location
        string mobileNo;
        string aadharNo;
        bool isVerified;
    }

    struct LandInspector {
        uint256 id;
        string name;
        uint256 age;
        string designation;
    }

    struct LandRequest {
        uint256 id;
        address sellerId;
        address buyerId;
        uint256 landId;
    }

    // mapping
    mapping(address => User) public UserMapping;
    mapping(uint256 => Land) public LandMapping;
    mapping(uint256 => LandInspector) public LandInspectorMapping;
    mapping(uint256 => LandRequest) public RequestMapping;

    mapping(address => bool) public userRegistrationMapping;
    mapping(uint256 => bool) public landRegistrationMapping;
    mapping(uint256 => bool) public inspectorRegistrationMapping;
    mapping(uint256 => bool) public requestedLandMapping;
    mapping(uint256 => bool) public requestStatusMapping;
    mapping(uint256 => bool) public paymentReceived;

    // variables
    address[] public users;
    uint256[] public lands;
    address public land_Inspector;
    uint256 public userCount;
    uint256 public landCount;
    uint256 public landInspectorCount;
    uint256 public requestCount;

    // events
    event UserRegistration(address indexed _userAddress);
    event VerifiedUser(address indexed _userAddress);
    event LandRegistration(uint256 indexed _landId);
    event VerifiedLand(uint256 indexed _landId);
    event LandRequested(address indexed _sellerId);
    event RequestApproved(address indexed _buyerId);

    constructor() {
        land_Inspector = msg.sender;
        registerInspector("User1", 25, "Tehsildaar");
    }

    function isUserRegistered(address _ad) public view returns (bool) {
        return userRegistrationMapping[_ad];
    }

    function isUserVerified(address _ad) public view returns (bool) {
        return UserMapping[_ad].isVerified;
    }

    function isLandRegistered(uint256 _id) public view returns (bool) {
        return landRegistrationMapping[_id];
    }

    function isLandVerified(uint256 _id) public view returns (bool) {
        return LandMapping[_id].isVerified;
    }

    function getUserDetails(address _ad) public view returns (User memory) {
        return UserMapping[_ad];
    }

    function getLandDetails(uint256 _id) public view returns (Land memory) {
        return LandMapping[_id];
    }

    function isLandInspector(address _ad) public view returns (bool) {
        return land_Inspector == _ad;
    }

    function registerUser(
        string memory name,
        uint256 age,
        string memory email,
        string memory location, // Renamed from Address to location
        string memory mobNo,
        string memory aadharNo
    ) public {
        require(!isUserRegistered(msg.sender));
        require(age > 18);
        require(bytes(name).length != 0);
        require(bytes(mobNo).length == 10);
        require(bytes(aadharNo).length == 12);
        require(bytes(email).length >= 11);
        require(bytes(location).length != 0); // Renamed

        userCount++;
        UserMapping[msg.sender] = User(
            userCount,
            name,
            age,
            email,
            location, // Renamed
            mobNo,
            aadharNo,
            false
        );
        users.push(msg.sender);
        userRegistrationMapping[msg.sender] = true;
        emit UserRegistration(msg.sender);
    }

    function updateUser(
        uint256 _id,
        string memory _name,
        uint256 _age,
        string memory _email,
        string memory _location, // Renamed from Address to location
        string memory _mobNo,
        string memory _aadharNo
    ) public {
        require(
            isUserRegistered(msg.sender) && UserMapping[msg.sender].id == _id,
            "Unregistered User"
        );
        require(_age > 18);
        require(bytes(_name).length != 0);
        require(bytes(_mobNo).length == 10);
        require(bytes(_aadharNo).length == 12);
        require(bytes(_email).length >= 11);
        require(bytes(_location).length != 0); // Renamed

        UserMapping[msg.sender] = User(
            _id,
            _name,
            _age,
            _email,
            _location, // Renamed
            _mobNo,
            _aadharNo,
            false
        );
    }

    function registerLand(
        address _owner,
        uint256 _area,
        string memory _location, // Renamed from Address to location
        string memory _city,
        string memory _state,
        uint256 _price,
        uint256 _PID,
        uint256 _physicalSurNo,
        string memory _image,
        string memory _document
    ) public {
        require(
            userRegistrationMapping[msg.sender],
            "Only registered User can list their Property"
        );
        require(_area > 0);
        require(bytes(_location).length != 0); // Renamed
        require(bytes(_city).length != 0);
        require(bytes(_state).length != 0);
        require(_price > 0);
        require(_PID > 0);
        require(_physicalSurNo > 0);
        require(bytes(_image).length != 0);
        require(bytes(_document).length != 0);
        require(msg.sender == _owner);

        landCount++;
        LandMapping[landCount] = Land(
            landCount,
            _owner,
            _area,
            _location, // Renamed
            _city,
            _state,
            _price,
            _PID,
            _physicalSurNo,
            _image,
            _document,
            false
        );
        lands.push(landCount);
        landRegistrationMapping[landCount] = true;
        emit LandRegistration(landCount);
    }

    function updateLand(
        uint256 _id,
        address _owner,
        uint256 _area,
        string memory _location, // Renamed from Address to location
        string memory _city,
        string memory _state,
        uint256 _price,
        uint256 _PID,
        uint256 _physicalSurNo,
        string memory _image,
        string memory _document
    ) public {
        require(
            userRegistrationMapping[msg.sender] &&
                LandMapping[_id].owner == msg.sender,
            "Only Land Owner can update their property"
        );
        require(_area > 0);
        require(bytes(_location).length != 0); // Renamed
        require(bytes(_city).length != 0);
        require(bytes(_state).length != 0);
        require(_price > 0);
        require(_PID > 0);
        require(_physicalSurNo > 0);
        require(bytes(_image).length != 0);
        require(bytes(_document).length != 0);
        require(msg.sender == _owner);

        LandMapping[_id] = Land(
            _id, // Corrected from landCount to _id
            _owner,
            _area,
            _location, // Renamed
            _city,
            _state,
            _price,
            _PID,
            _physicalSurNo,
            _image,
            _document,
            false
        );
    }

    function updateLandPrice(uint256 _id, uint256 _price) public {
        require(
            userRegistrationMapping[msg.sender] &&
                landRegistrationMapping[_id] &&
                LandMapping[_id].owner == msg.sender,
            "Only Owner can update price"
        );
        require(_price > 0, "Price must be greater than zero");
        LandMapping[_id].price = _price;
    }

    function verifyUser(address _ad) public {
        require(
            isLandInspector(msg.sender),
            "Only LandInspector can verify users"
        );
        require(
            userRegistrationMapping[_ad],
            "Only Registered Users can be verified"
        );
        UserMapping[_ad].isVerified = true;
        emit VerifiedUser(_ad);
    }

    function registerInspector(
        string memory _name,
        uint256 _age,
        string memory _designation
    ) internal { // Changed to internal
        require(bytes(_name).length != 0);
        require(_age >= 18);
        require(bytes(_designation).length != 0);
        
        landInspectorCount++;
        LandInspectorMapping[landInspectorCount] = LandInspector(
            landInspectorCount,
            _name,
            _age,
            _designation
        );
    }

    function verifyLand(uint256 _id) public {
        require(
            isLandInspector(msg.sender),
            "Only landInspector can verify lands"
        );
        require(
            landRegistrationMapping[_id],
            "Only registered lands can be verified"
        );
        LandMapping[_id].isVerified = true;
        emit VerifiedLand(_id);
    }

    function sendLandRequest(uint256 _landId, address _seller) public {
        require(
            userRegistrationMapping[_seller] &&
                userRegistrationMapping[msg.sender],
            "Only registered user can buy and sell property"
        );
        require(
            landRegistrationMapping[_landId],
            "only registered land can be bought"
        );
        requestCount++;
        RequestMapping[requestCount] = LandRequest(
            requestCount,
            _seller,
            msg.sender,
            _landId
        );
        requestStatusMapping[requestCount] = false;
        requestedLandMapping[requestCount] = true;
        emit LandRequested(_seller);
    }

    function transferOwnerShip(address _newOwner, uint256 _landId) public {
        require(
            isLandInspector(msg.sender),
            "Only Landinspector can transfer ownership"
        );
        require(landRegistrationMapping[_landId], "Invalid Credentials");
        require(
            userRegistrationMapping[_newOwner],
            "OwnerShip Would be transfered Only to verified users"
        );
        LandMapping[_landId].owner = _newOwner;
    }

    function approveLandRequest(uint256 _Id) public {
        require(
            userRegistrationMapping[msg.sender] &&
            LandMapping[_Id].owner == msg.sender,
            "Only registered user can sell their property"
        );
        require(
            landRegistrationMapping[_Id],
            "Only registered land could be selled"
        );
        requestStatusMapping[_Id] = true;
        emit RequestApproved(RequestMapping[_Id].buyerId);
    }

    function payment(uint256 _landId, address payable _seller) public payable { // Added payable
        require(
            userRegistrationMapping[msg.sender] &&
                userRegistrationMapping[_seller],
            "only registered user can buy and sell properties"
        );
        require(
            landRegistrationMapping[_landId],
            "only registered land can be purchased"
        );
        paymentReceived[_landId] = true;
        _seller.transfer(msg.value);
    }
}
