import { ScrollView, StyleSheet, Text, View } from "react-native";
import React, { Fragment } from "react";
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

const Home = () => {
  const { data: productsData, loading } = useProducts();
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

  return (
    <SafeAreaView style={styles.wrapper}>
      <TopBar />
      <ScrollView>
        {loading && !productsData && <ProductsPlaceholder length={3} />}
        {!loading && productsData && (
          <Fragment>
            <Image
              style={{
                objectFit: "contain",
                width: "100%",
                height:220
              }}
              source={require("../../assets/images/big-image-card.png")}
            />
            {/* <ThemedText
              type="title"
              style={{ paddingVertical: 15, fontSize: 23 }}
            >
              Tech Gadgets
            </ThemedText>

            <PagerView
              style={{}}
              initialPage={0}
              pageMargin={20}
              offscreenPageLimit={2}
              useNext={true}
            >
              {groupProducts(productsData.items).map((group, index) => (
                <View style={{ flexDirection: "row", gap: 10 }} key={index}>
                  {group.map((product: Products) => (
                    <ProductCard product={product} key={product.id} />
                  ))}
                </View>
              ))}
            </PagerView> */}

            {Object.keys(groupped).reverse().map((group, index) => {
              if (groupProductsInTwos(groupped[group]).length == 0) {
                return;
              }
              return (
                <Fragment key={index}>
                  <ThemedText
                    type="title"
                    style={{
                      paddingVertical: 25,
                      fontSize: 23,
                      textTransform:"capitalize",
                      fontFamily: FONTS.Arvo.Regular,
                    }}
                  >
                    {group}
                  </ThemedText>

                  <PagerView
                    style={{}}
                    initialPage={0}
                    pageMargin={20}
                    offscreenPageLimit={2}
                    useNext={true}
                  >
                    {groupProductsInTwos(groupped[group]).reverse().map(
                      (group, index) => (
                        <View
                          style={{ flexDirection: "row", gap: 10 }}
                          key={index}
                        >
                          {group.map((product: Products) => (
                            <ProductCard product={product} key={product.id} />
                          ))}
                        </View>
                      )
                    )}
                  </PagerView>
                </Fragment>
              );
            })}
          </Fragment>
        )}
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

export default Home;

const styles = StyleSheet.create({
  wrapper: {
    marginHorizontal: 10,
    backgroundColor: "#FAFAFA",
  },
  sliderWrapper: {
    height: 500,
  },
});
