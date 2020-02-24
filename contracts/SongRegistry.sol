pragma solidity >=0.5.0; 
 
contract SongRegistry {

struct Song {    //1st bullet point

 address payable owner;
 string title;
 string url;
 uint price;

}

Song[] public songs;   //2nd bullet point 

mapping(uint => address[]) buyers;  //3rd bullet point

function register(string memory title, string memory url, uint price) public returns(uint) {  //4th bullet point of fucntion to register the song 
// dont include address as anyone could register the song - anyone can put my address in the function and call the function but its not me, not the owner
//set owner as msg.sender so only the owner registers the song 
Song memory song = Song(msg.sender, title, url, price); //creates song based on owner, title, url and price  and create it in memory before put it into storage 
songs.push(song); //adds song to the 'songs' array 
buyers[songs.length - 1].push(msg.sender); // reutrns lenght of songs array and by reducing it by 1 returns the index of the last element which is the song we jsut created
return songs.length - 1; //gets songId
}  

function numberOfSOngs() public returns(uint) {  //5th bullet point get the no of songs registered 
    return songs.length; 
}

function isBuyer(uint songId) public view returns(bool) { //6th bullet point to check whether sneder is regitered buyer
address[] storage songBuyers = buyers[songId]; //creates array of songbuyers and getting it from storage 
bool buyer;
for (uint i = 0; i < songBuyers.length; i++) {
  if (songBuyers[i] == msg.sender) {
      buyer = true;
  } else {
      buyer = false; 
  }
 }
 return buyer;
}

function buy(uint songId) public payable { //7th bullet point to buy a song given songId: need payable else cant access msg.value
Song storage song = songs[songId]; //getting the song out of the songs array and retriving out of storage 
require(msg.value == song.price, "Value doesnt match price"); 
buyers[songId].push(msg.sender); 
song.owner.transfer(msg.value); //another way to typecast 
}

 }