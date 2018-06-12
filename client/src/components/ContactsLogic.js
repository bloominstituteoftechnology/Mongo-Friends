import React from 'react';
import axios from 'axios';
import ContactsDisplay from './ContactsDisplay';
let cstyle;
const separate = {
    margin: 10
};
const edit = {
    backgroundColor: 'beige'
}

class ContactsLogic extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            contactData: [],
            friend: {},
            edit: false


        }
    }
    componentDidMount = () => {
        // axios.get(`http://localhost:5000/api/friends/${this.props.id}/contactInfo`)
        // .then(res => {
        //     let frData = res.data;
        //     console.log('response.data of updateFriends, cdm: ', res.data)
        //     this.setState({ contactData: frData })
        // });
        this.fetchData()
    }
    fetchData = () => {
        axios.get(`http://localhost:5000/api/friends/${this.props.id}/contactInfo`)
            .then(res => {
                let frData = res.data;
                console.log('response.data of contactInfo, cdm: ', res.data)
                // {res.data.map((contact,i) => {return (<div key={contact + i}> <ContactsDisplay contact={contact} /> {console.log("hey, testing")} </div> ) })} 

                this.setState({ contactData: frData })
            });
        // this.callMap()
    }
    // callMap = () => {
    //    let result = this.state.contactData.map((contact,i) => {return (<div key={contact + i}> <ContactsDisplay contact={contact} /> {console.log("hey, testing")} </div> ) })
    //     console.log(...this.state.contactData)
    // }
    handleTextInput = (e) => {
        e.preventDefault()
        const state = this.state.friend
        state[e.target.name] = e.target.value;
        this.setState({ friend: state });
    };
    callToUpdate = () => {
        let { email, mobile_number, github_username } = this.state.friend;
        // console.log('the friend object is: ', friend)

        mobile_number = parseInt(mobile_number);
        axios.put(`http://localhost:5000/api/friends/${this.props.id}/contactInfo`, { email, mobile_number, github_username })
            .then(res => {
                this.setState({ friend: {} })
                this.props.fetchData();
                this.fetchData()

            })
            .catch((err) => {
                console.log(err);
            });

    };
    render() {
        // let data = this.state.contactData;
        // this.state.contactData.map((contact,i) => {return (<div key={contact + i}> <ContactsDisplay contact={contact} /> {console.log("hey, testing")} </div> ) })
        return (
            <div>


                {/* <h1>Hello</h1>
                <h5>{this.props.id}</h5> */}
                {console.log(this.state.contactData)}
                {<ContactsDisplay contact={{ ...this.state.contactData }} />}
                <h4 style={edit} >Edit friends </h4>
                <div style={separate}>
                <input
                    type="text"
                    onChange={this.handleTextInput}
                    placeholder="Email"
                    style={separate}
                    name="email"
                    value={this.state.friend.email}
                />
                <input
                    type="text"
                    onChange={this.handleTextInput}
                    // placeholder={email}
                    placeholder="Mobile Number"
                    style={separate}
                    name="mobile_number"
                    value={this.state.friend.mobile_number}
                />
                <input
                    type="text"
                    onChange={this.handleTextInput}
                    // placeholder={age}
                    placeholder="Github Username"
                    style={separate}
                    name="github_username"
                    value={this.state.friend.github_username}
                />
                <input
                    type="text"
                    onChange={this.handleTextInput}
                    // placeholder={age}
                    placeholder="Facebook Username"
                    style={separate}
                    name="facebook_username"
                    value={this.state.friend.facebook_username}
                />
                <input
                    type="text"
                    onChange={this.handleTextInput}
                    // placeholder={age}
                    placeholder="Twitter Handle"
                    style={separate}
                    name="twitter_handle"
                    value={this.state.friend.twitter_handle}
                />
                <button onClick={this.callToUpdate} >
                    Save Friend Contacts
							</button>
                            </div>
                {/* {this.state.contactData.map((contact,i) => {return (<div key={contact + i}> <ContactsDisplay contact={contact} /> </div> ) })} */}
            </div>
        )
    }

}

export default ContactsLogic