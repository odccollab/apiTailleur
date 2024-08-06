import express from 'express';
import bodyParser from 'body-parser';
import connectDB from './db/mongodb.js';
import postRoute from './router/PostRoute.js';
import userRoute from './router/UserRoute.js';
import dotenv from 'dotenv';

dotenv.config();
const app = express();
app.use(bodyParser.json());
connectDB;

app.use(express.json());
// app.use("/posts",postRoute);
app.use("/users",userRoute);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});


// // Get all products
// app.get('/models', (req, res) => {
//  //
// try {
// res.json(Post.getAll());

  
// } catch (error) {
//     throw new Error(error);
// }

// });

// app.get('/models/:id', (req, res) => {
//   const modelId = parseInt(req.params.id, 10); // Récupère et convertit l'ID en nombre

//   try {
//     res.json(Post.getUserPosts(modelId));
    
      
//     } catch (error) {
//         throw new Error(error);
//     }

// });

// // app.post('/models', (req, res) => {
// //  //

// // });

// app.delete('/models/:id', (req, res) => {
//  //

// });

// app.put('/models/:id', (req, res) => {
//   //
 
//  });

//  app.patch('/models/:id', (req, res) => {
//   //
 
//  });

//  ////// PROFILE


//  app.get('/profiles', (req, res) => {
//   try {
//     let post =Post.addLike(1, 1, {
//       id: 3,
//       type: "like",
//       idLikerD: 3
//     });
//     res.json(post);
//     // Post.updateUser(1, { nom: "JohnUpdated", prenom: "JohnPrincipalUpdated", telephone: 123456789 });
    
//     // Post.addComment(1, 1, {
//     //   id: 3,
//     //   commenter: {
//     //     id: 2,
//     //     nom: "newCommenter",
//     //     prenom: "newCommenterPrenom",
//     //     telephone: 888888888,
//     //     mail: "new@commenter.com",
//     //   },
//     // });
    
    
//     // return(JSON.stringify(db, null, 2));
//   } catch (error) {
//     console.error(error.message);
//   }
  
  
// });
 
//  app.get('/profiles/:id', (req, res) => {
//   //
 
//  });
 
//  app.post('/profiles', (req, res) => {
//   //
 
//  });
 
//  app.delete('/profiles/:id', (req, res) => {
//   //
 
//  });
 
//  app.put('/profiles/:id', (req, res) => {
//    //
  
//   });
 
//   app.patch('/profiles/:id', (req, res) => {
//    //
  
//   });

//   /// COMMENT
//   app.get('/post/comment/:userId/:postId', (req, res) => {
//     let { userId, postId } = req.params;
    
//     try {
//       res.json(Post.getComment(parseInt(userId),parseInt(postId)));
//     } catch (error) {
//       throw new Error("error");
//     }
//     try {
//       res.json(req.params);
//     } catch (error) {
//       throw new Error("error");
//     }
   
//    });
   
//    app.get('/post/:id/comment/:id', (req, res) => {
//     //
   
//    });
   
//    app.post('/post/:id/comment', (req, res) => {
//     //
   
//    });
   
//    app.delete('/post/:id/comment/:id', (req, res) => {
//     //
   
//    });
   
//    app.put('/post/:id/comment/:id', (req, res) => {
//      //
    
//     });
   
//     app.patch('/profiles/:id', (req, res) => {
//      //
    
//     });
    

  

// app.listen(4000);