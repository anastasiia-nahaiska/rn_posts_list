/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  Modal,
  RefreshControl,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Snackbar from 'react-native-snackbar';
import { getComments } from '../../api';
import { Comment } from '../../types/Comment';
import { PostComment } from '../PostComment';

type Props = {
  isModalVisible: boolean;
  postId: number;
  onModalClosed: () => void;
};

export const ModalWithComments: React.FC<Props> = ({
  postId,
  isModalVisible,
  onModalClosed,
}) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [refreshing, setRefreshing] = React.useState(false);

  const screenHeight = Dimensions.get('window').height;

  const onRefresh = React.useCallback(async () => {
    setRefreshing(true);
    await loadComments();
    setRefreshing(false);
  }, []);

  const handleAutomaticlyClosing = () => {
    setTimeout(() => {
      onModalClosed();
    }, 1500);
  };

  const loadComments = async () => {
    try {
      setIsLoading(true);
      const commentsFromServer = await getComments(postId);

      setComments(commentsFromServer);
    } catch (error) {
      Snackbar.show({
        text: 'Opss... Can not load comments',
        duration: Snackbar.LENGTH_LONG,
      });
      handleAutomaticlyClosing();
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadComments();
  }, [postId]);

  return (
    <Modal animationType="fade" visible={isModalVisible} transparent={true}>
      <TouchableOpacity
        style={styles.modalContainer}
        onPress={onModalClosed}
        activeOpacity={0}
      >
        <TouchableOpacity
          style={[styles.modal, { height: screenHeight * 0.5 }]}
          activeOpacity={1}
        >
          <View style={styles.titleTextContainer}>
            <Text style={styles.titleText}>Comments</Text>
          </View>

          {isLoading ? (
            <View style={styles.loader}>
              <ActivityIndicator size="large" color="#161827" />
            </View>
          ) : (
            <FlatList
              data={comments}
              renderItem={PostComment}
              keyExtractor={item => `${item.id}`}
              showsVerticalScrollIndicator={false}
              refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
              }
            />
          )}
        </TouchableOpacity>
      </TouchableOpacity>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',

    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modal: {
    padding: '5%',
    paddingBottom: 0,
    width: '95%',
    borderRadius: 20,

    backgroundColor: '#905BFF',
  },
  titleTextContainer: {
    marginBottom: '5%',
  },
  titleText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 20,
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
