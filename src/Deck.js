import React, { Component } from "react";
import Card from "./Card";
import "./Deck.css";
import axios from "axios";
const API_BASE_URL = "https://deckofcardsapi.com/api/deck";

class Deck extends Component {
  constructor(props) {
    super(props);
    this.state = { deck: null, drawn: [] };
    this.getCard = this.getCard.bind(this);
  }
  async componentDidMount() {
    //whatever code that comes next in the componentDidmount has to wait for deck to get info from the api
    let deck = await axios.get(`${API_BASE_URL}/new/shuffle/`); //includes info about the response itself
    this.setState({ deck: deck.data }); //the state has now access to the deck_id and other props
  }
  async getCard() {
    let deck_id = this.state.deck.deck_id;
    try {
      //this requests  a new card
      // eslint-disable-next-line no-unused-vars
      let cardUrl = `${API_BASE_URL}${deck_id}/draw/`;
      let cardResponse = await axios.get(
        "https://deckofcardsapi.com/api/deck/7bwxz28k3c3s/draw/"
      );
      // set State using new card info from api
      if (!cardResponse.data.success) {
        //kama success aiko throw err;
        throw new Error("No cards remaining");
      }
      //the data that came back lets capture the card nfomation
      let card = cardResponse.data.cards[0];
      //lets now setState to update the drawn array
      this.setState((st) => ({
        //st is the old state
        drawn: [
          ...st.drawn,
          {
            id: card.code, //give us the code which is 6c
            image: card.image, //give us the image
            name: `${card.value} of ${card.suit}`, //6c of clubs which is the SUIT
          },
        ],
      }));
    } catch (err) {
      alert(err);
    }
  }
  render() {
    //lets map over the cards
    //lets iterate over the drawn card in the state
    //create a new card component for each one
    const cards = this.state.drawn.map((c) => (
      <Card key={c.id} name={c.name} image={c.image} />
    ));
    //after the first render , componentdidmount will be called
    return (
      <div>
        <h1 className="deck-title">🔥Card Dealer🔥</h1>
        <h2 className="deck-sub-title">💧A little Demo made with React💧</h2>
        <button className="but" onClick={this.getCard}>
          Get Card
        </button>
        <div className="deck-cardarea">{cards}</div>
      </div>
    );
  }
}

export default Deck;
