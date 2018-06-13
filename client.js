import React from 'react';
import ReactDom from 'react-dom';

import ReactRoot from './src/index';

const root = document.getElementById('root');

ReactDom.hydrate(<ReactRoot />, root);

// console.log('sdfsdfsd');
