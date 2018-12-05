import React from 'react';
import {Link} from 'react-router-dom';

export default function createLink({innerRef, ...props}: any) {
    return <Link {...props}/>;
}