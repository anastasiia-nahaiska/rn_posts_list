import React from 'react';
import {
  ListRenderItem,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import { Post } from '../../types/Post';

export const UserPost: ListRenderItem<Post> = ({ item: post }) => {
  const { title, body } = post;

  return (
    <Pressable style={styles.root}>
      <View style={styles.titleContainer}>
        <Text style={styles.titleText}>{title}</Text>
      </View>
      <View style={styles.postTextContainer}>
        <Text style={styles.postText}>{body}</Text>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  root: {
    padding: '5%',
    marginTop: '5%',
    marginHorizontal: '10%',

    borderRadius: 40,
    backgroundColor: '#FFF',
  },
  titleContainer: {
    paddingVertical: '5%',
    borderBottomWidth: 1,
    borderBottomColor: '#905BFF',
  },
  titleText: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  postTextContainer: {
    paddingVertical: '5%',
  },
  postText: {
    textAlign: 'justify',
  },
});
