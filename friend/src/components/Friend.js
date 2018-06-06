import React, { Component } from "react";
import axios from "axios";

class Friend extends Component {
    constructor(props) {
        super(props)
        this.state = {
            id: "",
            firstName: "",
            lastName: "",
            age: "",
            email: "",
            contactInfo: {},
            edit: false,
            success: false,
            failed: false,
            error: ""
        }
    }

    componentDidMount() {
        const id = this.props.match.params.id;
        this.fetchUser(id);
    }

    fetchUser = id => {
        axios.get(`http://localhost:5000/api/friends/${id}`)
            .then(response => {
                this.setState({
                    id: id,
                    firstName: response.data.firstName,
                    lastName: response.data.lastName,
                    age: response.data.age,
                    email: response.data.email,
                    contactInfo: response.data.contactInfo
                });
            })
            .catch(err => console.log(err));
    }

    handleEdit = () => {
        this.setState({ edit: true });
    }

    handleChange = (e) => {
        this.setState({ [e.target.id] : e.target.value});
    }

    handleSubmit = (e, id, update) => {
        e.preventDefault();
        axios.put(`http://localhost:5000/api/friends/${id}`, update)
            .then(response => {
                this.setState({ success: true });
            })
            .catch(error => {
                console.log(error);
                this.setState({ failed: true, error: error.message });
            });
    }

    render() {
        const { firstName, lastName, age, edit, id, success, failed, error } = this.state;
        const { email, twitter_handle } = this.state.contactInfo;
        return (
            <div>
                <div className="friend-card">
                    <div>
                        <h3>{firstName} {lastName}</h3>
                        <p>Age: {age}</p>
                        <h5 className="contact">Contact Info</h5>
                    </div>
                    <div>
                        <p>Email: {email}</p>
                        {twitter_handle ? 
                            <p>Twitter: <span className="twitter-handle">{twitter_handle}</span></p>  
                        : null}
                    </div>
                    <button onClick={() => this.handleEdit()}>Edit</button>
                    {edit ? (
                        <div className="friend-edit">
                            <form>
                                <label htmlFor="firstName">First Name</label>
                                <input type="text" id="firstName" name="firstName" defaultValue={firstName} onChange={(e) => this.handleChange(e)}/>
                                <label htmlFor="lastName">Last Name</label>
                                <input type="text" id="lastName" name="lastName" defaultValue={lastName} onChange={(e) => this.handleChange(e)}/>
                                <label htmlFor="email">Email</label>
                                <input type="text" id="email" name="email" defaultValue={email} onChange={(e) => this.handleChange(e)}/>
                                <label htmlFor="age">Age</label>
                                <input type="text" id="age" name="age" defaultValue={age} onChange={(e) => this.handleChange(e)}/>
                                <label htmlFor="twitter_handle">Twitter Handle</label>
                                <input type="text" id="twitter_handle" name="twitter_handle" defaultValue={twitter_handle} onChange={(e) => this.handleChange(e)}/>
                                <button onClick={(e) => this.handleSubmit(e, id, {firstName, lastName, age, email, twitter_handle})}>Save</button>
                            </form>
                            {success ? (
                                <div className="success">
                                    <h5>Information saved!</h5>
                                    <button onClick={() => this.setState({ success: false, edit: false })}>OK</button>
                                </div>
                            ) : (null)}
                            {failed ? (
                                <div className="failed">
                                    <h5>{error}</h5>
                                    <button onClick={() => this.setState({ failed: false })}>OK</button>
                                </div>
                            ) : (null)}
                        </div>
                    ) : (null)}
                </div>
            </div>    
        );
    }
}

export default Friend;