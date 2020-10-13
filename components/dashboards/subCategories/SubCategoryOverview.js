/* eslint-disable react/forbid-prop-types */
import React from 'react';
import {View, StyleSheet} from 'react-native';
import {PropTypes} from 'prop-types';
import {Button, Text} from 'react-native-paper';
import {ScrollView} from 'react-native-gesture-handler';
import {useMessages} from '../../hooks/MessagesProvider';

const SubCateogryOverview = ({subCategories, onChooseSubCategory}) => {
  const [messages, setMessages] = useMessages();
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
            {messages && messages.subcategoryOverview
              ? messages.subcategoryOverview.gotokpis
              : 'Ir a KPIs'}
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
};

export default SubCateogryOverview;
