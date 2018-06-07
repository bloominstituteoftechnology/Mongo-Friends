import React from 'react';

const Friends = (props) => {
    const friend = props.contacts;
    return (        
        <div className="contacts">        
            <table>
                <tbody>
                <tr>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Age</th>
                    <th>email</th>
                </tr>
                <tr>
                <td> {friend.firstName} </td>
                <td> {friend.lastName} </td>
                <td> {friend.age} </td>
                <td> {friend.email} </td>
                </tr>
                </tbody>
            </table>            
        </div>
    )
}

export default Friends;