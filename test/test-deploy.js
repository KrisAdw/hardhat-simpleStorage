const {ethers} = require("hardhat")
const {expect, assert} = require("chai")

describe("SimpleStorage", function () {
    let simpleStorage, simpleStorageFactory
    beforeEach(async function () {
        simpleStorageFactory = await ethers.getContractFactory("SimpleStorage")
        simpleStorage = await simpleStorageFactory.deploy()
    })

    it("Should start with a favorite number of 0", async function () {
        const currentValue = await simpleStorage.retrieve()
        const expectedValue = "0"
        assert.equal(currentValue.toString(), expectedValue)
        // expect(currentValue.toString()).to.equal(expectedValue)
    })

    it("Should update when we call store", async function () {
        const expectedValue = "7"
        const transactionResponse = await simpleStorage.store(expectedValue)
        await transactionResponse.wait(1)
        
        const updatedValue = await simpleStorage.retrieve()
        assert.equal(updatedValue.toString(), expectedValue)
    })

    it("Should add a new person with name & favorite number ", async function () {
        const name = "kris"
        const favoriteNumber = 69
        const transactionResponse = await simpleStorage.addPerson(name, favoriteNumber)
        await transactionResponse.wait(1)

        const storedPeople = await simpleStorage.people(0)
        assert.equal(storedPeople.name, name)
        assert.equal(storedPeople.favoriteNumber.toString(), favoriteNumber.toString())

        const retrieveFavoriteNumber = await simpleStorage.nameToFavoriteNumber(name)
        assert.equal(retrieveFavoriteNumber.toString(), favoriteNumber.toString())
    })
})