import { View, Text } from "react-native";
import React from "react";
import { Star, Star1 } from "iconsax-react-native";

const ProductRating = ({ count = 3 }) => {
  const COLOR = "gold";
  return (
    <View style={{
        flexDirection:"row",
        gap:2,
        marginVertical:10,
        alignItems:"center"
    }}>
      {new Array(5).fill(null).map((_, index) => {
        return <Star1 size={20} variant={index>=count?"Broken":"Bold"} key={index} color={COLOR} />;
      })}
    </View>
  );
};

export default ProductRating;
