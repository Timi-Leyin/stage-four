import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { Fragment, useState } from "react";
import { ProductsPlaceholder } from "@/components/loading-placeholders/product-placeholder";
import { SafeAreaView } from "react-native-safe-area-context";
import { useProducts } from "@/context/products-context";
import { ENV } from "@/constants/env";
import { ThemedText } from "@/components/themed/themed-text";
import ProductCard from "@/components/product/product-card";
import TopBar from "@/components/navigation/top-bar";
import { FONTS } from "@/constants/fonts";
import Swiper from "react-native-swiper";
import PagerView from "react-native-pager-view";
import { Dimensions } from "react-native";
import Carousel from "react-native-reanimated-carousel";
import { Image } from "react-native";
import { Products } from "@/interfaces/products";
import { SearchNormal } from "iconsax-react-native";
import IsEmpty from "@/components/common/is-empty";
const Search = () => {
  const { data: productsData, loading } = useProducts();
  const [searchQuery, setSearchQuery] = useState("");
  const groupProductsInTwos = (products: Products[]) => {
    const grouped = [];
    for (let i = 0; i < products.length; i += 2) {
      grouped.push(products.slice(i, i + 2));
    }
    return grouped;
  };

  function groupProducts(products: Products[]) {
    const groupedProducts: any = {
      "Latest Products": [],
    };

    products.forEach((product) => {
      if (product.categories && product.categories.length > 0) {
        product.categories.forEach((category) => {
          const categoryName = category.name;
          if (!groupedProducts[categoryName]) {
            groupedProducts[categoryName] = [];
          }
          groupedProducts[categoryName].push(product);
        });
      } else {
        groupedProducts["Latest Products"].push(product);
      }
    });

    return groupedProducts;
  }

  const groupped = groupProducts(productsData?.items || []);
  const products = productsData
    ? searchQuery.length > 0
      ? productsData.items.filter((pro) =>
          pro.name.toLowerCase().includes(searchQuery.toLowerCase())
        )
      : []
    : [];

  return (
    <SafeAreaView style={styles.wrapper}>
      <TopBar />
      <ScrollView>
        {/* {loading && !productsData && <ProductsPlaceholder length={3} />} */}
        {!loading && productsData && (
          <Fragment>
            <View>
              {/* <ThemedText
                style={{
                  // marginTop: 16,
                  fontFamily: FONTS.Arvo.Regular,
                }}
                type="title"
              >
                Search
              </ThemedText> */}
              <TextInput
                value={searchQuery}
                onChangeText={(e) => setSearchQuery(e)}
                placeholder="Search for products..."
                style={{
                  borderColor: "rgba(0,0,0,0.3)",
                  padding: 15,
                  borderRadius: 10,
                  fontFamily: FONTS.Arvo.Regular,

                  borderWidth: 1,
                  marginTop: 5,
                }}
              />
              <TouchableOpacity>
                <SearchNormal />
              </TouchableOpacity>
            </View>
            <ThemedText
              style={{
                marginBottom: 10,
                fontFamily: FONTS.Arvo.Regular,
              }}
              type="title"
            >
              Search Results
            </ThemedText>
          </Fragment>
        )}

        <View>
          {!searchQuery || products.length == 0 ? (
            <IsEmpty>No Product Found</IsEmpty>
          ) : (
            <View>
              {products.map((pro) => {
                return <ProductCard width={"100%"} product={pro} />;
              })}
            </View>
          )}
        </View>
      </ScrollView>
      <View
        style={{
          height: 90,
          marginTop: "auto",
        }}
      />
    </SafeAreaView>
  );
};

export default Search;

const styles = StyleSheet.create({
  wrapper: {
    marginHorizontal: 10,
    height: "100%",
    backgroundColor: "#FAFAFA",
  },
  sliderWrapper: {
    height: 500,
  },
});
