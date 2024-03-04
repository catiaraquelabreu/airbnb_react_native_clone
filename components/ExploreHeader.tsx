import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  Platform,
} from "react-native";
import React, { ProfilerProps, useRef, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { StyleSheet } from "react-native";
import { Link } from "expo-router";
import Colors from "@/constants/Colors";
import * as Haptics from "expo-haptics";

const categories = [
  {
    name: "Tiny homes",
    icon: "home",
  },
  {
    name: "Cabins",
    icon: "house-siding",
  },
  {
    name: "Trending",
    icon: "local-fire-department",
  },
  {
    name: "Play",
    icon: "videogame-asset",
  },
  {
    name: "City",
    icon: "apartment",
  },
  {
    name: "Beachfront",
    icon: "beach-access",
  },
  {
    name: "Countryside",
    icon: "nature-people",
  },
];

interface Props {
  onCategoryChanged: (category: string) => void;
}

const ExploreHeader = ({ onCategoryChanged }: Props) => {
  const scrollRef = useRef<ScrollView>(null);
  const itemsRef = useRef<Array<TouchableOpacity | null>>([]);
  const [activeIndex, setActiveIndex] = useState(0);

  const selectCategory = (index: number) => {
    const selected = itemsRef.current[index];
    setActiveIndex(index);
    selected?.measure((x) => {
      scrollRef.current?.scrollTo({ x: x - 16, y: 0, animated: true });
    });
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    onCategoryChanged(categories[index].name);
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        paddingTop: Platform.OS === "ios" ? 0 : 32,

        backgroundColor: "#fff",
      }}>
      <View style={styles.container}>
        <View style={styles.actionRow}>
          <Link href={"/(modals)/booking"} asChild>
            <TouchableOpacity style={styles.serachBtn}>
              <Ionicons name="search" size={24} />
              <View>
                <Text style={{ fontFamily: "mon-sb" }}>Where to?</Text>
                <Text
                  style={{
                    fontFamily: "mon-r",
                    color: Colors.grey,
                    fontSize: 12,
                  }}>
                  Anywhere・Any week・Add guests
                </Text>
              </View>
            </TouchableOpacity>
          </Link>

          <TouchableOpacity style={styles.filterBtn}>
            <Ionicons
              name="options-outline"
              size={Platform.OS === "ios" ? 24 : 20}
            />
          </TouchableOpacity>
        </View>

        <ScrollView
          ref={scrollRef}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{
            alignItems: "center",
            // ios verificar se gap fica bem
            gap: 20,
            paddingHorizontal: 16,
          }}>
          {categories.map((item, index) => (
            <TouchableOpacity
              onPress={() => selectCategory(index)}
              key={index}
              ref={(el) => (itemsRef.current[index] = el)}
              style={
                activeIndex === index
                  ? styles.categoriesBtnActive
                  : styles.categoriesBtn
              }>
              <MaterialIcons
                size={24}
                name={item.icon as any}
                color={activeIndex === index ? "#000" : Colors.grey}
              />
              <Text
                style={
                  activeIndex === index
                    ? styles.categoryTextActive
                    : styles.categoryText
                }>
                {item.name}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 4,
    height: 130,
    backgroundColor: "#fff",
  },
  actionRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: Platform.OS === "ios" ? 24 : 16,

    paddingBottom: 16,
  },
  filterBtn: {
    padding: Platform.OS === "ios" ? 10 : 8,

    borderWidth: 1,
    borderColor: Colors.grey,
    borderRadius: 24,
  },
  serachBtn: {
    backgroundColor: "#fff",
    flexDirection: "row",
    gap: Platform.OS === "ios" ? 10 : 6,

    padding: Platform.OS === "ios" ? 14 : 12,

    alignItems: "center",
    width: 280,

    borderWidth: StyleSheet.hairlineWidth,
    borderColor: "#c2c2c2",
    borderRadius: 30,
    elevation: 2,
    shadowColor: "#000",
    shadowOpacity: 0.12,
    shadowRadius: 8,
    shadowOffset: {
      width: 1,
      height: 1,
    },
  },
  categoryText: {
    fontSize: 14,
    fontFamily: "mon-sb",
    color: Colors.grey,
  },
  categoryTextActive: {
    fontSize: 14,
    fontFamily: "mon-sb",
    color: "#000",
  },
  categoriesBtn: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingBottom: 8,
  },
  categoriesBtnActive: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingBottom: 8,
    borderBottomColor: "#000",
    borderBottomWidth: 2,
  },
});

export default ExploreHeader;
