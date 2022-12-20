import React, { useCallback, useContext, useEffect, useState } from 'react';
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
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import Snackbar from 'react-native-snackbar';
import { Dirs } from 'react-native-file-access';

import { getPosts } from '../../api';
import { ModalWithComments } from '../../components/ModalWithComments';
import { Header } from '../../components/Header';
import { Post } from '../../types/Post';
import { RootStackParamList } from '../../types/RootStackParamList';
import { saveOnDevice } from '../../helpers/saveDataOnDevice';
import { getDataFromDevice } from '../../helpers/readDataFromDevice';
import { NetInfoContext } from '../../context/NetInfoContext';

type Props = NativeStackScreenProps<RootStackParamList, 'HomeScreen'>;

export const HomeScreen: React.FC<Props> = ({ navigation }) => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedPostId, setSelectedPostId] = useState<number>(0);
  const [refreshing, setRefreshing] = React.useState(false);
  const { isConnected } = useContext(NetInfoContext);

  const fileName = 'posts.json';
  const filePath = `${Dirs.DocumentDir}/${fileName}`;

  const loadPosts = useCallback(async () => {
    try {
      setIsLoading(true);

      const postsFromServer = await getPosts();

      setPosts(postsFromServer);
      saveOnDevice(filePath, postsFromServer);
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
  }, [filePath]);

  const readPostsFromDevice = useCallback(async () => {
    const postsFromDevice: Post[] = await getDataFromDevice(filePath);

    setPosts(postsFromDevice);
  }, [filePath]);

  useEffect(() => {
    if (!isConnected) {
      readPostsFromDevice();
    } else {
      loadPosts();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await loadPosts();
    setRefreshing(false);
  }, [loadPosts]);

  const onPostPressed = useCallback((postId: number) => {
    setIsModalVisible(true);
    setSelectedPostId(postId);
  }, []);

  const onModalClosed = useCallback(() => {
    setIsModalVisible(false);
  }, []);

  const handleLogOut = useCallback(() => {
    navigation.navigate('LoginScreen');
  }, [navigation]);

  const renderItem: ListRenderItem<Post> = useCallback(
    ({ item: post }) => (
      <Pressable style={styles.post} onPress={() => onPostPressed(post.id)}>
        <View style={styles.titleContainer}>
          <Text style={styles.titleText}>{post.title}</Text>
        </View>
        <View style={styles.postTextContainer}>
          <Text style={styles.postText}>{post.body}</Text>
        </View>
      </Pressable>
    ),
    [onPostPressed],
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
