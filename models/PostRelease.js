import db from "../db/data.js";
import Model from "./Model.js";
import bcrypt from "bcryptjs"

export default class Post extends Model {
  static getUser(id) {
    const user = db.user.find((user) => user.id == id);
    if (user) {
      return user;
    } else {
      return null;
    }
  }
  static getUsers() {
    const user = db.user;
    if (user) {
      return user;
    } else {
      return null;
    }
  }
  static getAll() {
    let allPosts = [];
    db.user.forEach(function (user) {
      user.post.forEach(function (pos) {
        let postWithUser = {
          pos,
          user: {
            id: user.id,
            name: user.nom,
            prenom: user.prenom,
            role: user.role,
          },
        };
        allPosts.push(postWithUser);
      });
    });
    return allPosts;
  }
  static findUserBy(field,value){
    return db.user.find((user) => user[field] === value);
  }
  static getUserPosts(id) {
    const user = db.user.find((user) => user.id === id);
    if (user) {
      return user.post;
    } else {
      return null;
    }
  }
  static getComment(userId, postId) {
    const user = db.user.find((user) => user.id === userId);
    if (user) {
      const post = user.post.find((post) => post.id === postId);

      if (post) {
        return post.comment;
      } else {
        return "no such post";
      }
    } else {
      return "no such user";
    }
  }
static compPass(password, passwordv){
    return bcrypt.compareSync(password, passwordv);
  }



  static getLike(userId, postId) {
    const user = db.user.find((user) => user.id === userId);
    if (user) {
      const post = user.post.find((post) => post.id === postId);
      if (post) {
        return post.likeD;
      } else {
        throw new Error("Post not found");
      }
    } else {
      throw new Error("User not found");
    }
  }

  static getNumberLike(userId, postId) {
    const likes = this.getLike(userId, postId);
    return likes.length;
  }

  static getById(id) {
    return db.find((model) => model.id === parseInt(id));
  }
  static hashpassword(password){
    //hash with salt

    return bcrypt.hashSync(password, 10);
  }

  static create(nom, prenom, mail, telephone, password) {
    password = this.hashpassword(password);
    const newModel = {
      id: this.getMaxId(db.user),
      nom,
      prenom,
      mail,
      telephone,
      password,
      follower: [],
      post: [],
      vote: [],
      likeD: [],
    };
    db.user.push(newModel);
    return newModel;
  }

  static update(name, description, price, quantity) {
    this.name = name;
    this.description = description;
    this.price = price;
    this.quantity = quantity;
  }
  delete() {
    db.splice(db.indexOf(this), 1);
  }

  ////
  static updateUser(userId, newData) {
    const user = db.user.find((user) => user.id === userId);
    if (user) {
      Object.assign(user, newData);
    } else {
      throw new Error("User not found");
    }
  }

  static addComment(userId, postId, newComment) {
    const user = db.user.find((user) => user.id === userId);
    if (user) {
      const post = user.post.find((post) => post.id === postId);
      if (post) {
        let idLike = this.getMaxId(post.comment);
        newComment.id = idLike + 1;
        post.comment.push(newComment);
      } else {
        throw new Error("Post not found");
      }
    } else {
      throw new Error("User not found");
    }
  }

  static addLike(userId, postId, newLike) {
    const user = db.user.find((user) => user.id === userId);
    if (user) {
      const post = user.post.find((post) => post.id === postId);

      if (post) {
        let idLike = this.getMaxId(post.likeD);
        newLike.id = idLike + 1;
        post.likeD.push(newLike);
        return post;
      } else {
        throw new Error("Post not found");
      }
    } else {
      throw new Error("User not found");
    }
  }
  static getOneUserPost(userId, postId) {
    const user = db.user.find((user) => user.id === userId);
    if (user) {
      const post = user.post.find((post) => post.id === postId);
      if (post) {
        return post;
      } else {
        throw new Error("Post not found");
      }
    } else {
      throw new Error("User not found");
    }
  }
}
