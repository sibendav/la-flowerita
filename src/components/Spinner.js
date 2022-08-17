import React, { Component } from 'react';
import { render } from 'react-dom';
import {ThreeDots} from 'react-loader-spinner'
import { usePromiseTracker, trackPromise } from "react-promise-tracker"; 
const LoadingIndicator = props => {
  const { promiseInProgress } = usePromiseTracker();

  return promiseInProgress && 
    <div
      style={{
        width: "100%",
        height: "100",
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
      }}
    >
      <ThreeDots type="ThreeDots" color="rgb(255, 218, 185)" height="100" width="100" />
   </div>
};

export default LoadingIndicator;