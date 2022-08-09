import React from 'react';

function NavBarItem(props) {

    if (props.render) {
        return (
            <li className="nav-item">
                <a onClick={props.onClick} className="nav-link">{props.label}</a>
            </li>
        )
    }

}

export default NavBarItem;