pragma solidity ^0.5.0;

//Contract declaration
contract Elections{

    //Creating a structure to model candidate
    struct Candidate {
        uint id;
        string name;
        string aadhar;
        uint zipCode;
        uint voteCount;
    }

    struct Voter {
        address poll;
        string aadhar;
        uint zipCode;
        uint candId;
        uint votedOn;
    }

    //use mapping for candidates
    mapping(uint => Candidate) public candidates; 
    mapping(string => bool) private candidate;

    mapping(string => bool) private voter;
    mapping(uint => Voter) public voters;

    //count of candidates
    uint public candidatesCount;
    uint public votersCount;

    event votedEvent (
        uint _candidateId,
        string _aadh,
        string _candName,
        uint _time
    );

    event candEvent (
        uint _candidateId,
        string _aadh,
        string _candName,
        uint _time
    );

    constructor() public {
        addCandidate("Jay","23234234234",534102);
        addCandidate("Indira","2342342112",534102);
        addCandidate("Abv","2342342112",534101);
    }

    //add candidate
    function addCandidate(string memory _name, string memory _aadhar, uint _zipCode) private {
        candidatesCount++;
        candidates[candidatesCount] = Candidate(candidatesCount, _name, _aadhar, _zipCode, 0);
    }

    function castVote(uint _candId, string memory _aadhar, uint _zipCode, bytes32 has, uint8 v, bytes32 r, bytes32 s) 
        public returns (string memory) {
        require(!voter[_aadhar], "Vote already casted for the given aadhar");
        require(_candId > 0 && _candId <= candidatesCount, "Invalid candidate");

        if(verify(_aadhar, _candId, has, v, r, s)){
            candidates[_candId].voteCount++;
            voter[_aadhar] = true;
            votersCount++;
            voters[votersCount] = Voter(msg.sender, _aadhar, _zipCode, _candId, block.timestamp);
            emit votedEvent(_candId, _aadhar, candidates[_candId].name, block.timestamp);
            return "Vote Successful.";
        }else{
            return "Vote Invalid.";
        }
    }

    function regCand(string memory _name, string memory _aadhar, uint _zipCode, bytes32 has, uint8 v, bytes32 r, bytes32 s)
        public returns (bool){

        require(!candidate[_aadhar], "Candidate already registered.");

        if(verify(_aadhar, _zipCode, has, v, r, s)){
            candidate[_aadhar] = true;
            addCandidate(_name, _aadhar, _zipCode);
            emit candEvent(candidatesCount, _aadhar, _name, block.timestamp);
            return true;
        }
        return false;        
    }
    
    function verify(string memory _aadhar, uint candId, bytes32 has, uint8 v, bytes32 r, bytes32 s) public pure returns(bool) {
        bytes memory hashPrefix = "\x19Ethereum Signed Message:\n32";
        bytes32 has1 = keccak256(abi.encodePacked(hashPrefix,keccak256(abi.encodePacked(_aadhar, "|", candId))));
        if(has != has1)
            return false;
        return ecrecover(has, v, r, s) == 0xEC00fF95053FE967C5f66119526735010B58660D;
    }


    
   /* function ttt() public {
        string memory _aadh = "2347237498237947";
        string memory ch = "|";
        uint _candId = 22;
        //bytes32 can = uintToBytes(_candId);
        bytes memory hashPrefix = "\x19Ethereum Signed Message:\n32";
        test = keccak256(abi.encodePacked(_aadh, ch, _candId));
        test = keccak256(abi.encodePacked(hashPrefix,test));
    } */
    /*function verify(bytes32 has, uint8 v, bytes32 r, bytes32 s) public returns(bool) {
        //bytes memory prefix = "\x19Ethereum Signed Message:\n32";
        //bytes32 prefixedHash = keccak256(abi.encodePacked(prefix, has));
        test2 = ecrecover(has, v, r, s);
        return true;
    }*/
}
