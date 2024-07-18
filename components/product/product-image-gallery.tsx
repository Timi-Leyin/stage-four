import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import getProductImage from "@/utils/get-product-image";
import { Products } from "@/interfaces/products";
import { primaryColor } from "@/constants/colors";

const ProductImageGallery = ({ product }: { product: Products }) => {
  const fallbackThumbnail = require("../../assets/images/placeholder.png");

  const [activeThumbnail, setActiveThumbnail] = useState(0);
  const thumbnail = product.photos[activeThumbnail];
  const imgSrc = thumbnail
    ? { uri: getProductImage(thumbnail.url) }
    : fallbackThumbnail;
  return (
    <View>
      <Image source={imgSrc} style={styles.imagePreview} />
      <View style={styles.thumbnailRow}>
        {product.photos.length > 1 &&
          product.photos.slice(0,4).map((photo, index) => (
            <TouchableOpacity onPress={()=> activeThumbnail != index && setActiveThumbnail(index)} key={index}>
              <Image
                source={{ uri: getProductImage(photo.url) }}
                style={[
                  styles.thumbnailImageSm,
                  activeThumbnail === index && styles.thumbnailImageActive,
                ]}
              />
            </TouchableOpacity>
          ))}
      </View>
    </View>
  );
};

export default ProductImageGallery;

const styles = StyleSheet.create({
  thumbnailImageSm: {
    height: 60,
    width: 60,
    borderRadius: 10,
  },
  thumbnailImageActive: {
    height: 60,
    width: 60,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: primaryColor,
  },
  thumbnailRow: {
    flexDirection: "row",
    gap: 10,
    marginTop: -20,
    justifyContent: "center",
  },
  imagePreview: {
    height: 280,
    // opacity: 0.6,
    width: "100%",
  },
});
