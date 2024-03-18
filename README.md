# social-network-api
An api to connect to a mongo database and store data using mongoose ODM.

---

## Technology Used 

| Technology Used         | Resource URL           | 
| ------------- |:-------------:| 

| JavaScript     | [https://developer.mozilla.org/en-US/docs/Web/JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript)      |   
| Git | [https://git-scm.com/](https://git-scm.com/)     |    
| Node.js | [https://nodejs.org/](https://nodejs.org/)     |
| NPM | [https://www.npmjs.com](https://www.npmjs.com)   |
| MongoDB | [https://www.mongodb.com/](https://www.mongodb.com/)   |

---

## Badges
![Static Badge](https://img.shields.io/badge/JavaScript-323330?style=for-the-badge&logo=javascript&logoColor=F7DF1E)
![Static Badge](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)
![Static Badge](https://img.shields.io/badge/Express.js-404D59?style=for-the-badge)
![Static Badge](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)
![Static Badge](https://img.shields.io/badge/License-MIT_License-blue)

---

## Description

[Visit the Github repository](https://github.com/Jeffreydne/social-network-api)

[Watch the screencastify video explaining how to use the app](https://app.screencastify.com/v3/watch/Kw9nxA243GuHoJ96qwSR)

This application allows a user to interact with the Mongo Database to store, get, delete and modify information, that is related to a social networking site. The user will be able to do CRUD operations on 2 collections: users and thoughts. Users will also be able to create friends lists and to add reactions to the thoughts of their friends. Virtuals will be used to display the number of friends when user data is displayed, and to display the number of reactions per thought when thoughts are displayed. 

---

## Instalation

This application requires the npm modules express and mongoose. You will need to type npm install in the command line before running this program for the 1st time. 


---

## Code Example

The three code examples below show how mongoose is used to implement various asopects of website funtionality.

The following javascript snippet shows how a new thought is created using an app.post fetch request, and including various mongoose methods: 

```JS
// 1st find the user with whom the thought will be associated, using the mongoose findOne method. The username & thoughtText will be provided in the body of the request. 

app.post('/newThought', async (req,res) => {
    let user = await User.findOne({username: req.body.username});
    if(user) {
        console.log(user);
    const newThought = await Thought.create({
        thoughtText: req.body.thoughtText,
        username: req.body.username,
    })
    // push the user provided thought into the thoughts array associated with the user, then save
    user.thoughts.push(newThought);
    await user.save();
    res.status(200).json(newThought);
    } else {
        console.log(`Error: line 102 in server.js`);
        res.status(404).json({
            message: 'Something went wrong, User not found'
        });
    }
});
```
The following line of javascript uses the new Schema constructor to instantiate an instance of both the reactionSchema and the thoughtSchema. The reactionSchema becomes part of the thoughtSchema as it is called in the array of reactions which are part of the thought schema.
```JS
// schema instance for reaction subdocument for thoughts
const reactionSchema = new Schema({
    reactionId: { type: Schema.Types.ObjectId, 
    default: mongoose.Types.ObjectId,
    },
    reactionBody: { type: String, required: true, maxLength: 280 },
    username: { type: String, required: true },
    createdOn: { type: Date, default: Date.now },
});

// schema for thoughts document
const thoughtSchema = new Schema({
    thoughtText: { type: String, required: true, minLength: 1, maxLength: 280 }, 
    createdOn: { type: Date, default: Date.now },
    username: { type: String, required: true }, 
    // notice reactionSchema being used to define the contents of the reactions array. 
    reactions: [reactionSchema],
}, 

```
The following code is a continuation of the above code. It shows how a virtual was created to display the number of reactions to each thought whenever thought data is requested. First, at the end of the thoughts schema, the virtuals syntax is added. The closing }); (after the id: false) closes the thoughtSchema, which is opened with "new Schema({" for the thoughtSchema in the prior snippet, just above this one. Then the virtual method is used, to add "reactionCount" to the thought schema so that it can be displayed along with the rest of the thought data, when a thought or thoughts are requested. 


```JS
{
    toJSON: {
        virtuals: true,
    },
    id: false, 
});
// create virtual property of reaction count
thoughtSchema.virtual('reactionCount').get(function () {
    return this.reactions.length;
});
```



## Usage

This website is designed to allow a user to view the users, and user thoughts, in a social network site. They can also create a friends list and add reactions to their friend's thoughts. Finally, they can perform CRUD functions for each of these areas of the site. 



---

## Learning Points

This project was built from scratch. 

* Mongoose is used to create a data base and set up the required document objects in two collections. 

* In this project these collections are built manually using MongoDB Compass. In an actual social networking APP the collections would be built as the users interact with the database.

* The use of mongoose is required and instantiated into the variable db at the beginning of the server.js file. 

* Reactions is a subdocument to the Thoughts document. Reactions are added in their own POST fetch request, but are displayed along with the thought they are connected to when a GET fetch request is made for one or all thoughts. 

*  Virtuals are used to present the number of friends that each user has, and also to present the number of reactions each thought has, when ever the user or thought data is fetched with a get.
   
---

## Author Info

### Jeffrey Nelson


* [Portfolio](https://jeffreydne.github.io/Jeff-Nelson-Portfolio/)
* [LinkedIn](https://www.linkedin.com/in/jeffrey-nelson13/)
* [Github](https://github.com/Jeffreydne)

---
## Credits

  This application was built from scratch. I have used many of the strategies taught by the excellent instructers at the UC Berkeley Extension Full Stack coding bootcamp. In this case I used variations of methods taught in unit 18, which deals with mongoDB and mongoose npm.  Finally, I copied open source badges from Vedant Chainani at the website https://dev.to/envoy_/150-badges-for-github-pnk#contents 
 
---