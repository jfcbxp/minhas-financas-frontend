import React from 'react';
import { Link } from 'react-router-dom'

function NavBarItem(props) {

    if (props.render) {
        return (
            <li className="nav-item">
                <Link to={props.to} onClick={props.click} className="nav-link">{props.label} </Link>
            </li>
        )
    }

}

export default NavBarItem;