import React from 'react';
import { hydrateRoot } from 'react-dom/client';
import HomePage from '../components/HomePage';

// 客户端水合
const container = document.getElementById('root');
if (container) {
  hydrateRoot(container, <HomePage />);
} else {
  console.error('Root container not found');
}