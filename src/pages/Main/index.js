import React, { useState, useEffect } from 'react';
import { ActivityIndicator, StatusBar, Alert } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Proptypes from 'prop-types';

import {
    Container,
    Form,
    Input,
    SubmitButton,
    List,
    User,
    Avatar,
    Name,
    Bio,
    ProfileButton,
    ProfileButtonText,
    DeleteButton,
    Buttons,
} from './styles';

import api from '../../services/api';

export default function Main({ navigation }) {
    const [newUser, setNewUser] = useState('');
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);

    navigation.setOptions({
        title: 'Usuários',
    });

    useEffect(() => {
        async function getStorageUsers() {
            const usersList = await AsyncStorage.getItem('users');

            if (usersList) {
                setUsers(JSON.parse(usersList));
            }
        }
        getStorageUsers();
    }, []);

    useEffect(() => {
        async function setStorageUsers() {
            await AsyncStorage.setItem('users', JSON.stringify(users));
        }
        setStorageUsers();
    }, [users]);

    async function handleSubmit() {
        setLoading(true);

        try {
            const response = await api.get(`/users/${newUser}`);

            const data = {
                name: response.data.name,
                login: response.data.login,
                bio: response.data.bio,
                avatar: response.data.avatar_url,
                url: response.data.html_url,
            };

            setUsers([...users, data]);
        } catch {
            Alert.alert(
                'Usuário não encontrado!',
                'Tente novamente.',
                [
                    {
                        text: 'Ok',
                        style: 'cancel',
                    },
                ],
                {
                    cancelable: true,
                }
            );
        }
        setNewUser('');
        setLoading(false);
    }

    function handleNavigate(user) {
        navigation.navigate('User', { user });
    }

    function handleDelete(user) {
        setUsers(users.filter((u) => u !== user));
    }

    return (
        <>
            <StatusBar backgroundColor="#7159c1" barStyle="light-content" />

            <Container>
                <Form>
                    <Input
                        autoCorrect={false}
                        autoCapitalize="none"
                        placeholder="Adicionar usuário"
                        value={newUser}
                        onChangeText={(text) => setNewUser(text)}
                        returnKeyType="send"
                        onSubmitEditing={handleSubmit}
                    />

                    <SubmitButton loading={loading} onPress={handleSubmit}>
                        {loading ? (
                            <ActivityIndicator color="#FFF" />
                        ) : (
                            <Icon name="add" size={20} color="#FFF" />
                        )}
                    </SubmitButton>
                </Form>

                <List
                    data={users}
                    keyExtractor={(user) => user.login}
                    renderItem={({ item: user }) => (
                        <User>
                            <Avatar source={{ uri: user.avatar }} />
                            <Name>{user.name}</Name>
                            <Bio> {user.bio} </Bio>

                            <Buttons>
                                <ProfileButton
                                    onPress={() => handleNavigate(user)}
                                >
                                    <ProfileButtonText>
                                        Ver perfil
                                    </ProfileButtonText>
                                </ProfileButton>

                                <DeleteButton
                                    onPress={() => {
                                        handleDelete(user);
                                    }}
                                >
                                    <Icon
                                        name="delete"
                                        color="#FFF"
                                        size={26}
                                    />
                                </DeleteButton>
                            </Buttons>
                        </User>
                    )}
                />
            </Container>
        </>
    );
}

Main.propTypes = {
    navigation: Proptypes.shape({
        navigate: Proptypes.func,
        setOptions: Proptypes.func,
    }).isRequired,
};
