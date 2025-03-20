pragma solidity ^0.8.9;

contract EducationDonation {
    struct Content {
        string title;
        string description;
        address payable creator;
        uint256 totalDonations;
    }

    mapping(uint256 => Content) public contents;
    uint256 public contentCount;

    event ContentCreated(uint256 indexed contentId, string title, address creator);
    event DonationReceived(uint256 indexed contentId, address donor, uint256 amount);

    /// @notice Create new educational content.
    /// @param _title Title of the content.
    /// @param _description Description of the content.
    function createContent(string memory _title, string memory _description) public {
        contentCount++;
        contents[contentCount] = Content({
            title: _title,
            description: _description,
            creator: payable(msg.sender),
            totalDonations: 0
        });

        emit ContentCreated(contentCount, _title, msg.sender);
    }

    /// @notice Donate to educational content.
    /// @param _contentId ID of the content.
    function donateToContent(uint256 _contentId) public payable {
        require(_contentId > 0 && _contentId <= contentCount, "Invalid content ID");
        require(msg.value > 0, "Donation must be greater than zero");

        Content storage content = contents[_contentId];
        content.totalDonations += msg.value;
        content.creator.transfer(msg.value);

        emit DonationReceived(_contentId, msg.sender, msg.value);
    }

    /// @notice Get content details.
    /// @param _contentId ID of the content.
    /// @return title, description, creator, totalDonations
    function getContent(uint256 _contentId) public view returns (string memory, string memory, address, uint256) {
        Content memory content = contents[_contentId];
        return (content.title, content.description, content.creator, content.totalDonations);
    }
}
