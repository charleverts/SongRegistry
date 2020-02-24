//import truffle assertions
const truffleAssert = require('truffle-assertions') 

//import contract artifact 
const SongRegistry = artifacts.require('./SongRegsitry.sol')

contract('SongRegistry', function (accounts) {
    //predefine contract instance
    let SongRegistryInstance 

    // before each test, create a new contract instance
    beforeEach(async function () {
        SongRegistryInstance = await SongRegistry.new()
    })

    // Test 1
    it('Should correctly add a song to the registry', async function () {
        await SongRegistryInstance.register("Cool Song", "example.com", 1, { 'from': accounts[0] }) 
        let song = await SongRegistryInstance.songs(0) 
        assert.equal(song.title = 'Cool Song', 'title not set correclty')
        assert.equal(song.owner = accounts[0], 'owner is not account 0')
    })

     // Test 2
    it('Should check that a song can be bought', async function () {
        await SongRegistryInstance.register("Cool song", "example.com", 1, {'from': accounts[2]})
        let buyer_1 = await SongRegistryInstance.songBuyers()
        assert.equal(buyer1, 1, "Error in identifying true buyers")
    })
    
     // Test 3
    it('Should check that the number of songs increase with each additional new regstration', async function () {
        await SongRegistryInstance.register("Cool Song", "example.com", 1, {'from': accounts[0]}) 
        await SongRegistryInstance.register("Cool Song1", "example1.com", 1, { 'from': accounts[0] }) 
        let song = await SongRegistryInstance.numberOfSongs()
        assert.equal(song.toNumber(), 2, "Number of songs does not increase with a new registration")

     // Test 4
    it('Should ensure that only true buyers are identified as such', async function () {
        await SongRegistryInstance.register("Cool Song", "example.com", 1, { 'from': accounts[1] }) 
        await SongRegistryInstance.buy(0, {'from': accounts[0], value: 1})
        let is_buyer = await SongRegistryInstance.isBuyer(0, {'from': accounts[0]})
        assert.equal(is_buyer, true, "Error with identification of true buyers")
    })