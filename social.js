const { use } = require("chai");

// Implement the SocialNetwork class here
class SocialNetwork {

  constructor() {
    this.users = {};
    this.follows = {};
    this.currentID = 0;
  }

  addUser(name) {
    // Your code here
    this.currentID++;

    const newUser = {
      name: name,
      id: this.currentID,
    }
    
    this.users[this.currentID] = newUser;

    this.follows[this.currentID] = new Set();

    return this.currentID;
  }

  getUser(userID) {
    // Your code here
    return this.users[userID] || null;
  }

  follow(userID1, userID2) {
    // Your code here
    if (this.users[userID1] && this.users[userID2]) {
      const user = this.getUser(userID1);
      this.follows[user.id].add(userID2);

      return true;
    } else {
      return false;
    }
  }

  getFollows(userID) {
    // Your code here
    return this.follows[userID];
  }

  getFollowers(userID) {
    // Your code here
    const followers = new Set();

    for (let id in this.follows) {
      const follower = this.follows[id];

      if (follower.has(userID)) {
        followers.add(parseInt(id));
      }
    }

    return followers;
  }

  getRecommendedFollows(userID, degrees) {
    // Your code here
    const queue = [[userID]];
    const visited = new Set([userID]);
    const recommendedFollows = [];

    while (queue.length > 0) {
      const currentPath = queue.shift();
      const currentFollows = this.getFollows(currentPath[currentPath.length - 1]);

      for (let follow of currentFollows) {
        const path = [...currentPath, follow];
        
        if (degrees + 2 < path.length) {
          return recommendedFollows;
        }

        if (!(this.getFollows(userID).has(follow) || follow === userID)) {
          recommendedFollows.push(follow);
        }

        if (!visited.has(follow)) {
          visited.add(follow);
          queue.push(path);
        }
      }
    }

    return recommendedFollows;
  }
}

module.exports = SocialNetwork;