import _ from 'lodash';
import '../index.html';
import '../styles/index.css';

function component() {
    const element = document.createElement('div');

    // Lodash, currently included via a script, is required for this line to work
    element.innerHTML = _.join(['Hello', 'webpack'], ' ');

    return element;
}

console.log('111')
document.body.appendChild(component());