import React from 'react';
import './Friends.css';

const Friends = (props) => {
    const friend = props.contacts;
    return (
        <div className="Table">
            <table>
                <tbody>
                <tr>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Age</th>
                </tr>
                <tr>
                <td> {friend.firstName} </td>
                <td> {friend.lastName} </td>
                <td> {friend.age} </td>
                </tr>
                </tbody>
            </table>
        </div>
    )
}

export default Friends;