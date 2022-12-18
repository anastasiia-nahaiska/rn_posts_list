/* eslint-disable react-hooks/exhaustive-deps */
import { NavigationProp, ParamListBase } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  SafeAreaView,
  StyleSheet,
  View,
} from 'react-native';
import Snackbar from 'react-native-snackbar';

import { getPosts } from '../../api';
import { Header } from '../../components/Header';
import { UserPost } from '../../components/UserPost';
import { Post } from '../../types/Post';

type Props = {
  navigation: NavigationProp<ParamListBase>;
};

export const HomeScreen: React.FC<Props> = ({ navigation }) => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const loadPosts = async () => {
    try {
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
      setTimeout(() => {
        setIsLoading(false);
      }, 1000);
    }
  };

  useEffect(() => {
    loadPosts();
  }, []);

  const handleLogOut = () => {
    navigation.navigate('LoginScreen');
  };

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
          renderItem={UserPost}
          keyExtractor={item => `${item.id}`}
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
});
