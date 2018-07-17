import React, { Component } from 'react'
import { Text, View } from 'react-native'

export const itemsModel=(data)=>{
    console.log(data)
        let veg = []
         let NonVeg = []
        data.result.Data.forEach((item) => {
            if (item.type=="Veg") {
            veg.push(item)
            } else {
                NonVeg.push(item)
            }
        })
        return {veg, NonVeg}
}