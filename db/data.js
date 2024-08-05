const db = {
  user: [
    {
      id: 1,
      nom: "John",
      prenom: "JohnPrincipal",
      role: "admin",
      password: "passer",
      telephone: 777777774,
      mail: "ss@gmail.com",
      vote:[
        {
        id:1,
        idVoteur:1,

        }
      ],
      post: [
        {
          id: 1,
          name: "Product 1",
          description: "Description 1",
          price: 10,
          quantity: 10,
          comment: [
            {
              id: 1,
              commenter: {
                id: 1,
                nom: "fall",
                prenom: "fall2",
                telephone: 777777777,
                mail: "fall@fall.com",
              },
            },
            {
              id: 2,
              commenter: {
                id: 1,
                nom: "diop",
                prenom: "diop2",
                telephone: 777777779,
                mail: "diop@fall.com",
              },
            },
          ],
          likeD:[
            {
                id: 1,
                type:"like",
                idLikerD:1
            },
            {
                id: 2,
                type:"dislike",
                idLikerD:2
            }
          ]
        },
        {
          id: 2,
          name: "Product 2",
          description: "Description 2",
          price: 20,
          quantity: 5,
          comment: [
            {
              id: 1,
              commenter: {
                id: 1,
                nom: "fall",
                prenom: "fall2",
                telephone: 777777777,
                mail: "fall@fall.com",
              },
            },
            {
              id: 2,
              commenter: {
                id: 1,
                nom: "diop",
                prenom: "diop2",
                telephone: 777777779,
                mail: "diop@fall.com",
              },
            },
          ],
        },
      ],
    },
  ],
};

export default db;
