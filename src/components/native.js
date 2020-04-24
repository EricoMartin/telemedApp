import React, { Component } from 'react'
import { View, WebView, StyleSheet }

from 'react-native'
const NativeView = () => {
   return (
      <View style = {styles.container}>
         <WebView
         source = {{ uri:
         'https://serene-knuth-9054a4.netlify.app/' }}
         />
      </View>
   )
}
export default NativeView;

const styles = StyleSheet.create({
   container: {
      height: 350,
   }
})