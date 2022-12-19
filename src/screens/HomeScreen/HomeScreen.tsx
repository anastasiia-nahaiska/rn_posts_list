/* eslint-disable react-hooks/exhaustive-deps */
import { NavigationProp, ParamListBase } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  ListRenderItem,
  Pressable,
  RefreshControl,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import Snackbar from 'react-native-snackbar';

import { getPosts } from '../../api';
import { ModalWithComments } from '../../components/ModalWithComments';
import { Header } from '../../components/Header';
import { Post } from '../../types/Post';

type Props = {
  navigation: NavigationProp<ParamListBase>;
};

export const HomeScreen: React.FC<Props> = ({ navigation }) => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedPostId, setSelectedPostId] = useState<number>(0);
  const [refreshing, setRefreshing] = React.useState(false);

  const loadPosts = async () => {
    try {
      setIsLoading(true);

      const postsFromServer = await getPosts();

      setPosts(postsFromServer);
    } catch (error) {
      Snackbar.show({
        text: 'Opss... Can not load posts',
        duration: Snackbar.LENGTH_LONG,
        action: {
          text: 'Try again',
          onPress: () => loadPosts(),
        },
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadPosts();
  }, []);

  const onRefresh = React.useCallback(async () => {
    setRefreshing(true);
    await loadPosts();
    setRefreshing(false);
  }, []);

  const onPostPressed = (postId: number) => {
    setIsModalVisible(true);
    setSelectedPostId(postId);
  };

  const onModalClosed = () => {
    setIsModalVisible(false);
  };

  const handleLogOut = () => {
    navigation.navigate('LoginScreen');
  };

  const renderItem: ListRenderItem<Post> = ({ item: post }) => (
    <Pressable style={styles.post} onPress={() => onPostPressed(post.id)}>
      <View style={styles.titleContainer}>
        <Text style={styles.titleText}>{post.title}</Text>
      </View>
      <View style={styles.postTextContainer}>
        <Text style={styles.postText}>{post.body}</Text>
      </View>
    </Pressable>
  );

  return (
    <SafeAreaView style={styles.root}>
      <Header handleLogOut={handleLogOut} />

      {isLoading ? (
        <View style={styles.loader}>
          <ActivityIndicator size="large" color="#905BFF" />
        </View>
      ) : (
        <FlatList
          data={posts}
          renderItem={renderItem}
          keyExtractor={item => `${item.id}`}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        />
      )}

      {selectedPostId > 0 && (
        <ModalWithComments
          isModalVisible={isModalVisible}
          postId={selectedPostId}
          onModalClosed={onModalClosed}
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#161827',
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  post: {
    padding: '5%',
    marginTop: '5%',
    marginHorizontal: '5%',

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
