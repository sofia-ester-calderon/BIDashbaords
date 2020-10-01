/* eslint-disable react/forbid-prop-types */
import React from 'react';
import {View, StyleSheet} from 'react-native';
import {PropTypes} from 'prop-types';
import {Button, Text} from 'react-native-paper';

const SubCateogryOverview = ({subCategories, onChooseSubCategory}) => {
  return (
    <>
      {subCategories.map((subCategory) => (
        <View key={subCategory.name} style={styles.view}>
          <Text style={styles.titleText}>{subCategory.name}</Text>
          <Text>{subCategory.description}</Text>
          <Button
            mode="contained"
            style={styles.button}
            onPress={() => onChooseSubCategory(subCategory)}>
            Go to KPIs
          </Button>
        </View>
      ))}
    </>
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
};

export default SubCateogryOverview;
