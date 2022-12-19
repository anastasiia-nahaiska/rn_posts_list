import React from 'react';
import {
  ListRenderItem,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { Comment } from '../../types/Comment';

export const PostComment: ListRenderItem<Comment> = ({ item: comment }) => (
  <Pressable style={styles.root}>
    <View style={styles.titleTextContainer}>
      <Text style={styles.titleText}>{comment.name}</Text>
    </View>
    <View>
      <Text style={styles.commentText}>{comment.body}</Text>
    </View>
  </Pressable>
);

const styles = StyleSheet.create({
  root: {
    backgroundColor: '#FFF',
    padding: '5%',
    // marginHorizontal: '5%',
    marginBottom: '5%',
    borderRadius: 20,
  },
  titleText: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  titleTextContainer: {
    marginBottom: '5%',
  },
  commentText: {
    fontSize: 10,
    textAlign: 'justify',
  },
});
