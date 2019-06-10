import * as moment from 'moment'
import React, { Component } from 'react';
import { render } from 'react-dom';
import { createUniqueIdentifier, removeDuplicateMessages, sortNewFirst, sortOldFirst } from './utils';
import './style.css';
import closeButton from './svgs/close-button.svg'
import upArrow from './svgs/arrow-up.svg'
import downArrow from './svgs/arrow-down.svg'
import data from './data.json';


const MessageHeader = props => (
  <React.Fragment>
    <div style={{display: "flex", marginBottom: "8px", width: "100%", alignItems: "baseline"}}>
      <div style={{fontSize: "20px", fontWeight: 700}}>Message { props.messageId }</div>
      <div style={{textDecoration: "italic", fontSize: "14px", paddingLeft: "16px"}}>by User { props.userId } ({ moment(props.sentAt).fromNow() })</div>
    </div>
    <hr />
  </React.Fragment>
)

class Message extends Component {
  render() {
    const message = this.props.message;
    return (
      <div style={{
        backgroundColor: "#d9edfc",
        borderRadius: "2px",
        margin: "4px auto",
        padding: "15px",
        overflow: "visible",
        paddingLeft: "30px",
        width: "400px",
        alignItems: "center",
        position: "relative",
      }}>
        <MessageHeader
          messageId={ message.uuid }
          sentAt={ message.sentAt }
          userId={ message.senderUuid }
        />
        <img
          onClick={ this.props.remove }
          style={{
            backgroundColor: "#ff6363",
            borderRadius: "20px",
            cursor: "pointer",
            height: "20px",
            position: "absolute",
            right: -5,
            top: -5,
            width: "20px",
          }}
          src={closeButton}
          alt={"Close Message"}
        />
        <p>{ message.content }</p>
      </div>
    )
  }
}


class Page extends Component {
  constructor(props) {
    super(props);
    const messages = props.messages ? sortNewFirst(props.messages) : [];
    this.state = {
      sortNewFirst: true,
      messages,
      displayMessageCount: 6,
    }
  }

  showMoreMessages = () => (
    this.setState(prevState => ({displayMessageCount: prevState.displayMessageCount + 5}))
  )

  toggleSort = () => {
    const nextNewFirst = !this.state.sortNewFirst
    this.setState(prevState => ({ sortNewFirst: nextNewFirst }))
    this.sortMessages(nextNewFirst);
  }

  sortMessages = newFirst => {
    const sortedMessages = [...this.state.messages];
    if (newFirst) {
      sortNewFirst(sortedMessages)
    } else {
      sortOldFirst(sortedMessages)
    };
    this.setState({ messages: sortedMessages });
  }

  removeMessage(messageIdentifier) {
    const messages = this.state.messages;
    const removalIndex = messages.findIndex(message => (
      messageIdentifier === createUniqueIdentifier(message)
    ))
    if (removalIndex === -1) {
      console.log(`Unable to find a message with identifier ${messageIdentifier}`)
    } else {
      messages.splice(removalIndex, 1);
    }
    this.setState(previousState => ({messages: messages,
                                     displayMessageCount: this.state.displayMessageCount - 1}));
  }

  render() {
    return (
      <div style={{ width: "50%", height: "100%", margin: "0 auto", textAlign: "inline-block" }}>
        <div style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
          <h1 style={{ textAlign: "center" }}>All Messages</h1>
          { this.state.sortNewFirst ?
            <img onClick={ this.toggleSort } style={{width: "20px", height: "20px", marginLeft: "10px"}} src={downArrow} alt="Toggle Sort" /> :
            <img onClick={ this.toggleSort } style={{width: "20px", height: "20px", marginLeft: "10px"}} src={upArrow} alt="Toggle Sort" />
          }
        </div>
        <div>
          { this.state.messages.slice(0, (this.state.displayMessageCount - 1)).map((message, index) => (
              <Message key={ index } remove={ () => this.removeMessage(createUniqueIdentifier(message)) } message={ message } />
          )) }
        </div>
        { this.state.displayMessageCount < this.state.messages.length ?
          <div
            onClick={ this.showMoreMessages }
            style={{
              backgroundColor: "#63d6f9",
              borderRadius: "3px",
              cursor: "pointer",
              margin: "10px auto",
              padding: "10px",
              textAlign: "center",
              width: "150px",
            }}
          >
            Show More Messages
          </div> :
          null
        }
      </div>
    )
  }
}


class App extends Component {
  render() {
    const messages = removeDuplicateMessages(data.messages)
    return <Page messages={ messages } />;
  }
}

render(<App />, document.getElementById('root'));
