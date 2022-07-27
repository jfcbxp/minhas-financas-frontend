import React from 'react';

function NavBar(props){
    return (
        <div className="form-group">
        <label htmlFor={props.htmlFor}>{props.label}</label>
        {props.children}
    </div>
    )
}

export default NavBar;