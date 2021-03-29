/*
 *@author: Lalit Yadav
 */

class SocketService {
  constructor() {
    // [{userId, socketId}]
    this.activeUsers = []
  }

  addActiveUser = (userId, socketId) => {
    console.log('new User: ', userId, socketId)
    let found = false;
    for (let i = 0; i < this.activeUsers.length; i++) {
      if (this.activeUsers[i].socketId === socketId) {
        this.activeUsers[i].userId = userId;
        found = true;
        break;
      }
    }
    if (!found) {
      console.log("Adding USER: \nuserId: " + userId + ", socketId: " + socketId);
      this.activeUsers.push({ userId: userId, socketId: socketId });
    }
  }

  removeActiveUser = (socketId) => {
    let i = this.activeUsers.length;
    while (i--) {
      if (this.activeUsers[i] && this.activeUsers[i].socketId === socketId) {
        this.activeUsers.splice(i, 1);
      }
    }
  }
}

module.exports =  new SocketService()

