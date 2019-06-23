import React from 'react';

import Card from "./component/carCards/card";
import images from "./images.json"
import './App.css';


class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      randomImages: [],
      clickedArr: [],
      currentScore: 0,
      topScore: 0,
      images: images
    };
  }
  randomizeImg = (images) => {
    let array = images.slice();
    this.setState({
      images: array
    });
    var currentIndex = array.length, temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
    return array;
  }
  componentDidMount() {
    console.log(images);
    let randArr = this.randomizeImg(images);
    console.log(randArr);
    this.setState({
      randomImages: randArr,
    })
    // console.log(this.state.randomImages);
  }

  clickPicture = id => {


    // if clicked an image already clicked set this.state.score = 0; empty clickeadArray, end of if block
    if (this.state.clickedArr.includes(id)) {
      this.setState({ currentScore: 0, clickedArray: [], message: "That car has already been clicked" });

      var randomArray = this.randomizeImg(images);

      this.setState({
        randomImages: randomArray,
      })
      this.setState({
        clickedArr: []
      })
    }
    else {

      this.setState({
        clickedArr: this.state.clickedArr.concat([id]),
        currentScore: this.state.currentScore + 1,
        message: "Correct",

      });

      var newArray = this.randomizeImg(images);

      this.setState({
        randomImages: newArray,
      })
    }
    // set topscore = score if score>topscore.
    if (this.state.currentScore > this.state.topScore) {
      this.setState({ topScore: this.state.currentScore });
    }
  }

  addImages = () => {
    let imgSet = this.state.randomImages.map((img) => {
      console.log(img)
      return (<Card
        clickPicture={this.clickPicture}
        image={img.img}
        name={img.name}
        key={img.id}
        id={img.id}
      />);
    });
    return imgSet;
  }

  render() {

    return (
      <div>

        <div className="jumbotron jumbotron-fluid">
          <div className="container">
            <h1 className="display-4">Clicky Game</h1>
            <p className="lead">Click each picture only once. See how high your score can get with out clicking the same picture twice.</p>
            <div>
              <p>Score: {this.state.currentScore}      Highscore: {this.state.topScore} </p>
            </div>
          </div>
        </div>
        <div className="container">
          <div >
            <div className="col">
              <div className="row">
                {this.state.randomImages.map((img) => {
                  // console.log(img)
                  return (<Card id={img.id} key={img.id} name={img.name} image={img.image} clickPicture={this.clickPicture} />);
                })
                }
              </div>
            </div>
          </div>
        </div>
      </div>

    );
  }

}

export default App;
