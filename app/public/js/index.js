const app = { //const is faster, is not going to change
    data() {
      return { //initializing randomPerson object with default data in case randomUser API is down
        "randomPerson":{
            "firstName":"Brice",
            "lastName":"Wyne",
            "email":"bwyne@bwyne.com",
            "age":"42",
            "dateOfBirth":"10-18-1978",
            "country":"USA",
            "birthday":"",
        },
        "imgURL":"img/Batman.jpg", //default image URL
        offerForm:{},
        selectedOffer:{},
        books:{},
        bookForm:{},
        refereeForm:{},
        gameForm:{},
        referees:{},
        games:{},
        selectedBook:null,
        selectedGame:null,
        assignForm:{}
    }
    },

    computed: { //we need to do some extra manipulation on the data
        prettyBirthday()
        {
            return dayjs(this.randomPerson.dateOfBirth).format('D MMM YYYY');
        }
    },

    methods: {
        fetchUserData()
        {
            fetch('https://randomuser.me/api/')
            .then(response => response.json()) 
            
            .then(responseJSON => {
                var fetchedUserDetails = responseJSON.results[0];
                this.randomPerson.firstName=fetchedUserDetails.name.first;
                this.randomPerson.lastName=fetchedUserDetails.name.last;
                this.randomPerson.email=fetchedUserDetails.email;
                this.randomPerson.age=fetchedUserDetails.dob.age;
                this.randomPerson.dateOfBirth=fetchedUserDetails.dob.date;
                this.randomPerson.country=fetchedUserDetails.location.country;
                this.imgURL=fetchedUserDetails.picture.large;
                console.log(this.randomPerson);
                //console.log(this.randomPerson.image_URL_medium);
            }) //anon function, can use multiple statements

            .catch((err) => {
                console.error(err);
            })

        },
        fetchBookData()
        {
            fetch('/api/book/')
            .then( response => response.json() )
            .then( (responseJson) => {
                console.log(responseJson);
                this.books = responseJson;
            })
            .catch( (err) => {
                console.error(err);
            })
        },
        fetchRefereeData()
        {
            fetch('/api/referee/')
            .then( response => response.json() )
            .then( (responseJson) => {
                console.log(responseJson);
                this.referees = responseJson;
            })
            .catch( (err) => {
                console.error(err);
            })
        },
        fetchGameData()
        {
            fetch('/api/game/')
            .then( response => response.json() )
            .then( (responseJson) => {
                console.log(responseJson);
                this.games = responseJson;
            })
            .catch( (err) => {
                console.error(err);
            })
        },

        deleteBook(book) {
            if (!confirm("Are you sure you want to delete "+book.title+"?")) {
              return;
            }
            console.log("Delete!", book);
    
            fetch('api/book/delete.php', {
                method:'POST',
                body: JSON.stringify(book),
                headers: {
                  "Content-Type": "application/json; charset=utf-8"
                }
              })
              .then( response => response.json() )
              .then( json => {
                console.log("Returned from post:", json);
                // TODO: test a result was returned!
                this.offers = json;
    
                // reset the form
                this.resetRefereeForm();
                this.fetchBookData();
              });
          },

          deleteReferee(referee) {
            if (!confirm("Are you sure you want to delete "+referee.title+"?")) {
              return;
            }
            console.log("Delete!", referee);
    
            fetch('api/referee/delete.php', {
                method:'POST',
                body: JSON.stringify(referee),
                headers: {
                  "Content-Type": "application/json; charset=utf-8"
                }
              })
              .then( response => response.json() )
              .then( json => {
                console.log("Returned from post:", json);
                // TODO: test a result was returned!
                this.referees = json;
    
                // reset the form
                this.resetRefereeForm();
                this.fetchRefereeData();
              });
          },

          deleteGame(game) {
            if (!confirm("Are you sure you want to delete "+game.gameLocation+"?")) {
              return;
            }
            console.log("Delete!", game);
    
            fetch('api/game/delete.php', {
                method:'POST',
                body: JSON.stringify(game),
                headers: {
                  "Content-Type": "application/json; charset=utf-8"
                }
              })
              .then( response => response.json() )
              .then( json => {
                console.log("Returned from post:", json);
                // TODO: test a result was returned!
                this.games = json;
    
                // reset the form
                this.resetGameForm();
                this.fetchGameData();
              });
          },

        postNewOffer(evt)
        {
            console.log("Posted!");
            //alert("created");
            fetch('api/book/create.php', {
                method:'POST',
                body: JSON.stringify(this.bookForm),
                headers: {
                    "Content-Type": "application/json; charset=utf-8"
                }
            })
            .then(response => response.json() )
            .then(json => {
                console.log("Returned from post");
                this.fetchBookData();
            });
            this.resetRefereeForm();
        },

        postNewReferee(evt)
        {
            console.log("Referee Added!");
            //alert("created");
            fetch('api/referee/create.php', {
                method:'POST',
                body: JSON.stringify(this.refereeForm),
                headers: {
                    "Content-Type": "application/json; charset=utf-8"
                }
            })
            .then(response => response.json() )
            .then(json => {
                console.log("Returned from post");
                this.fetchRefereeData();
            });
            this.resetRefereeForm();
        },

        postNewGame(evt)
        {
            console.log("Game Added!");
            //alert("created");
            fetch('api/game/create.php', {
                method:'POST',
                body: JSON.stringify(this.gameForm),
                headers: {
                    "Content-Type": "application/json; charset=utf-8"
                }
            })
            .then(response => response.json() )
            .then(json => {
                console.log("Returned from post");
                this.fetchGameData();
            });
            this.resetGameForm();
        },

        prettyDollar(n) {
            const d = new Intl.NumberFormat("en-US").format(n);
            return "$ " + d;
        },
        
    editBook(evt) {
        //this.offerForm.studentId = this.selectedStudent.id;
        // this.offerForm.id = this.selectedOffer.id;

        console.log("Updating!", this.bookForm);

        fetch('api/book/update.php', {
            method: 'POST',
            body: JSON.stringify(this.bookForm),
            headers: {
                "Content-Type": "application/json; charset=utf-8"
            }
        })
            .then(response => response.json())
            .then(json => {
                console.log("Returned from post:", json);
                // TODO: test a result was returned!
                this.books = json;

                // reset the form
                this.resetRefereeForm();
            });
    },

    editReferee(evt) {
        console.log("Updating!", this.refereeForm);

        fetch('api/referee/update.php', {
            method: 'POST',
            body: JSON.stringify(this.refereeForm),
            headers: {
                "Content-Type": "application/json; charset=utf-8"
            }
        })
            .then(response => response.json())
            .then(json => {
                console.log("Returned from post:", json);
                // TODO: test a result was returned!
                this.referees = json;
                // reset the form
                this.resetRefereeForm();
            });
    },

    editGame(evt) {
        console.log("Updating!", this.gameForm);

        fetch('api/game/update.php', {
            method: 'POST',
            body: JSON.stringify(this.gameForm),
            headers: {
                "Content-Type": "application/json; charset=utf-8"
            }
        })
            .then(response => response.json())
            .then(json => {
                console.log("Returned from post:", json);
                // TODO: test a result was returned!
                this.games = json;
                // reset the form
                this.resetGameForm();
            });
    },

    resetRefereeForm() {
        this.refereeForm = {};
    },
    resetGameForm() {
        this.gameForm = {};
    },
    selectRefereeToEdit(referee) {

        this.selectedBook = referee;
        this.refereeForm = Object.assign({}, referee);
    },
    selectGameToEdit(game) {

        this.selectedGame = game;
        this.gameForm = Object.assign({}, game);
    },
    
    postBook(evt) {
        if (this.selectedBook === null) {
            this.postNewReferee(evt);
        } else {
            this.editReferee(evt);
            this.selectedBook = null;
        }
    },
    postGame(evt) {
        if (this.selectedGame === null) {
            this.postNewGame(evt);
        } else {
            this.editGame(evt);
            this.selectedGame = null;
        }
    },
    postAssign()
    {
        
    }
},
    created() //event hook
    {
        //this.fetchUserData();
        //this.fetchBookData();
        this.fetchRefereeData();
        this.fetchGameData();
    }
  }
console.log("Creating and Mounting Vue Application");
Vue.createApp(app).mount('#VueApp_InfoDisplay'); 