pragma solidity >=0.4.25 <0.6.0;



contract BlockchainElection
{
    enum StateType{PreVoting,LiveVoting,Terminate,Results}
    address public Voter;

    address public ElectionCommission;
    string public VoteSequence;
    string public Result;

    //Prototype to represent three candidates A,B and C    
    int public CandidateA;
    int public CandidateB;
    int public CandidateC;
    int public Candidate_A;
    int public Candidate_B;
    int public Candidate_C;
    int public totalVoter;

    StateType public State;
    mapping(address => bool ) isAllowedtoVote;
    //constructor
    constructor() public
    {
        //initialising the state
        State=StateType.PreVoting;
    }
    
    function BeginVotingProcess() public
    {
        State=StateType.LiveVoting;
        totalVoter=0;
    }

    
    //This function is called when voter casts his vote
    function CastVote(string memory votesequence) public
    {
        VoteSequence="NULL";
        address voter=msg.sender;

        if(isAllowedtoVote[voter])
           return;

         if(keccak256(abi.encodePacked((votesequence))) == keccak256(abi.encodePacked(("123"))))
            {
                Candidate_A+=10;
                Candidate_B+=8;
                Candidate_C+=6;
            }
            else
             if(keccak256(abi.encodePacked((votesequence))) == keccak256(abi.encodePacked(("312"))))
            {
                Candidate_A+=8;
                Candidate_B+=6;
                Candidate_C+=10;
            }
            else
             if(keccak256(abi.encodePacked((votesequence))) == keccak256(abi.encodePacked(("231"))))
            {
                Candidate_A+=6;
                Candidate_B+=10;
                Candidate_C+=8;
            }

        totalVoter++;
        isAllowedtoVote[voter]=true;

        Result="not yet available";
        CandidateA=-1;
        CandidateB=-1;
        CandidateC=-1;
        
    }
    
    function EndVotingProcess() public
    {
        State=StateType.Terminate;
    }
    
    function CountVote() public
    {   
        CandidateA=Candidate_A;
        CandidateB=Candidate_B;
        CandidateC=Candidate_C;
        if(CandidateC>CandidateB)
        {
            if(CandidateA>CandidateC)
            Result="Winner is Candidate A";
            else
            Result="Winner is Candidate C";
        }
        else
        {
            if(CandidateA>CandidateB)
            Result="Winner is Candidate A";
            else
            Result="Winner is Candidate B";
        }
        
       State=StateType.Results;
    }
}