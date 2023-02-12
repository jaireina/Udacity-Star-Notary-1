const StarNotary = artifacts.require("StarNotary");

contract("StarNotary", async (accounts) => {
  owner = accounts[0];

  it("has correct name", async () => {
    const instance = await StarNotary.deployed();
    const starName = await instance.starName.call();
    assert.equal(starName, "Awesome Udacity Star");
  });

  it("can be claimed", async () => {
    const instance = await StarNotary.deployed();
    await instance.claimStar({ from: owner });
    assert.equal(await instance.starOwner.call(), owner);
  });

  it("can change owners", async () => {
    const secondOwner = accounts[1];
    const instance = await StarNotary.deployed();
    await instance.claimStar({ from: owner });
    assert.equal(await instance.starOwner.call(), owner);
    await instance.claimStar({ from: secondOwner });
    assert.equal(await instance.starOwner.call(), secondOwner);
  });

  it("can change name", async () => {
    const instance = await StarNotary.deployed();
    assert.equal(await instance.starName.call(), "Awesome Udacity Star");
    await instance.changeName("This is AWESOME");
    assert.equal(await instance.starName.call(), "This is AWESOME");
  });
});
