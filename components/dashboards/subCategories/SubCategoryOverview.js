/* eslint-disable prettier/prettier */
/* eslint-disable react/forbid-prop-types */
import React from 'react';
import {View, StyleSheet} from 'react-native';
import {PropTypes} from 'prop-types';
import {Button, Text} from 'react-native-paper';
import {ScrollView} from 'react-native-gesture-handler';

const SubCateogryOverview = ({
  subCategories,
  onChooseSubCategory,
  buttonText = '',
}) => {
  return (
    <ScrollView>
      {subCategories.map((subCategory) => (
        <View key={subCategory.name} style={styles.view}>
          <Text style={styles.titleText}>{subCategory.name}</Text>
          <Text>{subCategory.description}</Text>
          <Button
            mode="contained"
            style={styles.button}
            onPress={() => onChooseSubCategory(subCategory)}>
            {buttonText}
          </Button>
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  view: {
    margin: 15,
    alignItems: 'flex-start',
  },
  button: {
    justifyContent: 'flex-start',
    marginTop: 15,
  },
  titleText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
});

SubCateogryOverview.propTypes = {
  subCategories: PropTypes.array.isRequired,
  onChooseSubCategory: PropTypes.func.isRequired,
  buttonText: PropTypes.string,
};

export default SubCateogryOverview;
