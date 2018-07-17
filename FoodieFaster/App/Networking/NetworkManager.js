import React, {Component} from 'react';
import {APIActions} from '../Actions/APIActions';
import {actionCreators} from '../Actions/ActionCreator';
import {create} from 'apisauce';
import {httpMethodes, headers} from '../Constants/Constants';
import {StyleSheet, Text, View} from 'react-native';

const baseApi = create ({
  baseURL: 'http://192.168.1.206:4004/',
  timeout: 30000,
});

export const NetworkManager = {
  request: (url, httpMethode, parameters) => {
    switch (httpMethode) {
      case httpMethodes.get:
        return baseApi
          .get (url)
          .then (response => {
            return response;
          })
          .catch (error => {
            console.log (error);
          });
      case httpMethodes.post:
        return baseApi
          .post (url, parameters, headers)
          .then (response => {
            return response;
          })
          .catch (error => {
            console.log (error);
          });
      case httpMethodes.put:
        return baseApi
          .put (url, parameters, headers)
          .then (response => {
            return response;
          })
          .catch (error => {
            console.log (error);
          });
      case httpMethodes.delete:
        return baseApi
          .delete (url, parameters, headers)
          .then (response => {
            return response;
          })
          .catch (error => {
            console.log (error);
          });
    }
  },
};
